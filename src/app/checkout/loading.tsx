export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center animate-pulse">
        <h1 className="text-2xl font-bold mb-4">Preparing Checkout...</h1>
        <div className="h-4 w-48 bg-gray-700 rounded mx-auto" />
      </div>
    </div>
  );
}