export default function CVCursos({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="animate-section cont-spacethree-template-four">
      <SectionTitle>Cursos</SectionTitle>

      <div className="space-y-6">
        {items.map(curso => (
          <div key={curso.idcursorealizado}>
            <h4 className="font-semibold text-slate-800">
              {curso.nombrecurso}
            </h4>

            <p className="text-sm text-slate-500">
              {curso.entidadpatrocinadora}
            </p>

            {curso.descripcionreconocimiento && (
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {curso.descripcioncurso}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-lg font-semibold text-slate-800 mb-4 relative cont-spacethree-span-template-four">
      {children}
      <span className="absolute left-0 -bottom-1 h-0.5 w-10 bg-blue-600" />
    </h2>
  );
}

