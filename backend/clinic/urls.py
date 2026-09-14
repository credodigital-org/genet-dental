from rest_framework.routers import DefaultRouter

from .views import (
    AppointmentRequestViewSet,
    ClinicInfoViewSet,
    DoctorViewSet,
    ServiceIconViewSet,
    TestimonialViewSet,
    TreatmentViewSet,
)

router = DefaultRouter()
router.register("clinic-info", ClinicInfoViewSet, basename="clinic-info")
router.register("service-icons", ServiceIconViewSet, basename="service-icon")
router.register("treatments", TreatmentViewSet, basename="treatment")
router.register("doctors", DoctorViewSet, basename="doctor")
router.register("testimonials", TestimonialViewSet, basename="testimonial")
router.register("appointment-requests", AppointmentRequestViewSet, basename="appointment-request")

urlpatterns = router.urls
