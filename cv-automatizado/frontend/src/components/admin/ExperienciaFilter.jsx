export default function ExperienciaFilter({ filtros, setFiltros }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h3 className="font-semibold text-gray-700 mb-3">
        🔍 Filtrar experiencia laboral
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Cargo"
          className="border rounded px-3 py-2"
          value={filtros.cargo}
          onChange={(e) =>
            setFiltros({ ...filtros, cargo: e.target.value })
          }
        />

        <input
          placeholder="Empresa"
          className="border rounded px-3 py-2"
          value={filtros.empresa}
          onChange={(e) =>
            setFiltros({ ...filtros, empresa: e.target.value })
          }
        />
      </div>
    </div>
  );
}
