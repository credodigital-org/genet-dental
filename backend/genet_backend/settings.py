"""
Django settings for the Genet Dental Specialized Center backend.

Deployment architecture this project is built for:

    genetdentalclinic.ae  --DNS-->  AEServer
                                        |
                                        v
                                     Vercel (React/Vite frontend + admin UI)
                                        |
                                     HTTPS / REST API
                                        v
                                     Render (this Django + DRF backend)
                                    /                      \
                                   v                        v
                        Neon PostgreSQL             Cloudflare R2
                        (all site content)          (images, gallery, video)

Locally this all runs with zero config: SQLite + local media/ folder.
Nothing below activates until the matching environment variable is set,
so `python manage.py runserver` with no .env still works out of the box.
"""

# import os
# from pathlib import Path

# import dj_database_url

# import os
# from pathlib import Path

# from dotenv import load_dotenv
# import dj_database_url

# BASE_DIR = Path(__file__).resolve().parent.parent

# load_dotenv(BASE_DIR / ".env")

import os
from pathlib import Path

from dotenv import load_dotenv
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

# BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY",
    "dev-only-secret-key-change-me",
)

DEBUG = os.environ.get("DJANGO_DEBUG", "True") == "True"

ALLOWED_HOSTS = os.environ.get(
    "DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1"
).split(",")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "clinic",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "genet_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "genet_backend.wsgi.application"
ASGI_APPLICATION = "genet_backend.asgi.application"

# --- Database -------------------------------------------------------------
# Local dev (no DATABASE_URL set): SQLite, zero config.
# Production (Render): set DATABASE_URL to your Neon Postgres connection
# string — Render injects env vars automatically from its dashboard/secrets.
DATABASE_URL = os.environ.get("DATABASE_URL")
if DATABASE_URL:
    DATABASES = {
        "default": dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            ssl_require=True,
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Dubai"
USE_I18N = True
USE_TZ = True

# --- Static files (served by WhiteNoise on Render) -------------------------
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

# --- Media files: local disk by default, Cloudflare R2 in production ------
# Set these four env vars (from your Cloudflare R2 bucket + API token) to
# switch uploaded images/video over to R2. Leave them unset for local dev —
# uploads then just go to backend/media/ on disk, same as always.
R2_ACCESS_KEY_ID = os.environ.get("R2_ACCESS_KEY_ID")
R2_SECRET_ACCESS_KEY = os.environ.get("R2_SECRET_ACCESS_KEY")
R2_BUCKET_NAME = os.environ.get("R2_BUCKET_NAME")
R2_ENDPOINT_URL = os.environ.get("R2_ENDPOINT_URL")  # e.g. https://<account_id>.r2.cloudflarestorage.com
R2_PUBLIC_BASE_URL = os.environ.get("R2_PUBLIC_BASE_URL")  # e.g. https://media.genetdentalclinic.ae

if R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY and R2_BUCKET_NAME and R2_ENDPOINT_URL:
    STORAGES["default"] = {"BACKEND": "storages.backends.s3boto3.S3Boto3Storage"}
    AWS_ACCESS_KEY_ID = R2_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY = R2_SECRET_ACCESS_KEY
    AWS_STORAGE_BUCKET_NAME = R2_BUCKET_NAME
    AWS_S3_ENDPOINT_URL = R2_ENDPOINT_URL
    AWS_S3_CUSTOM_DOMAIN = (R2_PUBLIC_BASE_URL or "").replace("https://", "").replace("http://", "") or None
    AWS_S3_ADDRESSING_STYLE = "virtual"
    AWS_S3_REGION_NAME = "auto"
    AWS_S3_SIGNATURE_VERSION = "s3v4"
    AWS_DEFAULT_ACL = None
    AWS_QUERYSTRING_AUTH = False
    MEDIA_URL = f"{R2_PUBLIC_BASE_URL}/" if R2_PUBLIC_BASE_URL else f"{R2_ENDPOINT_URL}/{R2_BUCKET_NAME}/"
else:
    MEDIA_URL = "/media/"
    MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- DRF --------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS": None,
}

from datetime import timedelta
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# --- CORS ---------------------------------------------------------------
# Local dev: Vite's default port. Production: your Vercel domain(s) plus
# the final genetdentalclinic.ae domain once DNS is pointed at Vercel.
CORS_ALLOWED_ORIGINS = os.environ.get(
    "DJANGO_CORS_ALLOWED_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173",
).split(",")
