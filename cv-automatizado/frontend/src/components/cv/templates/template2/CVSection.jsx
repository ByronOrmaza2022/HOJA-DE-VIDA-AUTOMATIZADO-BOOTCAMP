export default function CVSection({ title, children }) {
  if (!children) return null;

  return (
    <section>
      <div className="flex items-center gap-3 mb-5 cont-spacetwo-template-two">
        <span className="h-px flex-1 bg-gray-200" />
        <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          {title}
        </h2>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="space-y-6">{children}</div>
    </section>
  );
}
