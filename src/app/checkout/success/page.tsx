export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-green-400">Payment Successful</h1>
        <p className="text-foreground">Thank you for your purchase.</p>
        <a href="/" className="text-indigo-400 hover:underline">
          Return Home
        </a>
      </div>
    </div>
  );
}