export default function CVHeader({ perfil }) {
  return (
    <div className="p-8 border-b bg-blue-400 animate-section cont-spaceone-templateone">
      <h1 className="text-2xl font-bold text-gray-900">
        {perfil.nombres} {perfil.apellidos}
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        {perfil.descripcionperfil}
      </p>
    </div>
  );
}
