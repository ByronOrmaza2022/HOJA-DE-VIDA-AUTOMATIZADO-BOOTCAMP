import CVHeader from "./CVHeader";
import CVSidebar from "./CVSidebar";
import CVExperiencia from "./CVExperiencia";
import CVCursos from "./CVCursos";
import CVReconocimientos from "./CVReconocimientos";

const HEADER_HEIGHT = 140; // px
const PAGE_HEIGHT = 1123; //

export default function CVLayout({ data }) {
  return (
    <div className="template4 flex justify-center bg-slate-100">
      <div className="bg-white w-[794px] shadow-xl overflow-hidden" style={{ minHeight: PAGE_HEIGHT }}>

        {/* HEADER */}
        <CVHeader perfil={data.perfil} />

        <div className="flex items-strech" style={{ height: PAGE_HEIGHT - HEADER_HEIGHT }}>
          {/* SIDEBAR */}
          <div className="sidebar-wrapper border-r border-slate-300 h-[1123px]">
            <CVSidebar perfil={data.perfil} />
          </div>

          {/* MAIN */}
          <main className="p-10 space-y-10 text-slate-700">
            <CVExperiencia items={data.experiencia_laboral} />
            <CVCursos items={data.cursos} />
            <CVReconocimientos items={data.reconocimientos} />
          </main>
        </div>
      </div>
    </div>
  );
}
