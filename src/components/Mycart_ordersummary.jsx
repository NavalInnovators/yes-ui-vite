export default function OrderSummary() {
  return (
    <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between h-full border border-gray-100">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4 tracking-tight">
        Order Summary
      </h1>

      {/* Price details */}
      <div className="space-y-3 text-base text-gray-700 mt-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-gray-900 font-semibold">$545.00</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-red-500 font-semibold">- $50.00</span>
        </div>
        <div className="flex justify-between">
          <span>Savings</span>
          <span className="text-green-600 font-semibold">$50.00</span>
        </div>
      </div>

      {/* Savings Message */}
      <div className="mt-6 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl py-3 px-4 text-center text-sm text-purple-800 shadow-sm">
        <span className="font-semibold">Bundle Savings:</span>{" "}
        <span className="opacity-90">Maximize Your Savings!</span>
      </div>

      {/* Upgrade Button */}
      <button className="mt-8 w-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 text-black font-semibold rounded-full py-3 text-sm shadow-md hover:scale-[1.03] hover:shadow-lg transition transform">
        🚀 Upgrade All to Pro & Save More
      </button>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Total */}
      <div className="text-xl font-bold text-gray-900 text-center">
        Total Amount Payable:
        <span className="ml-2 font-extrabold text-purple-700">$499.00</span>
      </div>

      {/* Checkout Button */}
      <button className="mt-6 w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-semibold rounded-full py-3 text-sm shadow-md hover:scale-[1.03] hover:shadow-lg transition transform">
        🔒 Secure Checkout
      </button>

      {/* Payment methods */}
      <div className="mt-6 flex items-center justify-center gap-3 opacity-70">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
          alt="Visa"
          className="h-6"
        />
        <img
          src="https://imageio.forbes.com/blogs-images/steveolenski/files/2016/07/Mastercard_new_logo-1200x865.jpg?height=512&width=711&fit=bounds"
          alt="MasterCard"
          className="h-6"
        />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
          alt="PayPal"
          className="h-6"
        />
      </div>
    </div>
  );
}
