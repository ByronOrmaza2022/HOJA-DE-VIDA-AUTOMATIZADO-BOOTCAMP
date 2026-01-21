export default function Spinner({ texto }) {
  return (
    <div className="flex items-center gap-3 text-gray-500 text-sm py-4">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600" />
      {texto}
    </div>
  );
}
