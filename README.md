# Genet Dental Specialized Center — Website

A React (Vite) frontend + Django REST Framework backend for the Genet
Dental Specialized Center homepage, with a Django admin panel for
editing all site content (treatments, doctors, testimonials, clinic
info, appointment requests).

```
genet-dental/
├── backend/                Django project (API + admin panel)
│   ├── genet_backend/       settings, urls, wsgi/asgi
│   ├── clinic/               the app: models, admin, API
│   │   ├── models.py          ClinicInfo, Treatment, Doctor, Testimonial,
│   │   │                      ServiceIcon, AppointmentRequest
│   │   ├── admin.py           registers everything for /admin/
│   │   ├── serializers.py     DRF serializers
│   │   ├── views.py           DRF viewsets (read-only, + appointment POST)
│   │   ├── urls.py            /api/... routes
│   │   ├── seed_media/        the real photos/logo/video, used to seed the DB
│   │   └── management/commands/seed_clinic.py
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/                React + Vite app
    ├── src/
    │   ├── components/        one component per homepage section
    │   ├── assets/            images/fonts/video (same real assets as backend)
    │   ├── styles/global.css  all styling
    │   ├── api.js              fetch helpers (with static fallback content)
    │   └── App.jsx
    ├── index.html
    └── package.json
```

## How it fits together

Every section component (Hero, Treatments, Specialists, Testimonials...)
ships with the real current copy and images as fallback content, so the
site renders correctly even before the backend is running. Once Django
is running, `App.jsx` fetches `/api/clinic-info/`, `/api/treatments/`,
`/api/doctors/`, `/api/testimonials/` and swaps in whatever's been
edited from the admin panel — so editing a doctor's name/photo in
`/admin/` updates the live site.

The "Request an Appointment" form posts to
`/api/appointment-requests/`; submissions show up in the Django admin
under **Appointment Requests** for staff to follow up on.

## Running the backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # venv\Scripts\activate on Windows
pip install -r requirements.txt

cp .env.example .env            # adjust if needed

python manage.py migrate
python manage.py createsuperuser
python manage.py seed_clinic    # loads the real treatments/doctors/testimonials + images
python manage.py runserver
```

Admin panel: http://localhost:8000/admin/
API root: http://localhost:8000/api/

## Running the frontend

```bash
cd frontend
npm install
cp .env.example .env            # VITE_API_BASE_URL, defaults to localhost:8000
npm run dev
```

Site: http://localhost:5173/

## Notes for going further

- **Database**: ships with SQLite for zero-config local dev. Swap the
  `DATABASES` block in `backend/genet_backend/settings.py` for your
  Neon/Supabase Postgres connection string when you're ready to deploy
  (Render for the API, Vercel for the frontend, matching your usual
  setup).
- **Service icons**: the quick-services row currently renders as one
  exact exported image (`quick-services-row.png`) to match the source
  design pixel-for-pixel. The six individual icon files are already in
  `assets/images/icons/` (frontend) and seeded into the `ServiceIcon`
  model (backend/admin) if you'd rather switch that section to render
  from real HTML + the API later — `ServiceIcons.jsx` has a comment
  showing where that change goes.
- **More pages**: add new Django views/serializers under `clinic/` (or
  a new app) and new routes/components under `frontend/src/` — this
  structure is meant to grow with additional pages as you send them
  over.
