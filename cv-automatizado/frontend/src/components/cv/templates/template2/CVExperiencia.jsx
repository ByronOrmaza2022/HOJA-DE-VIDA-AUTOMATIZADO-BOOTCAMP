import CVSection from "./CVSection";
import AnimateFade from "../../../ui/AnimateFade"

export default function CVExperiencia({ items }) {
  if (!items.length) return null;

  return (
    <CVSection title="Experiencia">
      {items.map(exp => (
        <div key={exp.idexperiencilaboral} className="border-l-2 border-blue-600 pl-4 cont-spacethree-template-two">
          <AnimateFade>
            <h3 className="font-semibold text-gray-800">
              {exp.cargodesempenado}
              <span className="text-gray-500 font-normal">
                {" · "} {exp.nombrempresa}
              </span>
            </h3>

            {exp.descripcionfunciones && (
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                {exp.descripcionfunciones}
              </p>
            )}
          </AnimateFade>
        </div>
      ))}
    </CVSection>
  );
}
