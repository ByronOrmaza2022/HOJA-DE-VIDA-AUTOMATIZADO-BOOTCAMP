import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  LogOut
} from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

export default function PersonalSidebar() {
  const { logout, user } = useAuth();

  return (
    <aside className="ms-sidebar">
      {/* 👤 Usuario */}
      <div className="ms-user">
        <div className="ms-avatar">
          {user?.username?.[0]?.toUpperCase()}
        </div>
        <div>
          <div className="ms-username">{user?.username}</div>
          <div className="ms-role">Personal</div>
        </div>
      </div>

      {/* 📌 Navegación */}
      <nav className="ms-nav">
        <NavLink to="/personal/dashboard">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/personal/cv">
          <FileText size={18} />
          Mi CV
        </NavLink>

        <NavLink to="/personal/perfil">
          <User size={18} />
          Perfil
        </NavLink>
      </nav>

      {/* 🚪 Logout */}
      <button className="ms-logout" onClick={logout}>
        <LogOut size={18} />
        Cerrar sesión
      </button>
    </aside>
  );
}
