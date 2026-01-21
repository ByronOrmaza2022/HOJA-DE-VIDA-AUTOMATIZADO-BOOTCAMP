export default function CVHeader({ perfil }) {
  return (
    <header className="px-8 py-6 border-b animate-section cont-spacetwo-template-three">
      <h1 className="text-2xl font-bold text-gray-800">
        {perfil.nombres} {perfil.apellidos}
      </h1>

      <p className="text-gray-600 mt-1">
        {perfil.descripcionperfil || "Perfil Profesional"}
      </p>
    </header>
  );
}
