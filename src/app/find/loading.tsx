// src/app/find/loading.tsx

export default function Loading() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white animate-pulse">Loading stories...</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-lg p-4 shadow-md h-64 animate-pulse"
          >
            <div className="w-full h-32 bg-gray-700 rounded mb-4" />
            <div className="h-4 bg-gray-700 rounded mb-2" />
            <div className="h-4 bg-gray-700 rounded w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
