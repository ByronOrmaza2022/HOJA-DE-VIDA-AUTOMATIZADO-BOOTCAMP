export default function ExportOverlay({ text = "Generando PDF..." }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-700 font-medium">{text}</p>
      </div>
    </div>
  );
}
