import shutil
from pathlib import Path

from django.core.files import File
from django.core.management.base import BaseCommand

from clinic.models import ClinicInfo, Doctor, ServiceIcon, Testimonial, Treatment

SEED_MEDIA = Path(__file__).resolve().parent.parent.parent / "seed_media"


def _file(path: Path):
    return File(open(path, "rb"), name=path.name)


class Command(BaseCommand):
    help = "Populates the database with the real Genet Dental content and images so the admin panel and API aren't empty."

    def handle(self, *args, **options):
        self.stdout.write("Seeding Genet Dental content...")

        info, _ = ClinicInfo.objects.get_or_create(id=1)
        info.clinic_name = "Genet Dental Specialized Center"
        info.tagline = "Smiles Always..."
        info.established_year = 2014
        info.hero_heading = "Smiles Always..."
        info.hero_paragraph = (
            "Experience world-class dental care in a state-of-the-art facility. "
            "We combine rigorous clinical standards with boutique hospitality "
            "for a truly premium patient journey."
        )
        info.years_experience = 12
        info.patients_count_label = "23k+"
        info.excellence_heading = "Excellence in Dental Care"
        info.excellence_paragraph = (
            "At Genet Specialized Dental Center, we are dedicated to providing "
            "personalized, high-quality dental care in a comfortable and "
            "stress-free environment. Our team of experienced specialists uses "
            "the latest technology to ensure optimal oral health for you and "
            "your family."
        )
        info.address_line = "Junaibi Tower, 2nd Floor, Muroor Road"
        info.address_city = "Abu Dhabi, UAE"
        info.phone = "02 666 99 45"
        info.whatsapp = "050 346 9945"
        info.email = "info@genetdental.com"
        info.working_hours = "Sun - Sat, 9:30 AM - 8:30 PM"

        branding = SEED_MEDIA / "branding"
        info.logo.save("logo.png", _file(branding / "logo.png"), save=False)
        info.smiles_wordmark.save("smiles-wordmark.png", _file(branding / "smiles-wordmark.png"), save=False)
        info.hero_photo.save("hero-photo.jpg", _file(branding / "hero-photo.jpg"), save=False)
        info.quick_services_row.save("quick-services-row.png", _file(branding / "quick-services-row.png"), save=False)
        info.insurance_strip.save("insurance-strip.jpg", _file(branding / "insurance-strip.jpg"), save=False)
        info.map_image.save("map.jpg", _file(branding / "map.jpg"), save=False)
        video_path = branding / "excellence-in-care.mp4"
        if video_path.exists():
            info.excellence_video.save("excellence-in-care.mp4", _file(video_path), save=False)
        info.save()

        icons = SEED_MEDIA / "icons"
        service_icons = [
            ("Dental Check-up", "icon-dental-checkup.png"),
            ("Teeth Cleaning", "icon-teeth-cleaning.png"),
            ("Root Canals", "icon-root-canals.png"),
            ("Dental Implants", "icon-dental-implants.png"),
            ("Braces", "icon-braces.png"),
            ("Surgeries", "icon-surgeries.png"),
        ]
        ServiceIcon.objects.all().delete()
        for order, (name, filename) in enumerate(service_icons):
            obj = ServiceIcon(name=name, order=order)
            obj.icon.save(filename, _file(icons / filename), save=False)
            obj.save()

        treatments_dir = SEED_MEDIA / "treatments"
        treatments = [
            ("General Dentistry", "general-dentistry"),
            ("Paedo-Dentistry", "paedo-dentistry"),
            ("Orthodontics", "orthodontics"),
            ("Periodontics", "periodontics"),
            ("Oral & Maxillofacial Surgery", "oral-maxillofacial-surgery"),
            ("Endodontics", "endodontics"),
            ("Prosthodontics", "prosthodontics"),
        ]
        Treatment.objects.all().delete()
        for order, (name, slug) in enumerate(treatments):
            filename = f"{slug}.jpg"
            obj = Treatment(name=name, slug=slug, order=order)
            obj.photo.save(filename, _file(treatments_dir / filename), save=False)
            obj.save()

        doctors_dir = SEED_MEDIA / "doctors"
        doctors = [
            ("Dr. Yadnit Siddharth Bhosale", "Specialist Prosthodontics & Implantologist", "dr-yadnit.jpg"),
            ("Dr. Lorrain", "General Dentist - BDS", "dr-lorrain.jpg"),
            ("Dr. Mathew", "Specialist Orthodontist - MDS", "dr-mathew.jpg"),
            ("Dr. Alaa", "General Dentist", "dr-alaa.jpg"),
        ]
        Doctor.objects.all().delete()
        for order, (name, specialty, filename) in enumerate(doctors):
            obj = Doctor(name=name, specialty=specialty, order=order)
            obj.photo.save(filename, _file(doctors_dir / filename), save=False)
            obj.save()

        Testimonial.objects.all().delete()
        testimonials = [
            (
                "Sarah Johnson",
                "The most professional and gentle dental experience I've ever had. "
                "The facility is state-of-the-art and the staff is incredibly welcoming.",
            ),
            (
                "Michael Chen",
                "I was always nervous about dental visits, but the doctors made me "
                "feel completely at ease. My orthodontic treatment has been life-changing.",
            ),
            (
                "Emma Williams",
                "Excellent service from start to finish. The whitening results are "
                "amazing, and the boutique hospitality really sets them apart.",
            ),
        ]
        for order, (name, quote) in enumerate(testimonials):
            Testimonial.objects.create(patient_name=name, quote=quote, rating=5, order=order)

        self.stdout.write(self.style.SUCCESS("Done. Visit /admin/ to edit any of this content."))
