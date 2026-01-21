import CVHeader from "./CVHeader";
import CVSidebar from "./CVSidebar";
import CVExperiencia from "./CVExperiencia";
import CVCursos from "./CVCursos";
import CVReconocimientos from "./CVReconocimientos";

const HEADER_HEIGHT = 121; // px
const PAGE_HEIGHT = 1123; // A4 px aproxHEADER_HEIGHT = 180;

export default function CVLayout({ data }) {
  return (
    <div className="template1 bg-gray-200 flex justify-center">
      <div className="bg-white w-[794px] shadow-lg overflow-hidden" style={{ minHeight: PAGE_HEIGHT }}>

        {/* HEADER */}
          {data?.perfil && <CVHeader perfil={data.perfil} />}
        
        <div className="grid grid-cols-[280px_1fr]" style={{ height: PAGE_HEIGHT - HEADER_HEIGHT }}>
            {/* SIDEBAR */}
          <CVSidebar perfil={data.perfil} />

          {/* CONTENIDO */}
          <div className="p-8 space-y-10 overflow-hidden">
            {data.experiencia_laboral?.length > 0 && (
              <section className="animate-section">
                <CVExperiencia items={data.experiencia_laboral} />
              </section>
            )}
            
            {data.cursos?.length > 0 && (
              <section className="animate-section">
                <CVCursos items={data.cursos} />
              </section>
            )}
            
            {data.reconocimientos?.length > 0 && (
              <section className="animate-section">
                <CVReconocimientos items={data.reconocimientos} />
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

