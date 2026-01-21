import { useEffect, useState } from "react";

export default function ConfirmOverlay({
  open,
  title = "¿Confirmar acción?",
  message = "Esta acción no se puede deshacer.",
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={`
        fixed top-0 left-0 w-screen h-screen
        z-[10000]
        flex items-center justify-center
        backdrop-blur-sm bg-black/40
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
      style={{
        margin: 0,
        padding: 0
      }}
    >
      <div
        className={`
          bg-white rounded-xl shadow-xl px-8 py-6 w-full max-w-sm
          transform transition-all duration-300
          ${visible ? "scale-100 translate-y-0" : "scale-95 translate-y-2"}
        `}
      >
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
