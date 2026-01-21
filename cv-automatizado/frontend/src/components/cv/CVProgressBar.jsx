import { useEffect, useState } from "react";
import { calcularProgresoCV } from "../../utils/cvProgress";

export default function CVProgressBar({ cvData }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nuevo = calcularProgresoCV(cvData);
    setProgress(nuevo);
  }, [cvData]);

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-2">
      <div className="flex justify-between text-sm font-medium text-gray-600">
        <span>Progreso del CV</span>
        <span>{progress}%</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
