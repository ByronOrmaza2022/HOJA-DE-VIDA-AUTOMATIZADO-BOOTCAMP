export default function Tabs({ tab, setTab }) {
  const tabs = [
    { id: "experiencia", label: "Experiencia" },
    { id: "cursos", label: "Cursos" },
    { id: "reconocimientos", label: "Reconocimientos" }
  ];

  return (
    <div className="flex gap-4 mb-6">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={`px-4 py-2 rounded transition
            ${tab === t.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700"
            }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
