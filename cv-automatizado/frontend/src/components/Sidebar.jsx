export default function Sidebar({ perfil }) {
  return (
    <aside className="bg-gray-50 p-6 rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold text-gray-800">
        {perfil.nombres} {perfil.apellidos}
      </h1>

      <p className="text-gray-600 mt-1">
        {perfil.descripcionperfil}
      </p>

      <div className="mt-6 space-y-2 text-sm text-gray-700">
        <p><strong>Nacionalidad:</strong> {perfil.nacionalidad}</p>
        <p><strong>Estado civil:</strong> {perfil.estadocivil}</p>
        <p><strong>Teléfono:</strong> {perfil.telefonofijo}</p>

        {perfil.sitioweb && (
          <p>
            <a
              href={perfil.sitioweb}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Sitio web
            </a>
          </p>
        )}
      </div>

      {/* Skills (estáticos por ahora) */}
      <div className="mt-8">
        <h3 className="font-semibold text-gray-800 mb-2">
          Habilidades
        </h3>

        <div className="flex flex-wrap gap-2">
          {["Django", "React", "SQL Server", "APIs REST"].map(skill => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
