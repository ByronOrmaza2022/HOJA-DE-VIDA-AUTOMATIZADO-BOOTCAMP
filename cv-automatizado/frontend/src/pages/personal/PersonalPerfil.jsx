import { usePerfil } from "../../context/PerfilContext";
import { useEffect, useState } from "react";
import DataLoadingOverlay from "../../components/ui/DataLoadingOverlay";

export default function PersonalPerfil() {
  const { perfil } = usePerfil();
  const [transitionLoading, setTransitionLoading] = useState(true);

  useEffect(() => {
    setTransitionLoading(true);

    const timer = setTimeout(() => {
      setTransitionLoading(false);
    }, 500); // duración ms de carga

    return () => clearTimeout(timer);
  }, []);
  
  
    // 🟨 Transición visual de vista
    if (transitionLoading) {
      return <DataLoadingOverlay text="Cargando vista..." />;
    }

  if (!perfil) {
    return <DataLoadingOverlay text="Cargando perfil..." />;
  }


  return (
    <div className="space-y-4 max-w-xl">

      <h1 className="text-2xl font-semibold">
        ⚙️ Mi Perfil
      </h1>

      <div className="bg-white rounded-xl p-5 shadow space-y-2">
        <p><strong>Nombre:</strong> {perfil.nombres}</p>
        <p><strong>Apellidos:</strong> {perfil.apellidos}</p>
        <p><strong>Email:</strong> {perfil.email}</p>
      </div>

    </div>
  );
}
