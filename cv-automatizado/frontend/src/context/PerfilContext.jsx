import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext"; // ✅ Usuario logueado
import { authFetch } from "../api/authFetch";

const PerfilContext = createContext();

export function PerfilProvider({ children }) {
  const [perfil, setPerfil] = useState(null);
  const { user } = useAuth(); // 🔐 usuario autenticado
  const [loadingPerfil, setLoadingPerfil] = useState(true);
  /* ======================================================
     ✅ FUNCIÓN 1: Selección manual de perfil (ADMIN)
     ====================================================== */
  const seleccionarPerfil = (perfilData) => {
    setPerfil(perfilData);
  };

  const limpiarPerfil = () => {
    setPerfil(null);
  };

  /* ======================================================
     👤 FUNCIÓN 2: Carga automática de perfil PERSONAL
     ====================================================== */
  useEffect(() => {
    if (!user) {
      // 🔄 Si se cierra sesión limpiamos perfil
      setPerfil(null);
      return;
    }

    // 🛡️ Solo aplica para usuarios PERSONAL
    if (user.rol !== "PERSONAL") return;

    //console.log("👤 Cargando perfil PERSONAL automáticamente...");

    cargarPerfilPersonal();
  }, [user]);

  /* ======================================================
     🔎 Obtiene el perfil del usuario autenticado
     ====================================================== */
  const cargarPerfilPersonal = async () => {
    setLoadingPerfil(true);
    try {
      //const res = await fetch("http://localhost:8000/api/perfil/me/", {
      //  credentials: "include"
      //});
      const res = await authFetch("http://localhost:8000/api/perfil/me/");

      if (!res.ok) {
        //console.warn("⚠️ No se pudo cargar perfil personal");
        setPerfil(null);
        return;
      }

      const data = await res.json();
      //console.log("✅ Perfil personal cargado:", data);
      setPerfil(data);
    } catch (err) {
      //console.error("❌ Error cargando perfil personal", err);
      setPerfil(null);
    } finally {
      setLoadingPerfil(false);
    }
  };

  return (
    <PerfilContext.Provider
      value={{
        perfil,
        seleccionarPerfil, // 🟢 ADMIN
        limpiarPerfil,       // 🧹 limpieza global
        loadingPerfil
      }}
    >
      {children}
    </PerfilContext.Provider>
  );
}

export function usePerfil() {
  return useContext(PerfilContext);
}
