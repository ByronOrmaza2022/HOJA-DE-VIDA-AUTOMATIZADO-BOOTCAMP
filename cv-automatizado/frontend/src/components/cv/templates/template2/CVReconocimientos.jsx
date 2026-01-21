import CVSection from "./CVSection";
import AnimateFade from "../../../ui/AnimateFade"

export default function CVReconocimientos({ items }) {
  if (!items.length) return null;

  return (
    <CVSection title="Reconocimientos">
      {items.map(rec => (
        <div key={rec.idreconocimiento}>
          <AnimateFade>
            <p className="font-medium">
              {rec.tiporeconocimiento}
            </p>
            <p className="text-sm text-gray-500">
              {rec.entidadpatrocinadora}
            </p>
          </AnimateFade>
        </div>
      ))}
    </CVSection>
  );
}
