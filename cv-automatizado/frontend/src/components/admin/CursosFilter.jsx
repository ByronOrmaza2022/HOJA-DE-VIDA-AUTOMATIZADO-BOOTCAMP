export default function CursosFilter({ filtros, setFiltros }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h3 className="font-semibold text-gray-700 mb-3">
        🔍 Filtrar cursos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nombre del curso"
          className="border rounded px-3 py-2"
          value={filtros.nombre}
          onChange={(e) =>
            setFiltros({ ...filtros, nombre: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Plataforma / Entidad"
          className="border rounded px-3 py-2"
          value={filtros.institucion}
          onChange={(e) =>
            setFiltros({ ...filtros, institucion: e.target.value })
          }
        />
      </div>
    </div>
  );
}
