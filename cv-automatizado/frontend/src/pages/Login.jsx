import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import logo from "../assets/microsoft-logo_svgstack_com_28801768843648.svg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tipoSeleccionado, setTipoSeleccionado] = useState("ADMIN");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  // 💾 Recordar último usuario
  useEffect(() => {
    /*const lastUser = localStorage.getItem("last_username");
    if (lastUser) {
      setUsername(lastUser);
    }*/
    setMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      if (!response.ok) {
        setError("Credenciales incorrectas");
        return;
      }

      const data = await response.json();

      if (data.rol !== tipoSeleccionado) {
        setError(
          `Este usuario no tiene permiso para ingresar como ${tipoSeleccionado}`
        );
        return;
      }

      // 💾 Guardamos último usuario
      //localStorage.setItem("last_username", username);

      // ✅ Login válido
      login({
        username: data.username,
        rol: data.rol
      });

      navigate(data.rol === "ADMIN" ? "/admin" : "/personal");

    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">

      {/* Card */}
      <div
        className={`
          w-full max-w-md bg-white rounded-2xl shadow-xl px-10 py-12
          transform transition-all duration-700 ease-out
          ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >

        {/* Branding */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 object-contain mb-3"
          />
          <h1 className="text-2xl font-semibold text-gray-800">
            Sistema de Hoja de Vida
          </h1>
          <p className="text-sm text-gray-500">
            Acceso seguro
          </p>
        </div>

        {/* Selector de tipo */}
        <div className="flex gap-3 mb-6">
          {["ADMIN", "PERSONAL"].map(tipo => (
            <button
              type="button"
              key={tipo}
              onClick={() => setTipoSeleccionado(tipo)}
              className={`flex-1 rounded-xl py-3 text-sm font-medium transition-all border
                ${
                  tipoSeleccionado === tipo
                    ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm scale-[1.02]"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
            >
              {tipo === "ADMIN" ? "Administrador" : "Personal"}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Usuario */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Usuario
            </label>

            <User
              size={18}
              className="absolute left-3 top-10 text-gray-400"
            />

            <input
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition"
              placeholder="Ingrese su usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contraseña
            </label>

            <Lock
              size={18}
              className="absolute left-3 top-10 text-gray-400"
            />

            <input
              type="password"
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2
                       bg-blue-600 hover:bg-blue-700 text-white
                       rounded-lg py-3 text-sm font-medium
                       transition active:scale-[0.98]
                       disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Iniciar sesión →"}
          </button>
        </form>
      </div>
    </div>
  );
}
