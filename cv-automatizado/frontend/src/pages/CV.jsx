// Este componente no esta en uso
import { useEffect, useState } from "react";
import { authFetch } from "../api/authFetch";
import CVLayout from "../components/cv/templates/template1/CVLayout";
import CVRenderer from "../components/cv/CVRenderer";
import { useAuth } from "../auth/AuthContext";
import Loader from "../components/Loader";

export default function CV({ data: previewData, preview = false }) {
  const { user } = useAuth();
  const plantilla = user?.template || "template1";
  const [data, setData] = useState(previewData);

  useEffect(() => {
    if (!preview) {
      authFetch("http://localhost:8000/api/cv/")
        .then(res => res.json())
        .then(setData);
    }
  }, []);

  if (!data) return null;

  return (
    <div className="bg-gray-200 py-10">
      <CVRenderer data={data} template={plantilla} />;
    </div>
  );
}
