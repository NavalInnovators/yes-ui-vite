import { normalizePlanForDisplay, getPlanColorClass } from "../utils/planUtils";

export default function OrderSummary({
  cart,
  pricing,
  onRemoveFromCart,
  onUpgradeAllToPro,
  onShowCouponPopup,
  appliedCoupon,
  availableCouponsCount = 0,
  onRemoveCoupon,
  couponCode,
  onCouponCodeChange,
  onApplyCoupon,
  onCheckout,
  showCouponInput = true,
  checkoutButtonText = "Secure Checkout",
}) {
  return (
    <div
      className="w-full lg:max-w-md bg-[#fafafa] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-4 md:p-6 flex flex-col border border-gray-200 mx-auto"
      style={{ minHeight: "fit-content", maxHeight: "none" }}
    >
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight flex items-center gap-3">
        Order Summary
        <span className="bg-gray-200 text-gray-500 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold">
          {cart.length} Courses
        </span>
      </h2>

      {/* Cart Items Scroll Area */}
      <div className="flex-1 overflow-y-auto pr-1 mb-6 space-y-4 custom-scrollbar">
        {cart.map((item) => {
          const displayPlan = normalizePlanForDisplay(item.plan);
          const planColorClass = getPlanColorClass(item.plan);

          return (
            <div
              key={item.id}
              className="flex justify-between items-center group bg-white border border-gray-100 rounded-2xl p-4 transition-all duration-300 hover:border-gray-200 hover:shadow-sm"
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className="font-bold text-gray-900 text-base truncate mb-1">
                  {item.name}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-bold uppercase tracking-tight px-2 py-0.5 rounded-lg ${planColorClass}`}>
                    {displayPlan}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    ₹{item.price}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onRemoveFromCart(item.id)}
                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all cursor-pointer shadow-sm border border-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      {/* Coupon Section */}
      <div className="mb-8">
        {!showCouponInput ? (
          // AllSubjects 
          availableCouponsCount > 0 ? (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">🎫</span>
                <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                  {availableCouponsCount} Coupon{availableCouponsCount > 1 ? 's' : ''} Available
                </span>
              </div>
              <div className="font-black text-blue-900 text-sm mb-1 tracking-tight">
                Save money with available coupons!
              </div>
              <div className="text-[11px] text-blue-700 font-bold uppercase tracking-widest leading-none">
                Go to cart to apply coupons and save more
              </div>
            </div>
          ) : null
        ) : appliedCoupon ? (
          // Applied Mode (Manual / Cart)
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-2 0v1h2zm3 0H10V5a3 3 0 116 0v1h-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-green-800 uppercase tracking-tighter">
                    {appliedCoupon.couponCode}
                  </span>
                  <span className="text-xs font-bold text-green-600">Applied</span>
                </div>
                <div className="text-[11px] text-green-600 font-bold">
                  {appliedCoupon.description || appliedCoupon.message}
                </div>
              </div>
            </div>
            <button
              onClick={onRemoveCoupon}
              className="text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer uppercase tracking-widest"
            >
              Remove
            </button>
          </div>
        ) : (
          // Input Mode (Empty / Cart)
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="PROMO CODE"
                value={couponCode}
                onChange={(e) => onCouponCodeChange(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && couponCode.trim()) {
                    onApplyCoupon();
                  }
                }}
                className="flex-1 bg-white px-4 py-3.5 border-2 border-gray-100 rounded-xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-purple-500 transition-all placeholder:text-gray-300"
              />
              <button
                onClick={onApplyCoupon}
                disabled={!couponCode.trim()}
                className="bg-zinc-900 text-white px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-md"
              >
                Apply
              </button>
            </div>
            <button
              onClick={onShowCouponPopup}
              className="px-1 text-[11px] text-purple-600 font-black uppercase tracking-widest hover:text-purple-700 transition-colors"
            >
              View Available Coupons
            </button>
          </div>
        )}
      </div>

      {/* Price details */}
      <div className="space-y-4 pt-6 border-t-2 border-dashed border-gray-200">
        <div className="flex justify-between items-center text-sm font-bold text-gray-500 uppercase tracking-wide">
          <span>Subtotal</span>
          <span className="text-gray-900 font-bold">₹{pricing.subtotal}</span>
        </div>

        {pricing.discount > 0 && (
          <div className="flex justify-between items-center text-sm font-bold text-green-600 uppercase tracking-wide">
            <div className="flex items-center gap-2">
              <span>Discount</span>
              <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-black">SAVE</span>
            </div>
            <span className="font-black">- ₹{pricing.discount}</span>
          </div>
        )}

        {/* Total Display */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-sm font-black text-gray-500 uppercase tracking-widest">
            Grand Total
          </div>
          <div className="text-4xl font-bold text-gray-900 tracking-tighter">
            ₹{pricing.total}
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="mt-8 space-y-4">
        <button
          onClick={onCheckout}
          disabled={cart.length === 0}
          className={`w-full py-4 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
            cart.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-xl hover:-translate-y-1 active:scale-95 cursor-pointer"
          }`}
          style={{
            background: cart.length === 0 
              ? "#374151" 
              : "linear-gradient(90deg, #4b05d4 0%, #7c3aed 28%, #f59e0b 100%)",
          }}
        >
          <span>{checkoutButtonText}</span>
          <span className="text-lg">→</span>
        </button>

        {/* Payment methods */}
        <div className="flex justify-center items-center gap-5">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 w-auto object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="h-6 w-auto object-contain" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 w-auto object-contain" />
        </div>
      </div>
    </div>
  );
}
