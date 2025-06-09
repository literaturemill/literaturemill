export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Checkout</h1>
        <div className="border-t border-gray-700 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Item</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$0.00</span>
          </div>
        </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-md py-2 transition-colors">
          Confirm Purchase
        </button>
      </div>
    </div>
  );
}
