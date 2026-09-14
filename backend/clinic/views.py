from rest_framework import mixins, viewsets
from rest_framework.response import Response

from .models import (
    AppointmentRequest,
    ClinicInfo,
    Doctor,
    ServiceIcon,
    Testimonial,
    Treatment,
)
from .serializers import (
    AppointmentRequestSerializer,
    ClinicInfoSerializer,
    DoctorSerializer,
    ServiceIconSerializer,
    TestimonialSerializer,
    TreatmentSerializer,
)


class ClinicInfoViewSet(viewsets.ViewSet):
    """Exposes the single ClinicInfo row at /api/clinic-info/."""

    def list(self, request):
        info = ClinicInfo.objects.first()
        if info is None:
            return Response({})
        return Response(ClinicInfoSerializer(info, context={"request": request}).data)


class ServiceIconViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceIcon.objects.all()
    serializer_class = ServiceIconSerializer


class TreatmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer


class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Doctor.objects.filter(is_active=True)
    serializer_class = DoctorSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class AppointmentRequestViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """Public endpoint: only allows creating a new appointment request.

    Staff review and manage submissions from the Django admin panel.
    """

    queryset = AppointmentRequest.objects.all()
    serializer_class = AppointmentRequestSerializer
