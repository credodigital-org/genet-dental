from rest_framework.routers import DefaultRouter

from .views import (
    AboutContentViewSet,
    AppointmentRequestViewSet,
    ClinicInfoViewSet,
    ContactMessageViewSet,
    CoreValueViewSet,
    DoctorViewSet,
    FacilityViewSet,
    GalleryImageViewSet,
    ServiceIconViewSet,
    ServiceViewSet,
    TestimonialViewSet,
    TreatmentViewSet,
)

router = DefaultRouter()
router.register("clinic-info", ClinicInfoViewSet, basename="clinic-info")
router.register("about-content", AboutContentViewSet, basename="about-content")
router.register("service-icons", ServiceIconViewSet, basename="service-icon")
router.register("treatments", TreatmentViewSet, basename="treatment")
router.register("services", ServiceViewSet, basename="service")
router.register("facilities", FacilityViewSet, basename="facility")
router.register("doctors", DoctorViewSet, basename="doctor")
router.register("core-values", CoreValueViewSet, basename="core-value")
router.register("gallery", GalleryImageViewSet, basename="gallery")
router.register("testimonials", TestimonialViewSet, basename="testimonial")
router.register("appointment-requests", AppointmentRequestViewSet, basename="appointment-request")
router.register("contact-messages", ContactMessageViewSet, basename="contact-message")

urlpatterns = router.urls
