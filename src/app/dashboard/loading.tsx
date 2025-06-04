export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 text-white">
      <h1 className="text-2xl font-bold mb-4 animate-pulse">
        Loading your dashboard...
      </h1>
      <ul className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="p-4 bg-gray-800 rounded animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2" />
            <div className="h-3 bg-gray-700 rounded w-full" />
          </li>
        ))}
      </ul>
    </div>
  );
}