export default function Experience({ item }) {
  return (
    <div className="relative pl-10 pb-8">
      {/* Punto timeline */}
      <span className="absolute left-2 top-1 w-3 h-3 bg-blue-600 rounded-full"></span>

      {/* Línea */}
      <span className="absolute left-3 top-4 h-full border-l border-gray-300"></span>

      <h3 className="text-lg font-semibold">
        {item.cargodesempenado}
      </h3>

      <p className="text-gray-600 font-medium">
        {item.nombrempresa} · {item.lugarempresa}
      </p>

      <p className="text-sm text-gray-500 mb-2">
        {item.fechainiciogestion} – {item.fechafingestion || "Actual"}
      </p>

      <p className="text-gray-700">
        {item.descripcionfunciones}
      </p>
    </div>
  );
}


/*-------Version 3 - curso, experience, reconocimineto
export default function Experience({ item }) {
  return (
    <div className="border-l-4 border-blue-500 pl-4 mb-6">
      <h3 className="text-lg font-semibold">
        {item.cargodesempenado}
      </h3>

      <p className="text-gray-600">
        {item.nombrempresa} — {item.lugarempresa}
      </p>

      <p className="text-sm text-gray-500">
        {item.fechainiciogestion} – {item.fechafingestion || "Actual"}
      </p>

      <p className="mt-2 text-gray-700">
        {item.descripcionfunciones}
      </p>
    </div>
  );
}
*/


/*-----VERSION 2
export default function Experience({ item }) {
  return (
    <div className="mb-6 border-l-4 border-blue-500 pl-4">
      <h3 className="font-semibold text-lg">
        {item.cargodesempenado}
      </h3>

      <p className="text-gray-600">
        {item.nombrempresa} — {item.lugarempresa}
      </p>

      <p className="text-sm text-gray-500">
        {item.fechainiciogestion} - {item.fechafingestion || "Actual"}
      </p>

      <p className="text-gray-700 mt-2">
        {item.descripcionfunciones}
      </p>
    </div>
  );
}
*/


/*---------Version 1 ------------
export default function Experiencia({ experiencias }) {
  if (!experiencias || experiencias.length === 0) {
    return <p>No hay experiencia laboral</p>;
  }

  return (
    <section>
      <h2>Experiencia Laboral</h2>

      {experiencias.map(exp => (
        <div key={exp.idexperiencilaboral} style={{ marginBottom: "20px" }}>
          <h3>{exp.cargodesempenado}</h3>
          <strong>{exp.nombrempresa}</strong>
          <p>
            {exp.fechainiciogestion} –{" "}
            {exp.fechafingestion || "Actualidad"}
          </p>
          <p>{exp.descripcionfunciones}</p>
        </div>
      ))}
    </section>
  );
}*/
