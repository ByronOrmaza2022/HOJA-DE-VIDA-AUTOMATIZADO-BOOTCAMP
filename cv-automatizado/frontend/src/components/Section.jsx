export default function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold border-b pb-2 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
