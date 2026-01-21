import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PageTransition from "./components/ui/PageTransition";
import Login from "./pages/Login";
import CV from "./pages/CV";
import AdminPanel from "./pages/AdminPanel";
import AdminRoute from "./auth/AdminRoute";
import { useAuth } from "./auth/AuthContext";
import SessionOverlay from "./components/ui/SessionOverlay";
import { useEffect } from "react";
/* PERSONAL */
import PersonalLayout from "./components/personal/PersonalLayout";
import PersonalDashboard from "./pages/personal/PersonalDashboard";
import PersonalCV from "./pages/personal/PersonalCV";
import PersonalPerfil from "./pages/personal/PersonalPerfil";
import ExportOverlay from "./components/ui/ExportOverlay";
import { useCV } from "./context/CVContext";


export default function App() {
  const navigate = useNavigate();

  const {
    loading,
    sessionExpired,
    loggingOut,
    booting,
    hadSession
  } = useAuth();

  const { exporting } = useCV();
  //console.log("APP exporting:", exporting);


  // 🛡️ Bloqueo global de navegación mientras hay overlays activos
  const navigationBlocked = loggingOut || sessionExpired;

    /* ============================================
     🔁 Redirección automática por estado de sesión
     ============================================ */
  useEffect(() => {
    // 🔴 Sesión expirada
    if (sessionExpired) {
      const t = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500); // ⏱️ debe coincidir con overlay

      return () => clearTimeout(t);
    }

    // 🚪 Logout manual terminado
    if (!loggingOut && !hadSession && !loading && !booting) {
      navigate("/login", { replace: true });
    }
  }, [sessionExpired, loggingOut, hadSession, loading, booting, navigate]);


  return (
    <>
      {/* 🎬 Overlay global con prioridad */}
      {/* 🚪 Cerrando sesión */}
      {/* ⚠️ Sesión caducada */}
      {/* 🌀 Restaurando sesión */}
      {loggingOut ? (
        <SessionOverlay text="Cerrando sesión..." />
      ) : sessionExpired ? (
        <SessionOverlay text="Sesión caducada. Redirigiendo..." />
      ) : hadSession && booting && loading ? (
        <SessionOverlay text="Restaurando sesión..." />
      ) : null}

      {/* 📄 Exportando PDF */}
{exporting && (
  <ExportOverlay text="Generando PDF..." />
)}


      {/* 🚦 Mientras haya overlay, NO renderizamos el router */}
      {!navigationBlocked && (
        <Routes>
          {/* raíz */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* públicas */}
          <Route
            path="/login"
            element={
              <PageTransition>
                <Login />
              </PageTransition>
            }
          />

          {/* CV público */}
          <Route
            path="/cv"
            element={
              <PageTransition>
                <CV />
              </PageTransition>
            }
          />

          {/* SOLO ADMIN */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <PageTransition>
                  <AdminPanel />
                </PageTransition>
              </AdminRoute>
            }
          />

          {/* SOLO PERSONAL */}
          <Route
            path="/personal"
            element={
              <PageTransition>
                <PersonalLayout />
              </PageTransition>
            }
          >
            <Route index element={<PersonalDashboard />} />
            <Route path="dashboard" element={<PersonalDashboard />} />
            <Route path="cv" element={<PersonalCV />} />
            <Route path="perfil" element={<PersonalPerfil />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </>
  );
}
