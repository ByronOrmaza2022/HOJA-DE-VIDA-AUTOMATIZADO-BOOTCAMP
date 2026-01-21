export function logoutAndRedirect() {
  // Limpia storage
  sessionStorage.removeItem("user");

  // Limpia perfil si existe
  sessionStorage.removeItem("perfil");

  // Redirige
  window.location.href = "/login";
}
