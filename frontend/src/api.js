// Small fetch helper for the Django REST API.
//
// Every section component ships with real fallback content (the actual
// clinic copy/images), so the site still looks complete if the backend
// isn't running yet. Once the Django server is up, these calls pull
// whatever has been edited in the admin panel instead.

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function apiGet(path) {
  try {
    const res = await fetch(`${API_BASE}/api/${path}`);
    if (!res.ok) throw new Error(`Request to ${path} failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    // Backend not running / not reachable yet — let the caller fall back
    // to its static default content instead of breaking the page.
    console.warn(`[api] Falling back to static content for "${path}":`, err.message);
    return null;
  }
}

export async function submitAppointmentRequest(payload) {
  const res = await fetch(`${API_BASE}/api/appointment-requests/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new Error(detail.detail || "Could not submit appointment request.");
  }
  return res.json();
}

export function mediaUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
}
