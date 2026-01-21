
//const API_URL = "http://127.0.0.1:8000/api/cv/";
const API_URL = "http://localhost:8000/api";
export async function getCV() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al cargar el CV");
  }
  return response.json();
}


