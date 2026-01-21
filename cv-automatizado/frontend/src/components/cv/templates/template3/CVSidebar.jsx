export default function CVSidebar({ perfil }) {
  return (
    <aside className="w-[240px] bg-slate-900 text-slate-100 p-6 space-y-6 cont-spaceone-template-three">

      {/* Nombre */}
      <div className="animate-section">
        <h2 className="text-lg font-bold leading-tight">
          {perfil.nombres}
        </h2>
        <p className="text-sm text-slate-400">
          {perfil.apellidos}
        </p>
      </div>

      {/* Datos personales */}
      <div className="space-y-2 text-sm animate-section">
        {perfil.nacionalidad && <p>🌎 {perfil.nacionalidad}</p>}
        {perfil.lugarnacimiento && <p>📍 {perfil.lugarnacimiento}</p>}
        {perfil.telefonofijo && <p>📞 {perfil.telefonofijo}</p>}
        {perfil.email && <p>✉️ {perfil.email}</p>}
        {perfil.sitioweb && (
          <p className="break-all text-blue-400">
            {perfil.sitioweb}
          </p>
        )}
      </div>

      {/* Línea divisora */}
      <hr className="border-slate-700 animate-section " />

      {/* Sección fija */}
      <div className="animate-section ">
        <h3 className="uppercase text-xs tracking-wider text-slate-400 mb-2">
          Perfil
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {perfil.descripcionperfil}
        </p>
      </div>

    </aside>
  );
}
