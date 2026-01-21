function tieneVisibles(items = []) {
  return items.some(i => i.activarparaqueseveaenfront);
}

export function calcularProgresoCV(cvData) {
  if (!cvData) return 0;

  const secciones = [
    true, // datos personales (perfil)
    tieneVisibles(cvData.experiencia_laboral),
    tieneVisibles(cvData.cursos),
    tieneVisibles(cvData.reconocimientos)
  ];

  const completadas = secciones.filter(Boolean).length;

  return Math.round((completadas / secciones.length) * 100);
}
