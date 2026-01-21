import CVHeader from "./CVHeader";
import CVExperiencia from "./CVExperiencia";
import CVCursos from "./CVCursos";
import CVReconocimientos from "./CVReconocimientos";

export default function CVLayout({ data }) {
  return (
    <div className="template-two flex justify-center bg-gray-100 ">
      <div
        className="
          bg-white
          w-[794px]
          min-h-[1123px]
          px-16
          py-14
          font-sans
          text-gray-800
        "
      >
        <CVHeader perfil={data.perfil} />

        <div className="mt-12 space-y-12">
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
  );
}
