export default function Loading() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 animate-pulse">Loading categories...</h1>
      <ul className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="h-4 bg-gray-700 rounded w-1/3" />
        ))}
      </ul>
    </div>
  );
}