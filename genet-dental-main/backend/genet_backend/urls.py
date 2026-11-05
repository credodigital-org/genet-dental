# from django.conf import settings
# from django.conf.urls.static import static
# from django.contrib import admin
# from django.urls import include, path
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# class CurrentUserView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         return Response({"username": request.user.username, "is_staff": request.user.is_staff})

# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("api/", include("clinic.urls")),
#     path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
#     path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
#     path("api/auth/me/", CurrentUserView.as_view(), name="current_user"),
# ]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "username": request.user.username,
            "is_staff": request.user.is_staff
        })


def health_check(request):
    return JsonResponse({
        "status": "ok"
    })


urlpatterns = [
    path("admin/", admin.site.urls),

    # Health check for UptimeRobot
    path("health/", health_check, name="health-check"),

    # API
    path("api/", include("clinic.urls")),

    # Authentication
    path(
        "api/auth/token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),
    path(
        "api/auth/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),
    path(
        "api/auth/me/",
        CurrentUserView.as_view(),
        name="current_user"
    ),
]


if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )