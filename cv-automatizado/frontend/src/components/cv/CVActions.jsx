// Boton de generar PDF
import { FaFilePdf } from "react-icons/fa";
import { useCV } from "../../context/CVContext";

export default function CVActions() {
  const { exportPDF, exporting } = useCV();

  return (
    <button
      onClick={exportPDF}
      disabled={exporting}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg
        bg-red-600 text-white text-sm font-medium
        hover:bg-red-700 transition
        disabled:opacity-60 disabled:cursor-not-allowed
      `}
    >
      <FaFilePdf />
      {exporting ? "Generando PDF..." : "Descargar PDF"}
    </button>
  );
}
