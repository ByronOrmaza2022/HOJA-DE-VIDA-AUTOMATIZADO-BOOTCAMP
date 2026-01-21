export async function getCV() {
  const res = await fetch("http://localhost:8000/api/cv/");
  if (!res.ok) throw new Error("Error al cargar CV");
  return res.json();
}
