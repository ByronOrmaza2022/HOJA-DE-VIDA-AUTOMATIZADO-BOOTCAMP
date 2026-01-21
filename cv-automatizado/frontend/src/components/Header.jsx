export default function Header({ perfil }) {
  return (
    <header className="mb-10 text-center">
      <h1 className="text-4xl font-bold">
        {perfil.nombres} {perfil.apellidos}
      </h1>

      <p className="text-gray-600">
        {perfil.descripcionperfil}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        {perfil.telefonofijo} · {perfil.sitioweb}
      </p>
    </header>
  );
}



/*---Version 1 -----
export default function HeaderCV({ perfil }) {
  return (
    <header style={{ marginBottom: "30px" }}>
      <h1>
        {perfil.nombres} {perfil.apellidos}
      </h1>
      <p>{perfil.nacionalidad}</p>
      <a href={perfil.sitioweb} target="_blank">
        {perfil.sitioweb}
      </a>
    </header>
  );
}*/
