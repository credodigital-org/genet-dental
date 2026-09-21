# Genet Dental API verification

Run from `backend/` after installing `requirements.txt`:

```bash
python manage.py makemigrations clinic
python manage.py migrate
python manage.py check
python manage.py makemigrations --check
python manage.py test clinic.tests.test_api
```

Then run the server and verify:

```text
GET /api/clinic-info/
GET /api/treatments/
GET /api/services/
GET /api/facilities/
GET /api/doctors/
GET /api/testimonials/
```

All six public content endpoints are expected to return HTTP 200.

`clinic.0002_repair_doctor_schema` is a non-destructive repair migration for older
local databases whose `clinic_doctor` table predates the Doctor metadata columns.
It does not delete rows or reset migration history.

The React API helper normalizes endpoint names before adding `/api/` and the
single trailing slash. This prevents requests such as `/api/services//` and
`/api/facilities//`, which were the source of the observed 404s when callers
already supplied a trailing slash.
