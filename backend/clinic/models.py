from django.db import models


class ClinicInfo(models.Model):
    """Singleton-style model holding site-wide clinic details.

    Edit the single row of this model in the admin panel to update the
    address, contact details, and headline stats shown across the site.
    """

    clinic_name = models.CharField(max_length=200, default="Genet Dental Specialized Center")
    tagline = models.CharField(max_length=200, default="Smiles Always...")
    established_year = models.PositiveIntegerField(default=2014)

    hero_heading = models.CharField(max_length=200, default="Smiles Always...")
    hero_paragraph = models.TextField(
        default=(
            "Experience world-class dental care in a state-of-the-art facility. "
            "We combine rigorous clinical standards with boutique hospitality "
            "for a truly premium patient journey."
        )
    )

    years_experience = models.PositiveIntegerField(default=12)
    patients_count_label = models.CharField(max_length=20, default="23k+")

    excellence_heading = models.CharField(max_length=200, default="Excellence in Dental Care")
    excellence_paragraph = models.TextField(
        default=(
            "At Genet Specialized Dental Center, we are dedicated to providing "
            "personalized, high-quality dental care in a comfortable and "
            "stress-free environment. Our team of experienced specialists uses "
            "the latest technology to ensure optimal oral health for you and "
            "your family."
        )
    )

    address_line = models.CharField(max_length=255, default="Junaibi Tower, 2nd Floor, Muroor Road")
    address_city = models.CharField(max_length=100, default="Abu Dhabi, UAE")
    phone = models.CharField(max_length=50, default="02 666 99 45")
    whatsapp = models.CharField(max_length=50, default="050 346 9945")
    email = models.EmailField(default="info@genetdental.com")
    working_hours = models.CharField(max_length=100, default="Sun - Sat, 9:30 AM - 8:30 PM")

    map_image = models.ImageField(upload_to="branding/", blank=True, null=True)
    hero_photo = models.ImageField(upload_to="branding/", blank=True, null=True)
    logo = models.ImageField(upload_to="branding/", blank=True, null=True)
    smiles_wordmark = models.ImageField(upload_to="branding/", blank=True, null=True)
    quick_services_row = models.ImageField(upload_to="branding/", blank=True, null=True)
    insurance_strip = models.ImageField(upload_to="branding/", blank=True, null=True)
    excellence_video = models.FileField(upload_to="branding/", blank=True, null=True)

    def __str__(self):
        return self.clinic_name

    class Meta:
        verbose_name = "Clinic Info"
        verbose_name_plural = "Clinic Info"


class ServiceIcon(models.Model):
    """The row of quick-service icons under the hero (Dental Check-up, etc.)."""

    name = models.CharField(max_length=100)
    icon = models.ImageField(upload_to="icons/")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


# class Treatment(models.Model):
#     """One card in the 'Comprehensive Treatments' grid."""

#     name = models.CharField(max_length=150)
#     slug = models.SlugField(max_length=160, unique=True)
#     description = models.TextField(blank=True)
#     photo = models.ImageField(upload_to="treatments/")
#     order = models.PositiveIntegerField(default=0)

#     class Meta:
#         ordering = ["order", "id"]

#     def __str__(self):
#         return self.name

from django.db import models
from django.utils.text import slugify


class Treatment(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    description = models.TextField(blank=True, default="")
    image = models.ImageField(
        upload_to="treatments/",
        blank=True,
        null=True
    )
    order = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    """One entry in 'Our Specialists' (home) and the full 'Our Doctors' page."""

    CATEGORY_CHOICES = [
        ("medical_director", "Medical Director"),
        ("specialist", "Specialist Doctor"),
        ("general", "General Dentist"),
    ]

    name = models.CharField(max_length=150)
    specialty = models.CharField(max_length=200)
    photo = models.ImageField(upload_to="doctors/")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="general")
    qualification = models.CharField(
        max_length=150, blank=True,
        help_text="Short badge shown under the name, e.g. 'MDS (Prosthodontics)'",
    )
    bio = models.TextField(blank=True, help_text="Longer bio shown on the Our Doctors page.")
    specialties = models.TextField(
        blank=True,
        help_text="One item per line — rendered as a bullet list for specialist doctors.",
    )

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name

    def specialties_list(self):
        return [line.strip() for line in self.specialties.splitlines() if line.strip()]


class Testimonial(models.Model):
    """A patient testimonial card."""

    patient_name = models.CharField(max_length=150)
    role_label = models.CharField(max_length=100, default="Verified Patient")
    quote = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.patient_name


class AppointmentRequest(models.Model):
    """Submissions from the 'Request an Appointment' form."""

    full_name = models.CharField(max_length=150)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    service_needed = models.CharField(max_length=150, blank=True)
    preferred_date = models.DateField(blank=True, null=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_handled = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} ({self.created_at:%Y-%m-%d})"


class Service(models.Model):
    """One card on the standalone 'Our Services' page (more granular than
    the homepage Treatment grid — e.g. Teeth Cleaning, Invisalign, Dentures)."""

    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=160, unique=True)
    description = models.TextField(blank=True)
    icon = models.ImageField(upload_to="services/", blank=True, null=True)
    photo = models.ImageField(upload_to="services/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class Facility(models.Model):
    """One card on the 'Our Facilities' page (equipment / technology)."""

    name = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    photo = models.ImageField(upload_to="facilities/", blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name_plural = "Facilities"

    def __str__(self):
        return self.name


class CoreValue(models.Model):
    """One of the three 'Core Values' cards on the About page."""

    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    icon_name = models.CharField(
        max_length=40, default="precision",
        help_text="Which built-in icon to show: precision, care, or innovation.",
    )
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]
        verbose_name_plural = "Core Values"

    def __str__(self):
        return self.title


class GalleryImage(models.Model):
    """One photo in the 'Our Memories' gallery on the About page."""

    caption = models.CharField(max_length=200, blank=True)
    photo = models.ImageField(upload_to="gallery/")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.caption or f"Gallery photo {self.pk}"


class AboutContent(models.Model):
    """Singleton-style model for the editable text on the About page."""

    hero_heading = models.CharField(max_length=200, default="Excellence in Every Smile")
    hero_paragraph = models.TextField(
        default=(
            "Providing world-class dental care with unyielding precision and "
            "profound compassion. Your journey to perfect oral health begins "
            "here in a meticulously designed, sterile, and calming environment."
        )
    )
    story_heading = models.CharField(max_length=200, default="Our Story")
    story_paragraph = models.TextField(
        default=(
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
    )
    hero_photo = models.ImageField(upload_to="branding/", blank=True, null=True)

    def __str__(self):
        return "About Page Content"

    class Meta:
        verbose_name = "About Page Content"
        verbose_name_plural = "About Page Content"

    def has_add_permission(self):
        return not AboutContent.objects.exists()


class ContactMessage(models.Model):
    """Submissions from the 'Contact Us' page form."""

    full_name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    phone = models.CharField(max_length=50, blank=True)
    comments = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_handled = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} ({self.created_at:%Y-%m-%d})"
