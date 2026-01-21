import { useCV } from "../../context/CVContext";
import { useEffect, useState } from "react";
import DataLoadingOverlay from "../../components/ui/DataLoadingOverlay";
import CVPreview from "../../components/cv/CVPreview";
import { exportCVToPDF } from "../../utils/exportCVToPDF";
import { FaFilePdf } from "react-icons/fa";

export default function PersonalCV() {
  const { cvData, loading, exportCVtoPdf } = useCV();
  const [transitionLoading, setTransitionLoading] = useState(true);
  const [template, setTemplate] = useState("template1");
  

  useEffect(() => {
    setTransitionLoading(true);

    const timer = setTimeout(() => {
      setTransitionLoading(false);
    }, 600); // transición suave

    return () => clearTimeout(timer);
  }, []);

  // 🟦 Loading real de backend
  if (loading) {
    return <DataLoadingOverlay text="Cargando tu CV..." />;
  }
  

  // 🟨 Transición visual de vista
  if (transitionLoading) {
    return <DataLoadingOverlay text="Preparando vista..." />;
  }

  if (!cvData) {
    return (
      <div className="text-gray-500 p-10">
        No hay información disponible.
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#f5f7fb] rounded-xl p-6 space-y-6">

      {/* 🧾 HEADER */}
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          📄 Mi CV
        </h1>
        <p className="text-sm text-gray-500">
          Visualiza cómo se verá tu hoja de vida y selecciona un diseño.
        </p>
      </div>

      {/* 🎨 SELECTOR DE PLANTILLA */}
      <div className="bg-white rounded-xl shadow-sm p-3 flex gap-2">
        {[
          { id: "template1", label: "Moderno" },
          { id: "template2", label: "Minimal" },
          { id: "template3", label: "Sidebar Oscuro" },
          { id: "template4", label: "Clásica" }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                template === t.id
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* 📤 ACCIONES */}
<div className="flex justify-end">
  <button
    onClick={() =>
      exportCVToPDF({
        filename: "mi-cv.pdf",
        scale: 1.5
      })
    }
    className="
      flex items-center gap-2
      bg-red-600 hover:bg-red-700
      text-white text-sm font-medium
      px-4 py-2 rounded-lg
      shadow transition
    "
  >
    <FaFilePdf />
    Descargar PDF
  </button>
</div>


      {/* 📄 DOCUMENTO PREVIEW */}
      <div className="flex justify-center">
        <div
          className="w-full rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-inner p-6 overflow-auto flex justify-center"
          style={{ minHeight: "78vh" }}
        >
          {/* Documento */}
          <div
            className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-cv-enter personal-preview"
          >
            <CVPreview template={template} mode="personal" />
          </div>
        </div>
      </div>


      {/* 🔜 ESPACIO FUTURO PARA ACCIONES */}
      {/* Descarga PDF / Compartir / Versiones */}
    </div>
  );
}
