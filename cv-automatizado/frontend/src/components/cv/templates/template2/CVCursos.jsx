import CVSection from "./CVSection";
import AnimateFade from "../../../ui/AnimateFade"

export default function CVCursos({ items }) {
  if (!items.length) return null;

  return (
    <CVSection title="Cursos">
      {items.map(curso => (
        <div key={curso.idcursorealizado}>
          <AnimateFade>
            <p className="font-medium">
              {curso.nombrecurso}
            </p>
            <p className="text-sm text-gray-500">
              {curso.entidadpatrocinadora}
            </p>
          </AnimateFade>
        </div>
      ))}
    </CVSection>
  );
}
