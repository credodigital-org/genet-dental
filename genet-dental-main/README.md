# Genet Dental Specialized Center — Website

A React (Vite) frontend + Django REST Framework backend with an
authenticated React CMS at `/admin`, backed by JWT authentication. The
Django built-in admin remains available for server-side administration,
while the client-facing CMS manages doctors, treatments, services,
facilities, testimonials, gallery media, homepage video, and website settings.

## Pages

| Route         | Page                                    |
|---------------|------------------------------------------|
| `/`           | Home                                      |
| `/services`   | Our Services (11-card detailed list)      |
| `/facilities` | Our Facilities (equipment/technology)     |
| `/doctors`    | Our Doctors (director, specialists, GPs)  |
| `/about`      | About Us (story, core values, gallery)    |
| `/contact`    | Contact Us (get in touch + form)          |

## Project structure

```
genet-dental/
├── backend/                        Django project (API + admin panel)
│   ├── genet_backend/                settings, urls, wsgi/asgi
│   ├── clinic/                        the app: models, admin, API
│   │   ├── models.py                   ClinicInfo, AboutContent, CoreValue,
│   │   │                               Treatment, Service, Facility, Doctor,
│   │   │                               Testimonial, GalleryImage,
│   │   │                               AppointmentRequest, ContactMessage
│   │   ├── admin.py                    registers everything for /admin/
│   │   ├── serializers.py / views.py / urls.py    the /api/ routes
│   │   ├── seed_media/                 the real photos/logo/video
│   │   └── management/commands/seed_clinic.py
│   ├── manage.py
│   ├── requirements.txt
│   └── Procfile                       for Render (gunicorn + migrate)
│
└── frontend/                        React + Vite app
    ├── src/
    │   ├── pages/                     one file per route (HomePage, ServicesPage, ...)
    │   ├── components/                 shared building blocks (Header, Footer,
    │   │                                Hero, Treatments, Specialists, ...)
    │   ├── styles/                     one CSS file per component/page, plus
    │   │                                base.css for tokens/resets/typography
    │   ├── assets/                     images/fonts/video
    │   └── api.js                      fetch helpers (with static fallback content)
    ├── index.html
    ├── vercel.json                    SPA rewrite so /services etc. work on Vercel
    └── package.json
```

### Why one CSS file per component

Each component/page imports its own stylesheet directly
(`import "../styles/Hero.css"`), the same way it imports its own JSX
logic. `base.css` (imported once, in `main.jsx`) holds only what's
truly shared: CSS variables, the font-face, resets, typography, and
the generic `.btn` / `.field` / `.wrap` primitives every page uses.
That keeps any single file small and means editing, say, the Contact
page's styling can never accidentally break the Hero section.

## How it fits together

Every section/page ships with real fallback content (the actual
current copy and images) as its default state, so the site renders
correctly even before the backend is running. Once Django is up,
each page fetches its data from `/api/...` and swaps in whatever's
been edited from the admin panel — so editing a doctor's bio or
adding a gallery photo in `/admin/` updates the live site.

The **Request an Appointment** form (home page) posts to
`/api/appointment-requests/`; the **Contact Us** page form posts to
`/api/contact-messages/`. Both show up in the Django admin for staff
to follow up on.

## Running locally

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate        # venv\Scripts\activate on Windows
pip install -r requirements.txt
copy .env.example .env          # cp on Mac/Linux
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_clinic    # loads all the real content + images
python manage.py runserver
```
Django server admin: http://localhost:8000/admin/
React CMS: http://localhost:5173/admin
API root: http://localhost:8000/api/

**Frontend:**
```bash
cd frontend
npm install
copy .env.example .env          # cp on Mac/Linux — VITE_API_BASE_URL
npm run dev
```
Site: http://localhost:5173/

## Deployment architecture

```
                         INTERNET
                             │
                             ▼
                  genetdentalclinic.ae
                             │
                             ▼
                    ┌─────────────────┐
                    │     AESERVER    │   domain registration, DNS
                    │  Domain + DNS   │   management, records for Vercel,
                    └────────┬────────┘   renewal. DNS stays on AEServer —
                             │             it is NOT moved to Cloudflare.
                             ▼
                    ┌─────────────────┐
                    │      VERCEL     │   React + Vite build (this
                    │  React + Vite   │   `frontend/` folder). Public
                    │  Public Website │   website + admin UI if kept
                    └────────┬────────┘   inside the React app.
                             │
                       HTTPS / REST API
                             │
                             ▼
                    ┌─────────────────┐
                    │      RENDER     │   Django + DRF (this `backend/`
                    │   Django + DRF  │   folder). Authentication,
                    │  Auth / CMS API │   CMS admin, business logic.
                    └───────┬─┬───────┘
                            │ │
                 ┌──────────┘ └──────────┐
                 ▼                       ▼
          ┌──────────────┐       ┌────────────────┐
          │     NEON     │       │  CLOUDFLARE R2 │
          │  PostgreSQL  │       │  Media Storage │
          │              │       │                │
          │ Doctors      │       │ Doctor photos  │
          │ Treatments   │       │ Facility photos│
          │ Facilities   │       │ Gallery images │
          │ Testimonials │       │ Videos         │
          │ Site settings│       │                │
          └──────────────┘       └────────────────┘

                         GOOGLE
                           │
                           ▼
                  Google Search Console
                  Sitemap + Indexing
```

Cloudflare is used **only** for R2 media storage — DNS for
`genetdentalclinic.ae` stays with AEServer.

### Going live, step by step

1. **AEServer** — register `genetdentalclinic.ae`, then once Vercel
   gives you its target (a CNAME or the `76.76.21.21` A record shown
   in the Vercel dashboard), add that DNS record in AEServer's panel.
2. **Neon** — create a Postgres project, copy the connection string
   into Render's environment as `DATABASE_URL` (the app already reads
   it via `dj-database-url` — nothing else to change).
3. **Cloudflare R2** — create a bucket, an API token (Account →
   R2 → Manage API Tokens), and either a public bucket URL or a
   custom domain (e.g. `media.genetdentalclinic.ae`, itself pointed
   at R2 via a DNS record in AEServer). Set the four `R2_*` env vars
   from `backend/.env.example` in Render — the app switches uploaded
   media over to R2 automatically the moment those are present.
4. **Render** — deploy `backend/` as a Web Service (`pip install -r
   requirements.txt` as the build command, the included `Procfile`
   handles start + migrate). Set `DJANGO_DEBUG=False`,
   `DJANGO_ALLOWED_HOSTS` to your Render domain, and
   `DJANGO_CORS_ALLOWED_ORIGINS` to your Vercel domain.
5. **Vercel** — deploy `frontend/` (framework preset: Vite). Set
   `VITE_API_BASE_URL` to your Render URL. `vercel.json` is already
   set up so client-side routes like `/services` don't 404 on
   refresh.
6. **Google Search Console** — once the domain is live, verify
   ownership and submit the sitemap. The production site should expose
   `sitemap.xml` and `robots.txt` after the final domain is confirmed.

### React CMS

The `/admin` route is intentionally separate from the public site layout.
It uses JWT access/refresh tokens and only staff users can perform write
operations. Public visitors can still submit appointment/contact forms.

CMS areas included:
- Dashboard
- Doctors (photo, category, qualification, bio, treatments, order, active state)
- Treatments
- Services
- Facilities
- Testimonials
- Gallery
- Homepage Excellence video replacement
- Website settings and shared branding/media
- Appointment requests and contact messages

Create the first CMS user on the backend with `python manage.py createsuperuser`.
The same staff/superuser credentials can be used at `/admin` on the React app.
Do not put credentials in frontend environment variables.

### Notes

- **Service icons row** (home hero): renders as one exact exported
  image to match the source design pixel-for-pixel. The six
  individual icon files are already seeded into the `ServiceIcon`
  model if you'd rather switch it to real HTML from the API later.
- **Gallery / facility / service photos**: seeded without photos
  (they render as icon/gradient placeholders) since no source photos
  existed for them yet — upload the real ones via `/admin/` any time,
  no code changes needed.
- **reCAPTCHA** on the Contact page is currently a plain styled
  checkbox, not wired to Google's reCAPTCHA — send over a site key
  when you're ready and it can be swapped in.

## API and migration fixes

The frontend API client now normalizes endpoint paths before adding `/api/` and the single trailing slash. This fixes accidental requests such as `/api/services//` and `/api/facilities//`.

A non-destructive `clinic.0002_repair_doctor_schema` migration repairs older databases where `clinic.0001_initial` is marked applied but the Doctor metadata columns are missing. It adds only missing `category`, `qualification`, `bio`, and `specialties` columns and preserves existing rows.

Before production, run:

```bash
cd backend
python manage.py makemigrations clinic
python manage.py migrate
python manage.py check
python manage.py makemigrations --check
python manage.py test clinic.tests.test_api
```
