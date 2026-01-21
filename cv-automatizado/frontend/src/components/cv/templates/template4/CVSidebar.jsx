export default function CVSidebar({ perfil }) {
  if (!perfil) return null;

  return (
    <aside className="h-full p-8 space-y-8 border-r border-slate-300 animate-section cont-spacetwo-template-four">
      <Section title="Contacto">
        <p>{perfil.email}</p>
        <p>{perfil.telefonofijo}</p>
        <p>{perfil.nacionalidad}</p>
      </Section>

      <Section title="Habilidades">
        {perfil.habilidades?.map((h, i) => (
          <span
            key={i}
            className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 mr-2 mb-2"
          >
            {h}
          </span>
        ))}
      </Section>
    </aside>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h3 className="text-[11px] font-semibold tracking-widest uppercase text-slate-500 border-b border-slate-200 pb-2">
        {title}
      </h3>
      <div className="text-sm space-y-2 text-slate-700 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
