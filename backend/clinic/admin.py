from django.contrib import admin

from .models import (
    AboutContent,
    AppointmentRequest,
    ClinicInfo,
    ContactMessage,
    CoreValue,
    Doctor,
    Facility,
    GalleryImage,
    ServiceIcon,
    Service,
    Testimonial,
    Treatment,
)


@admin.register(ClinicInfo)
class ClinicInfoAdmin(admin.ModelAdmin):
    list_display = ("clinic_name", "phone", "email", "years_experience")

    fieldsets = (
        ("Identity", {"fields": ("clinic_name", "tagline", "established_year", "logo", "smiles_wordmark")}),
        ("Hero section", {"fields": ("hero_heading", "hero_paragraph", "hero_photo", "quick_services_row")}),
        (
            "Excellence in Dental Care",
            {"fields": ("excellence_heading", "excellence_paragraph", "years_experience", "patients_count_label", "excellence_video")},
        ),
        ("Insurance", {"fields": ("insurance_strip",)}),
        (
            "Contact & location",
            {
                "fields": (
                    "address_line",
                    "address_city",
                    "phone",
                    "whatsapp",
                    "email",
                    "working_hours",
                    "map_image",
                )
            },
        ),
    )

    def has_add_permission(self, request):
        return not ClinicInfo.objects.exists()


@admin.register(ServiceIcon)
class ServiceIconAdmin(admin.ModelAdmin):
    list_display = ("name", "order")
    list_editable = ("order",)
    ordering = ("order",)


@admin.register(Treatment)
class TreatmentAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("name",)}
    ordering = ("order",)


# @admin.register(Service)
# class ServiceAdmin(admin.ModelAdmin):
#     list_display = ("name", "slug", "order")
#     list_editable = ("order",)
#     prepopulated_fields = {"slug": ("name",)}
#     ordering = ("order",)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["name", "order"]
    ordering = ["order", "id"]


@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ("name", "order")
    list_editable = ("order",)
    ordering = ("order",)


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    list_display = ("name", "specialty", "category", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("category", "is_active")
    ordering = ("order",)
    fieldsets = (
        (None, {"fields": ("name", "specialty", "qualification", "category", "photo", "order", "is_active")}),
        ("Our Doctors page", {"fields": ("bio", "specialties")}),
    )


@admin.register(CoreValue)
class CoreValueAdmin(admin.ModelAdmin):
    list_display = ("title", "icon_name", "order")
    list_editable = ("order",)
    ordering = ("order",)


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ("caption", "order")
    list_editable = ("order",)
    ordering = ("order",)


@admin.register(AboutContent)
class AboutContentAdmin(admin.ModelAdmin):
    list_display = ("hero_heading",)

    def has_add_permission(self, request):
        return not AboutContent.objects.exists()


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("patient_name", "role_label", "rating", "order")
    list_editable = ("order",)
    ordering = ("order",)


@admin.register(AppointmentRequest)
class AppointmentRequestAdmin(admin.ModelAdmin):
    list_display = ("full_name", "phone", "email", "service_needed", "preferred_date", "created_at", "is_handled")
    list_editable = ("is_handled",)
    list_filter = ("is_handled", "service_needed")
    search_fields = ("full_name", "phone", "email")
    ordering = ("-created_at",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "subject", "phone", "created_at", "is_handled")
    list_editable = ("is_handled",)
    list_filter = ("is_handled",)
    search_fields = ("full_name", "email", "subject")
    ordering = ("-created_at",)
