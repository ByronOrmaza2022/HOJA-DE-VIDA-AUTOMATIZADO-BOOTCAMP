import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import SessionOverlay from "../ui/SessionOverlay";

export default function SessionManager() {
  const { sessionExpired } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionExpired) return;

    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1800); // ⏱️ duración visible de animación

    return () => clearTimeout(timer);
  }, [sessionExpired]);

  if (!sessionExpired) return null;

  return (
    <SessionOverlay text="Sesión caducada. Redirigiendo..." />
  );
}
