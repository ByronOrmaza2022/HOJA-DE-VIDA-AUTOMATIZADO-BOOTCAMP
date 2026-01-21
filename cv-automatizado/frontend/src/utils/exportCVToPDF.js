import html2pdf from "html2pdf.js";

/**
 * Exporta a PDF el contenido del CV
 */
export async function exportCVToPDF({
  elementId = "cv-print-area",
  filename = "cv.pdf",
  scale = 1.5,
  delayBeforeCapture = 500
} = {}) {
  const element = document.getElementById(elementId);
  if (!element) {
    //console.warn("❌ No se encontró el elemento para exportar PDF:", elementId);
    return;
  }

  await new Promise(res => setTimeout(res, 5000));
  // 🔒 Bloquea animaciones globales durante exportación
  document.body.classList.add("exporting-cv");

  try {
    // ⏳ Espera mínima para permitir estabilizar layout
    await new Promise(res => setTimeout(res, delayBeforeCapture));

    // 🧘 Esperar dos frames para asegurar DOM estable
    await new Promise(res =>
      requestAnimationFrame(() =>
        requestAnimationFrame(res)
      )
    );

    const opt = {
      margin: 0,
      filename,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale,
        useCORS: true,
        backgroundColor: "#ffffff",
        scrollY: 0
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      }
    };

    await html2pdf().set(opt).from(element).save();

  } catch (err) {
    console.error("❌ Error exportando PDF", err);
  } finally {
    // 🔓 Restaurar animaciones
    document.body.classList.remove("exporting-cv");
  }
}
