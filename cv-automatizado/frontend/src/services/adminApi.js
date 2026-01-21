//const API_URL = "http://127.0.0.1:8000/api";
const API_URL = "http://localhost:8000/api";
async function handleResponse(res) {
  if (!res.ok) {
    console.error("API error:", res.status);
    return [];
  }
  return res.json();
}

// ---------- EXPERIENCIA ----------
export async function getExperiencias(token) {
  const res = await fetch(`${API_URL}/admin/experiencia/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res);
}

export async function saveExperiencia(data, token) {
  return fetch(`${API_URL}/admin/experiencia/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

export async function updateExperiencia(id, data, token) {
  return fetch(`${API_URL}/admin/experiencia/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

export async function deleteExperiencia(id, token) {
  return fetch(`${API_URL}/admin/experiencia/${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
}

// ---------- CURSOS ----------
export async function getCursos(token) {
  const res = await fetch(`${API_URL}/admin/cursos/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res);
}

export async function saveCurso(data, token) {
  return fetch(`${API_URL}/admin/cursos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

export async function updateCurso(id, data, token) {
  return fetch(`${API_URL}/admin/cursos/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

export async function deleteCurso(id, token) {
  return fetch(`${API_URL}/admin/cursos/${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
}

// ---------- RECONOCIMIENTOS ----------
export async function getReconocimientos(token) {
  const res = await fetch(`${API_URL}/admin/reconocimientos/`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res);
}

export async function saveReconocimiento(data, token) {
  return fetch(`${API_URL}/admin/reconocimientos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

export async function updateReconocimiento(id, data, token) {
  return fetch(`${API_URL}/admin/reconocimientos/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
}

export async function deleteReconocimiento(id, token) {
  return fetch(`${API_URL}/admin/reconocimientos/${id}/`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
}

