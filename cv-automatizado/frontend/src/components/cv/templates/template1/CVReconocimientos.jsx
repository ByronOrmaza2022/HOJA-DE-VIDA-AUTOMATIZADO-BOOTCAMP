import { FaMedal } from "react-icons/fa";
import AnimateFade from "../../../ui/AnimateFade"

export default function CVReconocimientos({ items }) {
  if (!items.length) return null;

  return (
    <section>
      <h2 className="font-semibold mb-4">
        Reconocimientos
      </h2>

      <div className="space-y-4">
        {items.map(r => (
          <div key={r.idreconocimiento} className="flex gap-3 cont-spacefive-templateone">
            <AnimateFade>
              <div className="flex">
                <FaMedal className="text-yellow-500 mt-1 iconmedal" />
                <p className="font-semibold">&nbsp;{r.tiporeconocimiento}</p>
              </div>
              
              <div>
                
                <p className="text-xs text-gray-500">
                  {r.entidadpatrocinadora} · {r.fechareconocimiento}
                </p>
                <p className="text-sm">
                  {r.descripcionreconocimiento}
                </p>
              </div>
            </AnimateFade>
          </div>
        ))}
      </div>
    </section>
  );
}
