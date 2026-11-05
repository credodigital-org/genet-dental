from rest_framework import serializers

from .models import (
    AboutContent,
    AppointmentRequest,
    ClinicInfo,
    ContactMessage,
    CoreValue,
    Doctor,
    Facility,
    GalleryImage,
    Service,
    ServiceIcon,
    Testimonial,
    Treatment,
)


class ClinicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicInfo
        fields = "__all__"


class ServiceIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceIcon
        fields = ["id", "name", "icon", "order"]



# class TreatmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Treatment
#         fields = ["id", "name", "slug", "description", "photo", "order"]


class TreatmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Treatment
        fields = ["id", "name", "slug", "description", "image", "order"]
# class ServiceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Service
#         fields = ["id", "name", "slug", "description", "icon", "photo", "order"]

# class ServiceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Service
#         fields = ["id", "name", "image", "order"]

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "id",
            "name",
            "description",
            "image",
            "icon",
            "order",
        ]


class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = ["id", "name", "description", "photo", "order"]


class DoctorSerializer(serializers.ModelSerializer):
    specialties_list = serializers.SerializerMethodField()

    class Meta:
        model = Doctor
        fields = [
            "id", "name", "specialty", "photo", "order", "is_active",
            "category", "qualification", "bio", "specialties", "specialties_list",
        ]

    def get_specialties_list(self, obj):
        return obj.specialties_list()


class CoreValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreValue
        fields = ["id", "title", "description", "icon_name", "order"]


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ["id", "caption", "photo", "order"]


class AboutContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutContent
        fields = "__all__"


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ["id", "patient_name", "role_label", "quote", "rating", "order"]


class AppointmentRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentRequest
        fields = [
            "id", "full_name", "phone", "email", "service_needed",
            "preferred_date", "notes", "created_at", "is_handled",
        ]
        read_only_fields = ["id", "created_at"]


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "full_name", "email", "subject", "phone", "comments", "created_at", "is_handled"]
        read_only_fields = ["id", "created_at"]
