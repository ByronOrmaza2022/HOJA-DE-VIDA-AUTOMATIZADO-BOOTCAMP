import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { usePerfil } from "../../context/PerfilContext";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaBriefcase,
  FaGraduationCap,
  FaAward,
  FaUsers
} from "react-icons/fa";

export default function AdminSidebar({ tab, setTab }) {
  const { logout, user } = useAuth();
  const { limpiarPerfil, perfil } = usePerfil();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    try {
      await fetch("http://localhost:8000/api/logout/", {
        method: "POST",
        credentials: "include"
      });
    } catch (e) {
      console.error("Error cerrando sesión", e);
    }

    // 🔴 LIMPIAR TODO
    limpiarPerfil();
    logout();

    // 🔁 redirección limpia
    navigate("/login", { replace: true });
  };

  const Item = ({ icon, label, value, disabled }) => (
    <button
      disabled={disabled}
      onClick={() => setTab(value)}
      className={`
        w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium
        transition-all
        ${
          disabled
            ? "opacity-40 cursor-not-allowed"
            : tab === value
            ? "bg-blue-50 text-blue-700 shadow-sm"
            : "text-gray-600 hover:bg-gray-100"
        }
      `}
    >
      <span className="text-base">{icon}</span>
      {label}
    </button>
  );

  return (
    <aside className="h-full w-72 bg-white border-r border-gray-200 shadow-sm flex flex-col">

      {/* 🏷️ BRAND / USER */}
      <div className="px-5 py-4 border-b flex items-center gap-3">
        <FaUserCircle className="text-3xl text-blue-600" />

        <div className="leading-tight">
          <p className="font-semibold text-sm text-gray-800">
            {user?.username || "Usuario"}
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            {user?.rol || "—"}
          </p>
        </div>
      </div>

      {/* 📂 MENÚ */}
      <nav className="flex-1 p-3 space-y-1">
        <Item icon={<FaUsers />} label="Perfiles" value="perfiles" />

        <Item
          icon={<FaBriefcase />}
          label="Experiencia"
          value="experiencia"
          disabled={!perfil}
        />

        <Item
          icon={<FaGraduationCap />}
          label="Cursos"
          value="cursos"
          disabled={!perfil}
        />

        <Item
          icon={<FaAward />}
          label="Reconocimientos"
          value="reconocimientos"
          disabled={!perfil}
        />
      </nav>

      {/* 🚪 LOGOUT */}
      <div className="p-4 border-t">
        <button
          onClick={cerrarSesion}
          className="
            w-full flex items-center justify-center gap-2
            rounded-lg py-2 text-sm font-medium
            bg-red-50 text-red-600
            hover:bg-red-100
            transition
          "
        >
          <FaSignOutAlt />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
