from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase


class PublicApiSmokeTests(APITestCase):
    """Keep the public CMS endpoints covered by a small regression suite."""

    endpoints = (
        "clinic-info",
        "treatments",
        "services",
        "facilities",
        "doctors",
        "testimonials",
    )

    def test_public_content_endpoints_return_200(self):
        for endpoint in self.endpoints:
            with self.subTest(endpoint=endpoint):
                response = self.client.get(f"/api/{endpoint}/")
                self.assertEqual(response.status_code, 200)

    def test_content_write_operations_require_staff(self):
        for endpoint in ("doctors", "treatments", "services", "facilities", "testimonials"):
            with self.subTest(endpoint=endpoint):
                response = self.client.post(f"/api/{endpoint}/", {})
                self.assertIn(response.status_code, (401, 403))

    def test_staff_can_access_admin_content_endpoint(self):
        user = get_user_model().objects.create_user(
            username="cms-test", password="test-password", is_staff=True
        )
        self.client.force_authenticate(user=user)
        response = self.client.get("/api/doctors/")
        self.assertEqual(response.status_code, 200)
