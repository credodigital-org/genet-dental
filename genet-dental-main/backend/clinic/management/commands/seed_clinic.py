from pathlib import Path

from django.core.files import File
from django.core.management.base import BaseCommand

from clinic.models import (
    AboutContent,
    ClinicInfo,
    CoreValue,
    Doctor,
    Facility,
    Service,
    ServiceIcon,
    Testimonial,
    Treatment,
)

SEED_MEDIA = Path(__file__).resolve().parent.parent.parent / "seed_media"


def _file(path: Path):
    return File(open(path, "rb"), name=path.name)


class Command(BaseCommand):
    help = "Populates the database with the real Genet Dental content and images so the admin panel and API aren't empty."

    def handle(self, *args, **options):
        self.stdout.write("Seeding Genet Dental content...")

        # ---- Clinic info -------------------------------------------------
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

        # ---- About page ----------------------------------------------------
        about, _ = AboutContent.objects.get_or_create(id=1)
        about.hero_heading = "Excellence in Every Smile"
        about.hero_paragraph = (
            "Providing world-class dental care with unyielding precision and "
            "profound compassion. Your journey to perfect oral health begins "
            "here in a meticulously designed, sterile, and calming environment."
        )
        about.story_heading = "Our Story"
        about.story_paragraph = (
            "For over 12 years, Genet Specialized Dental Center has been at the "
            "forefront of dental innovation and patient-centered care. Founded "
            "on the principles of clinical excellence and profound empathy, we "
            "have transformed the smiles of thousands. Our commitment extends "
            "beyond just treating teeth; we focus on comprehensive oral "
            "wellness, ensuring every patient feels secure, informed, and "
            "completely cared for in our state-of-the-art facility. We are "
            "continuously evolving, integrating the latest advancements to "
            "provide a sophisticated, pain-free dental experience."
        )
        about_photo = branding / "about-hero.jpg"
        if about_photo.exists():
            about.hero_photo.save("about-hero.jpg", _file(about_photo), save=False)
        about.save()

        CoreValue.objects.all().delete()
        core_values = [
            ("Clinical Precision", "Leveraging advanced diagnostic tools and meticulous techniques to ensure highly accurate, definitive, and long-lasting treatments.", "precision"),
            ("Compassionate Care", "Putting patient comfort first. We cultivate a calm, reassuring environment, listening attentively to your concerns and designing anxiety-free experiences.", "care"),
            ("Continuous Innovation", "Staying ahead with state-of-the-art facilities, modern materials, and ongoing education to deliver the most effective and efficient modern dentistry.", "innovation"),
        ]
        for order, (title, desc, icon) in enumerate(core_values):
            CoreValue.objects.create(title=title, description=desc, icon_name=icon, order=order)

        # ---- Service icons (home hero row) ---------------------------------
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

        # ---- Treatments (home 7-card grid) ---------------------------------
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

        # ---- Services (standalone Our Services page, 11 cards) -------------
        Service.objects.all().delete()
        services = [
            ("Teeth Cleaning", "Professional cleaning to remove plaque and tartar for healthier teeth and gums."),
            ("Dental Implants", "Restore missing teeth with strong, natural-looking dental implants."),
            ("Surgeries", "Advanced dental surgeries performed with precision, comfort, and compassionate care."),
            ("Root Canals", "Relieve pain and save your natural tooth with our root canal therapy."),
            ("Dental Fillings", "Repair cavities and restore your teeth with safe and tooth-colored fillings."),
            ("Dental Veneers", "Achieve a flawless smile with custom-made veneers that look natural."),
            ("Invisalign", "Straighten your teeth comfortably with clear, removable aligners."),
            ("Dental Crowns", "Protect and strengthen damaged teeth with durable and natural-looking crowns."),
            ("Braces", "Align and straighten your teeth for a healthier bite and improved aesthetics."),
            ("Dentures", "Regain your smile and chewing function with comfortable, custom-fit dentures."),
            ("Extractions", "Safe and gentle tooth extractions to relieve pain and protect your oral health."),
        ]
        for order, (name, desc) in enumerate(services):
            slug = name.lower().replace(" ", "-")
            Service.objects.create(name=name, slug=slug, description=desc, order=order)

        # ---- Facilities ------------------------------------------------------
        Facility.objects.all().delete()
        facilities = [
            ("CBCT 3D Imaging", "Advanced 3D imaging that provides a detailed view of the teeth, jawbones, nerves and surrounding for accurate diagnosis and treatment planning."),
            ("Cephalometric X-Ray", "Specialized imaging for accurate analysis of facial and jaw structures. Essential for orthodontic evaluation and treatment planning."),
            ("Digital Panoramic X-Ray (OPG)", "Captures a complete wide view of the upper and lower jaws, teeth and surrounding areas in a single image with high clarity and low radiation."),
            ("IOPA X-Ray", "Intraoral periapical X-rays provide detailed images of individual teeth, roots and surrounding bone for precise diagnosis and treatment."),
        ]
        for order, (name, desc) in enumerate(facilities):
            Facility.objects.create(name=name, description=desc, order=order)

        # ---- Doctors (home carousel + full Our Doctors page) ---------------
        doctors_dir = SEED_MEDIA / "doctors"
        Doctor.objects.all().delete()
        doctors = [
            dict(
                name="Dr. Shajee Muhammed Salahuddin", specialty="GP Dentist",
                qualification="GP Dentist", category="medical_director",
                filename="dr-shajee.jpg",
                bio=(
                    "Leading with expertise and compassion, our medical director "
                    "ensures the highest standards of dental care and patient "
                    "safety. With a commitment to advanced treatments and "
                    "excellence, he guides our team in delivering trusted, "
                    "patient-centered care."
                ),
                specialties="",
            ),
            dict(
                name="Dr. Yadnit Siddharth Bhosale", specialty="Specialist Prosthodontics & Implantologist",
                qualification="MDS (Prosthodontics)", category="specialist",
                filename="dr-yadnit.jpg", bio="",
                specialties="Dental Implants\nVeneers\nDentures\nCrowns and Bridges\nFull Mouth Rehabilitation",
            ),
            dict(
                name="Dr. Mathew Joseph Thevalakattu", specialty="Specialist Orthodontist",
                qualification="MDS (Orthodontics)", category="specialist",
                filename="dr-mathew.jpg", bio="",
                specialties="Braces & Clear Aligners\nBite Correction\nJaw Alignment\nCrowding & Spacing Correction",
            ),
            dict(
                name="Dr. Kumar Sujeet Upendra Singh", specialty="Specialist Orthodontics",
                qualification="MDS (Orthodontics)", category="specialist",
                filename="dr-kumar.jpg", bio="",
                specialties="Braces & Clear Aligners\nBite Correction\nJaw Alignment\nCrowding & Spacing Correction",
            ),
            dict(
                name="Dr. Lorrain Valentine Jacob", specialty="General Dentist",
                qualification="BDS (General Dentist)", category="general",
                filename="dr-lorrain.jpg",
                bio="Provides comprehensive dental care, including routine check-ups, cleanings, fillings, and preventive treatments.",
                specialties="",
            ),
            dict(
                name="Dr. Alaa Ibrahim Mohammed", specialty="General Dentist",
                qualification="General Dentist", category="general",
                filename="dr-alaa.jpg",
                bio="Provides comprehensive dental care with a special focus on children's oral health.",
                specialties="",
            ),
            dict(
                name="Dr. Anitab Alex", specialty="General Dentist",
                qualification="MDS (General Dentist)", category="general",
                filename="dr-anitab.jpg",
                bio="Provides comprehensive dental care with a special focus on orthodontic treatments, including braces and clear aligners, teeth alignment, bite correction, and preventive dental care.",
                specialties="",
            ),
        ]
        for order, d in enumerate(doctors):
            filename = d.pop("filename")
            obj = Doctor(order=order, **d)
            obj.photo.save(filename, _file(doctors_dir / filename), save=False)
            obj.save()

        # ---- Testimonials ------------------------------------------------
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
