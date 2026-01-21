export default function ReconocimientosFilter({ filtros, setFiltros }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h3 className="font-semibold text-gray-700 mb-3">
        🔍 Filtrar reconocimientos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Tipo de reconocimiento"
          className="border rounded px-3 py-2"
          value={filtros.tipo}
          onChange={(e) =>
            setFiltros({ ...filtros, tipo: e.target.value })
          }
        />

        <input
          placeholder="Entidad patrocinadora"
          className="border rounded px-3 py-2"
          value={filtros.entidad}
          onChange={(e) =>
            setFiltros({ ...filtros, entidad: e.target.value })
          }
        />
      </div>
    </div>
  );
}
