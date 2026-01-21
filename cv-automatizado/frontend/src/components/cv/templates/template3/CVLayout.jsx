import CVHeader from "./CVHeader";
import CVSidebar from "./CVSidebar";
import CVBody from "./CVBody";

export default function CVLayout({ data }) {
  if (!data || !data.perfil) return null;

  return (
    <div className="template-three flex justify-center bg-gray-300">
      <div className="w-[794px] min-h-[1123px] bg-white shadow-xl flex overflow-hidden">

        {/* Sidebar oscuro */}
        <CVSidebar perfil={data.perfil} />

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col">
          <CVHeader perfil={data.perfil} />
          <CVBody data={data} />
        </div>

      </div>
    </div>
  );
}
