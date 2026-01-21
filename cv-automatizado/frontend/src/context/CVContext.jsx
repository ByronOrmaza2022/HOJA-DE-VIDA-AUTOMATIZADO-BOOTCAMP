import { createContext, useContext, useEffect, useState } from "react";
import { authFetch } from "../api/authFetch";
import { usePerfil } from "./PerfilContext";
import { exportCVToPDF } from "../utils/exportCVToPDF";

const CVContext = createContext();

export function CVProvider({ children }) {
  const { perfil } = usePerfil();

  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  /* ======================================================
     📄 Exportación PDF (wrapper controlado por Context)
     ====================================================== */
  const exportPDF = async ({
    filename = "cv.pdf",
    scale = 1.5
  } = {}) => {
    if (exporting) return;

    setExporting(true);

    try {
      await exportCVToPDF({
        filename,
        scale
      });
    } finally {
      setExporting(false);
    }
  };

  /* ======================================================
     🔄 Carga del CV según perfil
     ====================================================== */
  const cargarCV = async () => {
    if (!perfil) {
      setCvData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const start = Date.now();

    try {
      const res = await authFetch(
        `http://localhost:8000/api/cv/?idperfil=${perfil.idperfil}`
      );

      const data = await res.json();
      setCvData(data);

    } catch (e) {
      //console.error("❌ Error cargando CV", e);

    } finally {
      const elapsed = Date.now() - start;
      const MIN_TIME = 900; // 🎬 mínimo visible

      setTimeout(() => {
        setLoading(false);
      }, Math.max(0, MIN_TIME - elapsed));
    }
  };

  /* ======================================================
     🔁 Recargar cuando cambia perfil
     ====================================================== */
  useEffect(() => {
    cargarCV();
  }, [perfil]);

  /* ======================================================
     🔀 Toggle optimista (sin refetch)
     ====================================================== */
  const toggleItem = (section, idField, idValue) => {
    if (!cvData || !cvData[section]) return null;

    // 📸 Snapshot para rollback
    const previous = structuredClone(cvData);

    const updated = cvData[section].map(item => {
      if (!(idField in item)) {
        //console.error(`Campo ${idField} no existe en`, item);
        return item;
      }

      return item[idField] === idValue
        ? {
            ...item,
            activarparaqueseveaenfront:
              !item.activarparaqueseveaenfront
          }
        : item;
    });

    setCvData({
      ...cvData,
      [section]: updated
    });

    return previous;
  };

  return (
    <CVContext.Provider
      value={{
        cvData,
        loading,
        exporting,
        exportPDF,    
        cargarCV,
        setCvData,
        toggleItem,
        
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export function useCV() {
  return useContext(CVContext);
}
