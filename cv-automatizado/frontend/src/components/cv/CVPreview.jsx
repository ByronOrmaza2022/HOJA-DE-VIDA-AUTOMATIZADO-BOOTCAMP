import { useCV } from "../../context/CVContext";
import Template1 from "../../components/cv/templates/template1/CVLayout";
import Template2 from "../../components/cv/templates/template2/CVLayout";
import Template3 from "../../components/cv/templates/template3/CVLayout";
import Template4 from "../../components/cv/templates/template4/CVLayout";

export default function CVPreview({ template, mode = "admin" }) {
  const { cvData } = useCV();
  if (!cvData) return null;

  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
    template4: Template4
  };

  const SelectedTemplate = templates[template] || Template1;

  const previewData = {
    ...cvData,
    experiencia_laboral: cvData.experiencia_laboral?.filter(e => e.activarparaqueseveaenfront),
    cursos: cvData.cursos?.filter(c => c.activarparaqueseveaenfront),
    reconocimientos: cvData.reconocimientos?.filter(r => r.activarparaqueseveaenfront)
  };

  const visibleKey = `${cvData.perfil?.idperfil}-${template}`;

  // 🎯 estilos según contexto
  const wrapperClass =
    mode === "admin"
      ? "bg-gray-200 p-4"
      : "bg-transparent p-0";

  const scaleClass =
    mode === "admin"
      ? "scale-[0.8]"
      : "scale-100";

  return (
    <div className={wrapperClass}>
      {/* 🎬 CONTENEDOR ANIMADO (SOLO UI) */}
      <div className={`${scaleClass} transition-transform duration-300`}>
        {/* 📄 CONTENIDO ESTÁTICO (PDF) */}
        <div id="cv-print-area" key={visibleKey}>
          <SelectedTemplate data={previewData} />
        </div>
      </div>
    </div>
  );
}
