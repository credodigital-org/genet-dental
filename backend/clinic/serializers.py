from rest_framework import serializers

from .models import (
    AppointmentRequest,
    ClinicInfo,
    Doctor,
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


class TreatmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatment
        fields = ["id", "name", "slug", "description", "photo", "order"]


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ["id", "name", "specialty", "photo", "order", "is_active"]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ["id", "patient_name", "role_label", "quote", "rating", "order"]


class AppointmentRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentRequest
        fields = [
            "id",
            "full_name",
            "phone",
            "email",
            "service_needed",
            "preferred_date",
            "notes",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]
