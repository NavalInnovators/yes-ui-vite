export default function OrderSummary({
  cart,
  pricing,
  onRemoveFromCart,
  onUpgradeAllToPro,
  onShowCouponPopup,
  appliedCoupon,
  onRemoveCoupon,
  couponCode,
  onCouponCodeChange,
  onApplyCoupon,
  onCheckout,
}) {
  return (
    <div
      className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 flex flex-col border border-gray-100"
      style={{ minHeight: "fit-content", maxHeight: "90vh" }}
    >
      {/* Heading */}
      <h1 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4 tracking-tight">
        Order Summary
      </h1>

      {/* Coupon Section */}
      <div className="mt-6">
        {appliedCoupon ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold text-green-800">
                  {appliedCoupon.couponCode}
                </div>
                <div className="text-sm text-green-600">
                  {appliedCoupon.description || appliedCoupon.message}
                </div>
              </div>
              <button
                onClick={onRemoveCoupon}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => onCouponCodeChange(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && couponCode.trim()) {
                    onApplyCoupon();
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={onApplyCoupon}
                disabled={!couponCode.trim()}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
            <button
              onClick={onShowCouponPopup}
              className="text-purple-600 text-sm hover:underline font-medium"
            >
              View All Coupons
            </button>
          </div>
        )}
      </div>

      {/* Cart Items */}
      <div className="mt-4 space-y-3">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center text-sm bg-gray-50 rounded-lg p-3"
          >
            <div className="flex-1">
              <div className="font-medium truncate">{item.name}</div>
              <div className="text-gray-500 text-xs">
                {item.plan?.includes("Plan")
                  ? item.plan
                  : `${
                      item.plan === "BASIC"
                        ? "Basic"
                        : item.plan === "PRO"
                        ? "Pro"
                        : item.plan
                    } Plan`}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">₹{item.price}</span>
              <button
                onClick={() => onRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Price details */}
      <div className="space-y-3 text-base text-gray-700 mt-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-gray-900 font-semibold">
            ₹{pricing.subtotal}
          </span>
        </div>
        {pricing.discount > 0 && (
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600 font-semibold">
              - ₹{pricing.discount}
            </span>
          </div>
        )}
      </div>

      {/* Savings Message */}
      {!pricing.allPro && (
        <>
          {cart.length <= 4 ? (
            <div className="mt-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl py-3 px-4 text-center text-sm text-green-800 shadow-sm">
              <span className="font-semibold">
                Select 5+ courses to unlock 25% discount!
              </span>
            </div>
          ) : (
            <div className="mt-4 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl py-3 px-4 text-center text-sm text-purple-800 shadow-sm">
              <span className="font-semibold">
                Upgrade to Pro, get 30% discount!
              </span>
            </div>
          )}

          {/* Bundle Savings Card */}
          {pricing.hasBasic && (
            <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-800">
                    Bundle Savings
                  </div>
                  <div className="text-sm text-gray-600">
                    Upgrade all to Pro & Save 30%
                  </div>
                </div>
                <button
                  onClick={onUpgradeAllToPro}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-purple-800 transition-all"
                >
                  Pro
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Total */}
      <div className="text-xl font-bold text-gray-900 text-center mb-4">
        Total Amount Payable:
        <span className="ml-2 font-extrabold text-purple-700">
          ₹{pricing.total}
        </span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white font-semibold rounded-full py-3 text-sm shadow-md hover:scale-[1.03] hover:shadow-lg transition transform mb-4"
      >
        🔒 Secure Checkout
      </button>

      {/* Payment methods */}
      <div className="flex items-center justify-center gap-3 opacity-70">
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
