export default function AdminLayout({ sidebar, children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {sidebar}

      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
