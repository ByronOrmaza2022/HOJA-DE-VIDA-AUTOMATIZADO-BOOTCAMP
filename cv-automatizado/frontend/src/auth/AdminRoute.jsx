import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading, sessionExpired, loggingOut } = useAuth();

  // 🎬 Bloqueamos navegación durante overlays
  if (sessionExpired || loggingOut) {
    return null;
  }

  if (loading) {
    return <div className="p-10 text-gray-500">Cargando sesión...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.rol !== "ADMIN") {
    return <Navigate to="/cv" replace />;
  }

  return children;
}
