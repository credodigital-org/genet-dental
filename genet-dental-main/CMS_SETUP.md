# Genet Dental CMS setup

The client-facing CMS is the existing React page at `/admin`. It is intentionally limited to exactly seven content sections:

1. Doctors
2. Treatments
3. Services
4. Facilities
5. Gallery
6. Testimonials
7. Video

There are no CMS controls for Dashboard, Core Values, Website Settings, About Us, Appointments, Contact Messages, Header, Footer, Hero, or SEO.

## Local backend

```bash
cd backend
python -m venv venv
# Windows: venv\\Scripts\\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python manage.py makemigrations clinic
python manage.py migrate
python manage.py check
python manage.py runserver
```

Do not delete `db.sqlite3` to resolve migration errors. The `clinic.0002_repair_doctor_schema` migration is non-destructive and repairs missing Doctor metadata columns when the migration history is ahead of the physical SQLite table.

The `seed_clinic` command is for deliberate initial population only; it is not run automatically and should not be used as a migration repair step.

## Local frontend

```bash
cd frontend
npm install
npm run build
npm run dev
```

Open `http://localhost:5173/admin` and sign in with the Django staff/superuser account.

## Public API smoke checks

With Django running, these public GET endpoints should resolve with HTTP 200:

```text
/api/clinic-info/
/api/treatments/
/api/services/
/api/facilities/
/api/doctors/
/api/testimonials/
```

The frontend API helper normalizes leading/trailing slashes so `/api/services/` and `/api/services` cannot become a double-slash request.

## Video deletion

The CMS Video page uses:

```text
DELETE /api/clinic-info/video/
```

The backend deletes the stored `excellence_video` file through Django's configured storage and clears the database field. Local development uses `media/`; production can use Cloudflare R2.

## Production environment

Backend (Render):
- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG=False`
- `DJANGO_ALLOWED_HOSTS=<render-host>,<final-domain-if-needed>`
- `DJANGO_CORS_ALLOWED_ORIGINS=https://<vercel-domain>,https://genetdentalclinic.ae`
- `DATABASE_URL=<Neon Postgres URL>`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET_NAME=genetdental-media`
- `R2_ENDPOINT_URL=https://<account-id>.r2.cloudflarestorage.com`
- `R2_PUBLIC_BASE_URL=<public R2/custom media URL>`

Frontend (Vercel):
- `VITE_API_BASE_URL=https://<render-backend-domain>`

Never put passwords, Cloudflare secrets, database URLs, or Django secret keys in frontend code or Vercel client-side variables.
