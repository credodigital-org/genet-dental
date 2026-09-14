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


class Treatment(models.Model):
    """One card in the 'Comprehensive Treatments' grid."""

    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=160, unique=True)
    description = models.TextField(blank=True)
    photo = models.ImageField(upload_to="treatments/")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


class Doctor(models.Model):
    """One entry in 'Our Specialists'."""

    name = models.CharField(max_length=150)
    specialty = models.CharField(max_length=200)
    photo = models.ImageField(upload_to="doctors/")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.name


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
