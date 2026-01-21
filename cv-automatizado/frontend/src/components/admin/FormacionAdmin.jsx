export default function FormacionAdmin() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Rellena la información de tus estudios
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="input" placeholder="Universidad / Centro formativo" />
        <input className="input" placeholder="Titulación" />
        <input type="date" className="input" />
        <input type="date" className="input" />
      </div>

      <button className="mt-6 bg-red-500 text-white px-6 py-2 rounded-full">
        Añadir
      </button>
    </div>
  );
}
