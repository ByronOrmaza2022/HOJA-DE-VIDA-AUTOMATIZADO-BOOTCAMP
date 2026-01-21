export default function CVHeader({ perfil }) {
  if (!perfil) return null;

  return (
    <header className="px-10 py-8 border-b border-slate-200 animate-section cont-spaceone-template-four">
      <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
        {perfil.nombres} {perfil.apellidos}
      </h1>

      <p className="mt-2 text-slate-600 max-w-xl leading-relaxed">
        {perfil.descripcionperfil}
      </p>
    </header>
  );
}
