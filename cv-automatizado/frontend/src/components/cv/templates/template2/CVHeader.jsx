export default function CVHeader({ perfil }) {
  if (!perfil) return null;

  return (
    <header className="relative animate-section cont-spaceone-template-two">

      {/* Línea acento */}
      <span className="absolute left-0 top-0 h-1 w-12 bg-blue-600 rounded-full" />

      <h1 className="mt-4 text-4xl font-bold tracking-tight">
        {perfil.nombres} {perfil.apellidos}
      </h1>

      <p className="mt-2 text-base text-gray-600">
        {perfil.descripcionperfil || "Profesional"}
        {perfil.ciudad && ` · ${perfil.ciudad}`}
      </p>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 cont-spaceone-span-template-two">
        {perfil.email && <span>{perfil.email}</span>}
        {perfil.telefonofijo && <span>{perfil.telefonofijo}</span>}
        {perfil.sitioweb && <span>{perfil.sitioweb}</span>}
      </div>
    </header>
  );
}
