import AnimateFade from "../../../ui/AnimateFade"

export default function CVBody({ data }) {
  return (
    <main className="flex-1 px-8 py-6 space-y-8 text-gray-800">

      {/* EXPERIENCIA */}
      <section className="animate-section cont-spacethree-template-three">
        <h2 className="text-lg font-semibold border-b pb-1 mb-4">
          Experiencia Laboral
        </h2>

        {data.experiencia_laboral?.map(exp => (
          <div key={exp.idexperiencilaboral} className="mb-4 ">
            <AnimateFade>
              <div className="flex justify-between text-sm font-medium">
                <span><p>{exp.cargodesempenado}</p></span>
                <span className="text-gray-500">
                  <p>{exp.fechainiciogestion} – {exp.fechafingestion || "Actual"}</p>
                </span>
              </div>

              <p className="text-sm text-gray-600">
                {exp.nombrempresa} · {exp.lugarempresa}
              </p>

              {exp.descripcionfunciones && (
                <p className="text-sm mt-1 text-gray-700">
                  {exp.descripcionfunciones}
                </p>
              )}
            </AnimateFade>
          </div>
        ))}
      </section>

      {/* CURSOS */}
      {data.cursos?.length > 0 && (
        <section className="animate-section cont-spacefour-template-three">
          <h2 className="text-lg font-semibold border-b pb-1 mb-4">
            Cursos
          </h2>

          <ul className="list-disc list-inside text-sm space-y-1">
            {data.cursos.map(c => (
              <AnimateFade>
                <li key={c.idcursorealizado}>                
                  <strong>{c.nombrecurso}</strong>
                  {c.entidadpatrocinadora && (
                    <span className="text-gray-500">
                      {" "}– {c.entidadpatrocinadora}
                    </span>
                  )}                
                </li>
              </AnimateFade>
            ))}
          </ul>
        </section>
      )}

      {/* RECONOCIMIENTOS */}
      {data.reconocimientos?.length > 0 && (
        <section className="animate-section cont-spacefive-template-three">
          <h2 className="text-lg font-semibold border-b pb-1 mb-4">
            Reconocimientos
          </h2>

          <ul className="list-disc list-inside text-sm space-y-1">
            {data.reconocimientos.map(r => (
              <AnimateFade>
                <li key={r.idreconocimiento}>
                  <strong>{r.tiporeconocimiento}</strong>
                  {r.entidadpatrocinadora && (
                    <span className="text-gray-500">
                      {" "}– {r.entidadpatrocinadora}
                    </span>
                  )}       
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{r.descripcionreconocimiento}</p>
                </li>
              </AnimateFade>
            ))}
          </ul>
        </section>
      )}

    </main>
  );
}
