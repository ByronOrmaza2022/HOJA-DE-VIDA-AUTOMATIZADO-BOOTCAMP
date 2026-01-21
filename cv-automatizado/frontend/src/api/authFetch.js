import { logoutAndRedirect } from "./logoutHelper";

export async function authFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  // 🔥 TOKEN EXPIRADO / NO AUTORIZADO
  if (response.status === 401) {
    //logoutAndRedirect();
    throw new Error("Sesión expirada");
  }

  return response;
}
