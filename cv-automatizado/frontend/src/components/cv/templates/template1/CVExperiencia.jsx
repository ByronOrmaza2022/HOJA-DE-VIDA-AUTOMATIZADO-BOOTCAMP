import AnimateFade from "../../../ui/AnimateFade"

export default function CVExperiencia({ items }) {
  if (!items.length) return null;

  return (
    <section>
      <h2 className="font-semibold mb-4">
        Experiencia Laboral
      </h2>

      <div className="relative border-l-2 border-gray-200 pl-9 space-y-6">

        {items.map(exp => (
          <div key={exp.idexperiencilaboral} className="relative cont-spacethree-templateone">
            <AnimateFade>
              <span className="absolute -left-[23px] top-1.5 w-3 h-3 bg-blue-500 rounded-full"></span>
              
              <h3 className="font-semibold left-12">
                {exp.cargodesempenado}
              </h3>

              <p className="text-sm text-gray-500">
                {exp.nombrempresa} · {exp.fechainiciogestion} – {exp.fechafingestion || "Actual"}
              </p>

              <p className="text-sm mt-1">
                {exp.descripcionfunciones}
              </p>
            </AnimateFade>
          </div>
        ))}
      </div>
    </section>
  );
}
