import { useEffect, useState } from "react";
import { usePerfil } from "../../context/PerfilContext"; // ✅ perfil activo

const emptyForm = {
  nombrecurso: "",
  fechainicio: "",
  fechafin: "",
  totalhoras: "",
  descripcioncurso: "",
  entidadpatrocinadora: "",
  activarparaqueseveaenfront: true
};

export default function FormCurso({ onSave, initialData, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const { perfil } = usePerfil(); // ✅ perfil real

  // 🔄 Sincroniza cuando cambia el curso a editar
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
  };

  // 🧼 Normaliza payload antes de enviar al backend
  const normalizePayload = (data) => {
    const payload = {
      ...data,

      // 🗓️ Fechas limpias
      fechainicio: data.fechainicio || null,
      fechafin: data.fechafin || null,

      // 🔢 Número seguro
      totalhoras: data.totalhoras
        ? Number(data.totalhoras)
        : null,

      // 🔑 Perfil activo real
      idperfilconqueestaactivo: perfil?.idperfil
    };

    // ❌ Eliminamos basura heredada
    delete payload.idperfil;
    delete payload.id;
    delete payload.idcursorealizado;

    return payload;
  };

  const submit = (e) => {
    e.preventDefault();

    if (!perfil?.idperfil) {
      //console.warn("⚠️ No hay perfil activo seleccionado");
      return;
    }

    onSave(normalizePayload(form));
  };
  
  return (
    <form onSubmit={submit} className="space-y-4">

      {/* Nombre */}
      <div>
        <label className="text-sm font-medium">Nombre del curso</label>
        <input
          name="nombrecurso"
          value={form.nombrecurso}
          onChange={handleChange}
          placeholder="Curso"
          className="input"
          required
        />
      </div>

      {/* Entidad */}
      <div>
        <label className="text-sm font-medium">Institución</label>
        <input
          name="entidadpatrocinadora"
          value={form.entidadpatrocinadora}
          placeholder="Entidad"
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Fecha inicio</label>
          <input
            type="date"
            name="fechainicio"
            value={form.fechainicio}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Fecha fin</label>
          <input
            type="date"
            name="fechafin"
            value={form.fechafin}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      {/* Horas */}
      <div>
        <label className="text-sm font-medium">Total horas</label>
        <input
          type="number"
          name="totalhoras"
          value={form.totalhoras}
          onChange={handleChange}
          className="input"
          placeholder="Número de horas"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          name="descripcioncurso"
          value={form.descripcioncurso}
          onChange={handleChange}
          rows={3}
          className="input resize-none h-24"
          placeholder="Descripción"
        />
      </div>

      {/* Visible */}
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
