export default function AdminHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <p className="text-sm text-gray-500">Porcentaje de CV completado</p>
        <div className="w-64 bg-gray-200 h-2 rounded">
          <div className="bg-orange-400 h-2 rounded w-[35%]" />
        </div>
      </div>

      <button className="text-red-500 hover:underline">
        Guardar y salir
      </button>
    </div>
  );
}
