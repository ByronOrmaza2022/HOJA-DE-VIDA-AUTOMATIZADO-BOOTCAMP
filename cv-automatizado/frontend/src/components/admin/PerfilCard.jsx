export default function PerfilCard({ perfil, activo, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`text-left p-4 rounded-xl border transition
        ${activo
          ? "border-blue-600 bg-blue-50"
          : "border-gray-200 hover:border-blue-400"}
      `}
    >
      <h3 className="font-semibold">
        {perfil.nombres} {perfil.apellidos}
      </h3>
      <p className="text-sm text-gray-600">{perfil.email}</p>
    </button>
  );
}
