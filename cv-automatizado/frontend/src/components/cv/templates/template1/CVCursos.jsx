import AnimateFade from "../../../ui/AnimateFade"

export default function CVCursos({ items }) {
  if (!items.length) return null;

  return (
    <section>
      <h2 className="font-semibold mb-4">
        Cursos Realizados
      </h2>

      <div className="space-y-4">
        {items.map(c => (
          <div
            key={c.idcursorealizado}
            className="border rounded-xl p-4 cont-spacefour-templateone"
          >
            <AnimateFade>
              <h3 className="font-semibold">
                {c.nombrecurso}
              </h3>

              <div className="flex gap-2 mt-2 items-center">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded ">
                  <p>{c.totalhoras} horas</p>
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                  <p>{c.entidadpatrocinadora}</p>
                </span>
              </div>

              <p className="text-sm mt-2">
                {c.descripcioncurso}
              </p>
            </AnimateFade>
          </div>
        ))}
      </div>
    </section>
  );
}

