export default function CVSidebar({ perfil }) {
  return (
    <aside className="h-full px-6 py-8 bg-gradient-to-b from-blue-400 to-green-400 border-r border-slate-200  ">
      <div className="bg-white rounded-xl p-6 space-y-5 shadow-sm animate-section cont-spacetwo-templateone">

        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
          Datos personales
        </h2>

        <div className="text-[13px] space-y-3 text-slate-700 ">
          <p><b className="font-medium text-slate-900">Nacionalidad:</b> {perfil.nacionalidad}</p>
          <p><b className="font-medium text-slate-900">Estado civil:</b> {perfil.estadocivil}</p>
          <p><b className="font-medium text-slate-900">Teléfono:</b> {perfil.telefonofijo}</p>
          <p><b className="font-medium text-slate-900">Correo:</b> {perfil.email}</p>

          {perfil.sitioweb && (
            <p>
              <b>Sitio web:</b>{" "}
              <a className="text-blue-600">
                {perfil.sitioweb}
              </a>
            </p>
          )}
        </div>

      </div>
    </aside>
  );
}
