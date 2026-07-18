// Lightweight mock authentication — there is no real backend here.
// It just remembers a signed-in role in localStorage so the app can
// gate the /tenant and /admin routes and offer a working sign-out.

const KEY = "rentease_auth_role";

export function login(role) {
  localStorage.setItem(KEY, role);
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function getRole() {
  return localStorage.getItem(KEY);
}

export function isAuthenticated(role) {
  const stored = getRole();
  return role ? stored === role : Boolean(stored);
}
