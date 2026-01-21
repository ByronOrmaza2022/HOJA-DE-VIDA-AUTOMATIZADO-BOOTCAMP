import { createContext, useContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext();

const HEARTBEAT_INTERVAL = 15_000; // ❤️ cada 15s
const SESSION_EXPIRED_ANIMATION_TIME = 2000; // 🎬 duración overlay

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booting, setBooting] = useState(true);

  const [sessionExpired, setSessionExpired] = useState(false); // 🎬 UX
  const [loggingOut, setLoggingOut] = useState(false); // 🚪 UX

  // ✅ Fuente única de verdad
  const [hadSession, setHadSession] = useState(() => {
    return sessionStorage.getItem("hadSession") === "true";
  });

  const heartbeatRef = useRef(null);
  const alreadyChecked = useRef(false); // 🛡️ evita doble ejecución en StrictMode

  /* ===========================
     🔎 Verificación de sesión
     =========================== */
  const checkSession = async ({ silent = false } = {}) => {
    try {
      const res = await fetch("http://localhost:8000/api/me/", {
        credentials: "include"
      });

      // 🟢 Sesión válida
      if (res.ok) {
        const data = await res.json();
            
        setUser(prev => {
          // 🛡️ Evita re-render si no cambió nada relevante
          if (
            prev &&
            prev.id === data.id &&
            prev.username === data.username &&
            prev.rol === data.rol
          ) {
            return prev; // no cambia referencia → no dispara efectos
          }
        
          return data;
        });
      
        if (!hadSession) {
          setHadSession(true);
          sessionStorage.setItem("hadSession", "true");
        }
      }


      // 🔴 Sesión expirada
      else if (res.status === 401) {
        if (hadSession) {
          //console.warn("⚠️ Sesión expirada detectada");
        
          // 🎬 Dispara animación (también desde heartbeat ❤️)
          setSessionExpired(true);
        
          // ⏳ Esperamos a que la animación sea visible
          await delay(SESSION_EXPIRED_ANIMATION_TIME);
        
          // 🔥 Limpieza backend (borra cookie si existe)
          try {
            await fetch("http://localhost:8000/api/logout/", {
              method: "POST",
              credentials: "include"
            });
          } catch {}
        
          // 🔐 Limpieza frontend
          clearSession();
        
          // 🎬 Apagamos overlay
          setSessionExpired(false);
        } else {
          // 🟡 No había sesión previa → limpieza silenciosa
          clearSession();
        }
      }

    } catch (err) {
      // ❗ Solo errores reales de red
      //console.error("Error de conexión verificando sesión", err);
    } finally {
  // 🎯 Boot inicial con delay visual mínimo
  if (booting) {
    const MIN_BOOT_TIME = 1200; // 🎬 ms visibles mínimos
    await delay(MIN_BOOT_TIME);

    setLoading(false);
    setBooting(false);
  }
}
  };

  /* ===========================
     ❤️ Heartbeat automático
     =========================== */
  useEffect(() => {
    //console.log("🚀 AuthProvider mounted");

    // 🛡️ Previene doble ejecución en React StrictMode
    if (!alreadyChecked.current) {
      alreadyChecked.current = true;

      // 🚦 Solo verificar sesión si hubo sesión previa
      if (hadSession) {
        checkSession();
      } else {
        setLoading(false);
        setBooting(false);
      }
    }

    // ❤️ Intervalo continuo
    heartbeatRef.current = setInterval(() => {
      if (hadSession) {
        //console.log("❤️ Heartbeat tick");
        checkSession({ silent: true });
      }
    }, HEARTBEAT_INTERVAL);

    return () => {
      //console.log("🧹 AuthProvider unmounted → clearing interval");
      clearInterval(heartbeatRef.current);
    };
  }, [hadSession]);

  /* ===========================
     🔐 Login
     =========================== */
  const login = (userData) => {
    sessionStorage.setItem("hadSession", "true"); //👈 flag UX
    setHadSession(true);
    setUser(userData);
  };

  /* ===========================
     🚪 Logout manual
     =========================== */
  const logout = async () => {
    setLoggingOut(true); // 🎬 overlay
    
    try {
      await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include"
      });
    } catch {}
  
    // 🎬 Dejamos visible la animación completa
    await delay(1200);
  
    // 🔐 Limpieza total (esto provocará redirección)
    clearSession();
  
    // ⏳ Pequeño frame extra para evitar flicker
    await delay(100);
  
    setLoggingOut(false);
  };


  /* ===========================
     🧹 Limpieza centralizada
     =========================== */
  const clearSession = () => {
    setUser(null);
    setHadSession(false);
    sessionStorage.removeItem("hadSession"); //👈 limpiar flag
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        booting,
        hadSession,
        sessionExpired,
        loggingOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ===========================
   🛠 Utils
   =========================== */
function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

export function useAuth() {
  return useContext(AuthContext);
}
