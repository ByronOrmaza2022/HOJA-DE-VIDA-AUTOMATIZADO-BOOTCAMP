export default function Reconocimientos({ reconocimientos }) {
  return (
    <div className="space-y-4">
      {reconocimientos.map(rec => (
        <div
          key={rec.idreconocimiento}
          className="flex items-start gap-4"
        >
          {/* Icono */}
          <div className="text-yellow-500 text-xl">🏅</div>

          <div>
            <h4 className="font-semibold">
              {rec.tiporeconocimiento}
            </h4>

            <p className="text-sm text-gray-500">
              {rec.entidadpatrocinadora} · {rec.fechareconocimiento}
            </p>

            <p className="text-gray-700">
              {rec.descripcionreconocimiento}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}


/*------------Version 3 - curso, experience, reconocimineto
export default function Reconocimientos({ reconocimientos }) {
  if (!reconocimientos || reconocimientos.length === 0) return null;

  return (
    <>
      {reconocimientos.map(rec => (
        <div key={rec.idreconocimiento} className="mb-4">
          <h4 className="font-semibold">
            {rec.tiporeconocimiento}
          </h4>

          <p className="text-sm text-gray-500">
            {rec.entidadpatrocinadora} · {rec.fechareconocimiento}
          </p>

          <p className="text-gray-700">
            {rec.descripcionreconocimiento}
          </p>
        </div>
      ))}
    </>
  );
}
*/