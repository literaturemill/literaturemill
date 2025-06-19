export default function CheckoutCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-red-400">Payment Cancelled</h1>
        <p className="text-foreground">Your payment was not successful.</p>
        <a href="/" className="text-indigo-400 hover:underline">
          Return Home
        </a>
      </div>
    </div>
  );
}