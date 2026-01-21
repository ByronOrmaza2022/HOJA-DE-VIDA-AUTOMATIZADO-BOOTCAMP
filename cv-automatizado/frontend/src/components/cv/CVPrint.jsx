import { useCV } from "../../context/CVContext";
import Template1 from "./templates/template1/CVLayout";
import Template2 from "./templates/template2/CVLayout";
import Template3 from "./templates/template3/CVLayout";

export default function CVPrint({ template }) {
  const { cvData } = useCV();
  if (!cvData) return null;

  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3
  };

  const SelectedTemplate = templates[template] || Template1;

  const printData = {
    ...cvData,
    experiencia_laboral: cvData.experiencia_laboral?.filter(e => e.activarparaqueseveaenfront),
    cursos: cvData.cursos?.filter(c => c.activarparaqueseveaenfront),
    reconocimientos: cvData.reconocimientos?.filter(r => r.activarparaqueseveaenfront)
  };

  return (
    <div
      id="cv-print-area"
      className="
        fixed top-0 left-0
        bg-white
        pointer-events-none
        opacity-0
        scale-100
      "
      style={{ width: "794px" }} // A4 exacto
    >
      <SelectedTemplate data={printData} />
    </div>
  );
}
