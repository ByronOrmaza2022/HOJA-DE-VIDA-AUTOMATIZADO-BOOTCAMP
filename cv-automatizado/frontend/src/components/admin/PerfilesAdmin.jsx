import { useEffect, useState } from "react";
import { authFetch } from "../../api/authFetch";
import { usePerfil } from "../../context/PerfilContext";
import PerfilCard from "./PerfilCard";

export default function PerfilesAdmin() {
  const [perfiles, setPerfiles] = useState([]);
  const { perfil, seleccionarPerfil } = usePerfil();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    authFetch("http://localhost:8000/api/admin/perfiles/")
      .then(res => res.json())
      .then(setPerfiles)
    return () => clearTimeout(timer);

  }, []);

  if(loading){
    return(
     <div className="flex items-center gap-3 text-gray-500">
       <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600" />
       Cargando perfiles...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Perfiles registrados</h2>

      <div className="grid grid-cols-2 gap-4">
        {perfiles.map(p => (
          <PerfilCard
            key={p.idperfil}
            perfil={p}
            activo={perfil?.idperfil === p.idperfil}
            onSelect={() => seleccionarPerfil(p)}
          />
        ))}
      </div>
    </div>
  );
}
