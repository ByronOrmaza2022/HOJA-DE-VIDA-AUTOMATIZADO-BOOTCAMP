import { useEffect, useState } from "react";
import { usePerfil } from "../../context/PerfilContext"; // ✅ perfil activo

const emptyForm = {
  tiporeconocimiento: "",
  fechareconocimiento: "",
  descripcionreconocimiento: "",
  entidadpatrocinadora: "",
  activarparaqueseveaenfront: true
};

export default function FormReconocimiento({ onSave, initialData, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const { perfil } = usePerfil(); // ✅ perfil real

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
  };

  // 🧼 Normaliza payload antes de enviar
  const normalizePayload = (data) => {
    const payload = {
      ...data,

      // 🗓️ Fecha limpia
      fechareconocimiento: data.fechareconocimiento || null,

      // 🔑 Perfil activo real
      idperfilconqueestaactivo: perfil?.idperfil
    };

    // ❌ Limpieza defensiva
    delete payload.idperfil;
    delete payload.id;
    delete payload.idreconocimiento;

    return payload;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!perfil?.idperfil) {
      //console.warn("⚠️ No hay perfil activo seleccionado");
      return;
    }

    onSave(normalizePayload(form));
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      {/* Tipo */}
      <div>      
        <label className="text-sm font-medium">Tipo de reconocimiento</label>
        <input
          name="tiporeconocimiento"
          value={form.tiporeconocimiento}
          onChange={handleChange}
          placeholder="Tipo de reconocimiento"
          className="input"
          required
        />
      </div>

      {/* Entidad */}
      <div>      
        <label className="text-sm font-medium">Empresa</label>
        <input
          name="entidadpatrocinadora"
          value={form.entidadpatrocinadora}
          onChange={handleChange}
          placeholder="Entidad otorgante"
          className="input"
        />
      </div>

      {/* Fecha */}
      <div>
        <label className="text-sm font-medium">Fecha</label>
        <input
          type="date"
          name="fechareconocimiento"
          value={form.fechareconocimiento}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          name="descripcionreconocimiento"
          value={form.descripcionreconocimiento}
          onChange={handleChange}
          placeholder="Descripción"
          className="input resize-none h-24"
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
