export default function Cursos({ cursos }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {cursos.map(curso => (
        <div
          key={curso.idcursorealizado}
          className="border rounded-lg p-4 bg-gray-50"
        >
          <h4 className="font-semibold text-gray-800">
            {curso.nombrecurso}
          </h4>

          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
              {curso.totalhoras} horas
            </span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
              {curso.entidadpatrocinadora}
            </span>
          </div>

          <p className="text-gray-700 mt-2">
            {curso.descripcioncurso}
          </p>
        </div>
      ))}
    </div>
  );
}


/*---------Version 3 - curso,perience, reconocimineto
export default function Cursos({ cursos }) {
  if (!cursos || cursos.length === 0) return null;

  return (
    <>
      {cursos.map(curso => (
        <div key={curso.idcursorealizado} className="mb-4">
          <h4 className="font-semibold">
            {curso.nombrecurso}
          </h4>

          <p className="text-sm text-gray-500">
            {curso.entidadpatrocinadora} · {curso.totalhoras} horas
          </p>

          <p className="text-gray-700">
            {curso.descripcioncurso}
          </p>
        </div>
      ))}
    </>
  );
}
*/