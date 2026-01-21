import { useEffect, useState } from "react";
import { usePerfil } from "../../context/PerfilContext"; // ✅ perfil activo

const emptyForm = {
  nombrempresa: "",
  cargodesempenado: "",
  fechainiciogestion: "",
  fechafingestion: "",
  descripcionfunciones: "",
  // idperfilconqueestaactivo ❌ ya no vive en el form
  activarparaqueseveaenfront: true
};

export default function FormExperiencia({ onSave, initialData, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  // ✅ Perfil activo real
  const { perfil } = usePerfil();

  // 🔄 Sincroniza cuando cambia el registro a editar
  useEffect(() => {
    if (initialData) {
      setForm({ ...emptyForm, ...initialData });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });

    //const { name, value } = e.target;
    //setForm(prev => ({ ...prev, [name]: value }));
  };

  // 🧼 Normaliza y limpia campos antes de enviar al backend
const normalizePayload = (data) => {
  const payload = {
    ...data,

    // 🗓️ Evita enviar strings vacíos en fechas (Django rechaza "")
    fechainiciogestion: data.fechainiciogestion || null,
    fechafingestion: data.fechafingestion || null,

    // 🔑 Inyectamos perfil activo real
    idperfilconqueestaactivo: perfil?.idperfil
  };

  // ❌ Eliminamos basura que viene de initialData
  delete payload.idperfil;     // 👈 causa principal del 400
  delete payload.id;           // 👈 por si existe en ediciones

  return payload;
};


  const handleSubmit = (e) => {
    e.preventDefault();

    // 🛡️ Seguridad adicional
    if (!perfil?.idperfil) {
      //console.warn("⚠️ No hay perfil activo seleccionado");
      return;
    }

    onSave(normalizePayload(form));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      {/* Empresa */}
      <div>      
        <label className="text-sm font-medium">Nombre de la empresa</label>
        <input
          name="nombrempresa"
          value={form.nombrempresa}
          onChange={handleChange}
          placeholder="Empresa"
          className="input"
          required
        />
      </div>

      {/* Cargo */}
      <div>
        <label className="text-sm font-medium">Cargo desempeñado</label>
        <input
          name="cargodesempenado"
          value={form.cargodesempenado}
          onChange={handleChange}
          placeholder="Cargo desempeñado"
          className="input"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Fecha inicio */}
        <div>
          <label className="text-sm font-medium">Fecha inicio</label>
          <input
            type="date"
            name="fechainiciogestion"
            value={form.fechainiciogestion}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Fecha fin */}
        <div>
          <label className="text-sm font-medium">Fecha fin</label>
          <input
            type="date"
            name="fechafingestion"
            value={form.fechafingestion}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      {/* Descripción */}
      <div>
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          name="descripcionfunciones"
          value={form.descripcionfunciones}
          onChange={handleChange}
          placeholder="Descripción de funciones"
          className="input resize-none h-24"
        />
      </div>
      
      {/* Visible/Oculto */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="activarparaqueseveaenfront"
          checked={form.activarparaqueseveaenfront}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm">Visible en CV</span>
      </div>

      {/* Acciones */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] transition"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
