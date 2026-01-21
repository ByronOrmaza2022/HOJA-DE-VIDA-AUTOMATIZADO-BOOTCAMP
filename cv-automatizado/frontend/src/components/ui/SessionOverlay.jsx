import { useEffect, useState } from "react";

export default function SessionOverlay({ text }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 🎬 Activar animación al montar
    const t = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center
        backdrop-blur-sm bg-black/30
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        className={`
          bg-white rounded-xl shadow-xl px-8 py-6
          flex flex-col items-center gap-3
          transform transition-all duration-300
          ${visible ? "scale-100 translate-y-0" : "scale-95 translate-y-2"}
        `}
      >
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />

        {/* Texto */}
        <p className="text-sm font-medium text-gray-700 text-center">
          {text}
        </p>
      </div>
    </div>
  );
}
