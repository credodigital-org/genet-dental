from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

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
from .permissions import PublicCreateAdminManage, PublicReadAdminWrite
from .serializers import (
    AboutContentSerializer,
    AppointmentRequestSerializer,
    ClinicInfoSerializer,
    ContactMessageSerializer,
    CoreValueSerializer,
    DoctorSerializer,
    FacilitySerializer,
    GalleryImageSerializer,
    ServiceIconSerializer,
    ServiceSerializer,
    TestimonialSerializer,
    TreatmentSerializer,
)


class SingletonModelViewSet(viewsets.ModelViewSet):
    permission_classes = [PublicReadAdminWrite]
    singleton_model = None

    def get_queryset(self):
        return self.singleton_model.objects.all()

    def create(self, request, *args, **kwargs):
        obj = self.singleton_model.objects.first()
        if obj:
            serializer = self.get_serializer(obj, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)
        return super().create(request, *args, **kwargs)


class ClinicInfoViewSet(SingletonModelViewSet):
    serializer_class = ClinicInfoSerializer
    singleton_model = ClinicInfo

    def list(self, request, *args, **kwargs):
        info = ClinicInfo.objects.first()
        if info is None:
            return Response({})
        return Response(self.get_serializer(info).data)

    @action(detail=False, methods=["delete"], url_path="video")
    def delete_video(self, request):
        if not request.user or not request.user.is_staff:
            return Response({"detail": "Authentication required."}, status=status.HTTP_403_FORBIDDEN)
        info = ClinicInfo.objects.first()
        if info is None or not info.excellence_video:
            return Response(status=status.HTTP_204_NO_CONTENT)
        info.excellence_video.delete(save=False)
        info.excellence_video = None
        info.save(update_fields=["excellence_video"])
        return Response(status=status.HTTP_204_NO_CONTENT)


class AboutContentViewSet(SingletonModelViewSet):
    serializer_class = AboutContentSerializer
    singleton_model = AboutContent

    def list(self, request, *args, **kwargs):
        info = AboutContent.objects.first()
        if info is None:
            return Response({})
        return Response(self.get_serializer(info).data)


class ServiceIconViewSet(viewsets.ModelViewSet):
    queryset = ServiceIcon.objects.all()
    serializer_class = ServiceIconSerializer
    permission_classes = [PublicReadAdminWrite]


class TreatmentViewSet(viewsets.ModelViewSet):
    queryset = Treatment.objects.all()
    serializer_class = TreatmentSerializer
    permission_classes = [PublicReadAdminWrite]


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [PublicReadAdminWrite]


class FacilityViewSet(viewsets.ModelViewSet):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer
    permission_classes = [PublicReadAdminWrite]


class DoctorViewSet(viewsets.ModelViewSet):
    serializer_class = DoctorSerializer
    permission_classes = [PublicReadAdminWrite]

    def get_queryset(self):
        qs = Doctor.objects.all()
        if not (self.request.user and self.request.user.is_staff):
            qs = qs.filter(is_active=True)
        return qs


class CoreValueViewSet(viewsets.ModelViewSet):
    queryset = CoreValue.objects.all()
    serializer_class = CoreValueSerializer
    permission_classes = [PublicReadAdminWrite]


class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    permission_classes = [PublicReadAdminWrite]


class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [PublicReadAdminWrite]


class AppointmentRequestViewSet(viewsets.ModelViewSet):
    queryset = AppointmentRequest.objects.all()
    serializer_class = AppointmentRequestSerializer
    permission_classes = [PublicCreateAdminManage]
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    def perform_create(self, serializer):
        serializer.save(is_handled=False)


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [PublicCreateAdminManage]
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    def perform_create(self, serializer):
        serializer.save(is_handled=False)
