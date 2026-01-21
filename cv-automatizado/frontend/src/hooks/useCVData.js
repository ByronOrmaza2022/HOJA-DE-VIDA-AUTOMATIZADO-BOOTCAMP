import { useEffect, useState } from "react";
import { authFetch } from "../api/authFetch";

export function useCVData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    authFetch("http://localhost:8000/api/cv/")
      .then(res => {
        if (!res.ok) throw new Error("No autorizado");
        return res.json();
      })
      .then(setData)
      .catch(err => {
        //console.error("Error cargando CV:", err);
        setData(null);
      });
  }, []);

  return data;
}

