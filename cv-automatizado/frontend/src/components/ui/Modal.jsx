import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, title, children }) {
  const modalRef = useRef(null);

  // 🔒 Bloquear scroll del body cuando modal está abierto
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // ⌨️ Cerrar con tecla ESC
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // 🖱️ Click fuera para cerrar
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (!modalRef.current) return;

      if (!modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Overlay visual */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        ref={modalRef}
        //className="bg-white rounded-xl shadow-xl w-full max-w-xl animate-modal-in"
        className="bg-white rounded-xl shadow-xl w-full max-w-xl flex flex-col max-h-[85vh] animate-modal-in"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 p-4 border-b">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto modal-scroll">{children}</div>
      </div>
    </div>,
    document.body
  );
}
