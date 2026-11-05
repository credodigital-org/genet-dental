from rest_framework.permissions import BasePermission, SAFE_METHODS


class PublicReadAdminWrite(BasePermission):
    """Public visitors may read published content; staff may manage it."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_staff)


class PublicCreateAdminManage(BasePermission):
    """Public forms can create; staff can list/read/update/delete."""

    def has_permission(self, request, view):
        if getattr(view, "action", None) == "create":
            return True
        return bool(request.user and request.user.is_staff)
