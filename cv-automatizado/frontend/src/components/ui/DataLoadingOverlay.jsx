export default function DataLoadingOverlay({ text = "Cargando información..." }) {
  return (
    <div className="flex items-center justify-center py-16 text-gray-500 gap-3">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-600" />
      <span className="text-sm">{text}</span>
    </div>
  );
}
