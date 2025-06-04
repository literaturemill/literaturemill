export default function Loading() {
  return (
    <div className="max-w-xl mx-auto mt-10 p-4 text-white">
      <h1 className="text-2xl font-bold mb-4 animate-pulse">Preparing editor...</h1>
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-700 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}