export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center animate-pulse">
        Loading stories...
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-gray-700 h-64 rounded animate-pulse" />
        ))}
      </div>
    </main>
  );
}