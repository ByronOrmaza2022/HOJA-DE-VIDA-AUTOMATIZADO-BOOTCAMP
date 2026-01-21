import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function PersonalHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white/80 backdrop-blur border-b flex items-center justify-between px-6 shadow-sm">

      <div className="font-medium text-gray-700">
        Panel Personal
      </div>

      <div className="flex items-center gap-4">

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 text-white flex items-center justify-center font-semibold">
            {user?.username?.charAt(0).toUpperCase()}
          </div>

          <div className="text-sm">
            <div className="font-medium">{user?.username}</div>
            <div className="text-gray-500 text-xs">{user?.rol}</div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={async () => {
            await logout();
            navigate("/login", { replace: true });
          }}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
          title="Cerrar sesión"
        >
          <LogOut size={18} />
        </button>


      </div>
    </header>
  );
}
