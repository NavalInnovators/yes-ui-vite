import { useState, useMemo, useEffect } from "react";
import GradientDiv from "../roles/components/GradientDiv";
import Mycart_purchased_course_card from "./Mycart_purchased_course_card";
import OrderSummary from "./Mycart_ordersummary";
import Mycart_suggested_courses_card from "./Mycart_suggested_courses_card";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { trackCartEvent, getISTISOString } from "../utils/analytics";
import {
    getCoupons,
    applyCoupon,
    createTransaction,
    verifyPayment,
    removeTransaction,
} from "../api/api";

export default function Mycart() {
  const {
    cart,
    removeFromCart,
    updateCartItem,
    addToCart,
    checkout,
    getSuggestedCourses,
    setCart,
    reloadSubscriptions,
  } = useCart();
  const navigate = useNavigate();

  // Get suggested courses based on cart items
  const allSuggestedCourses = getSuggestedCourses(cart);

  const [searchQuery, setSearchQuery] = useState("");
  const [showCouponPopup, setShowCouponPopup] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);

  // Fetch available coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const profileId = localStorage.getItem("profileId");
        if (!profileId) return;

        setIsLoadingCoupons(true);
        const coupons = await getCoupons(profileId);
        setAvailableCoupons(coupons || []);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      } finally {
        setIsLoadingCoupons(false);
      }
    };

    fetchCoupons();
  }, []);

  // Validate coupon when cart changes
  useEffect(() => {
    if (!appliedCoupon) return;

    // Calculate current subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    // Check if coupon is still applicable
    let isStillApplicable = true;

    // Check minimum course selection
    if (
      appliedCoupon.minCourseSelection &&
      cart.length < appliedCoupon.minCourseSelection
    ) {
      isStillApplicable = false;
    }

    // Check activation amount
    if (
      appliedCoupon.activationAmount &&
      subtotal < appliedCoupon.activationAmount
    ) {
      isStillApplicable = false;
    }

    // Remove coupon if no longer applicable
    if (!isStillApplicable) {
      setAppliedCoupon(null);
      setCouponCode("");
      toast.info("Coupon removed - requirements no longer met");
    }
  }, [cart, appliedCoupon]);

  // Filter suggested courses based on search query
  const filteredSuggestedCourses = allSuggestedCourses.filter((course) => {
    const title = (course.title || "").toLowerCase();
    const dept = (course.dept || "").toLowerCase();
    const subjectCode = (course.subjectCode || "").toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || dept.includes(q) || subjectCode.includes(q);
  });

  const upgradeToPro = async (id) => {
    const item = cart.find((item) => item.id === id);
    // Handle both formats: "BASIC" and "Basic Plan"
    const isBasic =
      item &&
      (item.plan === "BASIC" ||
        item.plan === "Basic Plan" ||
        item.plan?.toLowerCase().includes("basic"));

    if (isBasic) {
      try {
        // Remove BASIC item
        await removeFromCart(id, { source: "upgrade" });

        // Add PRO plan using the stored courseId
        const courseData = {
          id: item.courseId, // This should now be the actual courseId, not cartId
          name: item.name,
          courseCodes: item.courseCodes,
          universityName: item.universityName,
          year: item.year,
          branchNames: item.branchNames,
        };

        await addToCart(courseData, "PRO", { source: "upgrade" });
        toast.success(`Upgraded to Pro plan!`);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to upgrade. Please try again.");
      }
    }
  };

  const handleAddToCart = (course, plan) => {
    // Handle upgrade scenario
    if (course.isUpgrade) {
      // This is an upgrade from Basic to Pro
      const upgradeItem = {
        id: `upgrade-${course.originalOrderId}`,
        courseId: course.id,
        name: course.title,
        courseCodes: course.courseCodes,
        universityName: course.universityName,
        year: course.year,
        branchNames: course.branchNames,
        plan: "Pro",
        price: course.upgradePrice,
        originalOrderId: course.originalOrderId,
        isUpgrade: true,
        addedAt: getISTISOString(),
      };

      setCart((prev) => [...prev, upgradeItem]);
      toast.success(`${course.title} upgrade added to cart!`);

      trackCartEvent({
        action: "added",
        source: "suggested_upgrade",
        courseId: upgradeItem.courseId,
        courseName: upgradeItem.name,
        plan: upgradeItem.plan,
        price: upgradeItem.price,
        subjectCode: upgradeItem.courseCodes?.[0] || null,
        timestamp: upgradeItem.addedAt,
        requiredPlan: null,
      });
      return;
    }

    // Handle regular course purchase
    const courseData = {
      id: course.id,
      name: course.title ?? "Untitled",
      courseCodes: course.courseCodes ?? [],
      universityName: course.universityName ?? "",
      year: course.year ?? "",
      branchNames: course.branchNames ?? [],
    };
    addToCart(courseData, plan, {
      source: "suggested_course",
    });
    toast.success(`${course.title ?? "Course"} (${plan}) added to cart!`);
  };

  const handleCheckout = async () => {
    try {
      const profileId = localStorage.getItem("profileId");

      if (!profileId) {
        toast.error("Please login to checkout");
        navigate("/login");
        return;
      }

      if (cart.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      // Step 1: Create transaction
      const transactionData = await createTransaction(
        profileId,
        appliedCoupon?.couponCode || null,
      );

      const { orderId, razorpayKey, amount } = transactionData;

      // Step 2: Open Razorpay payment modal
      const options = {
        key: razorpayKey,
        amount: amount,
        currency: "INR",
        name: "Your Exam Saathi",
        description: "Course Purchase",
        order_id: orderId,
        handler: async function (response) {
          // Step 3: Payment successful, verify it
          try {
            toast.info("Verifying payment...");

            await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
            );

            toast.dismiss();
            toast.success("Payment successful! Subscriptions activated.");

            // Reload subscriptions to update plan status
            await reloadSubscriptions();

            // Clear local cart state
            setCart([]);

            // Navigate to orders page
            navigate("/myorders");
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error(
              "Payment verification failed. Please contact support with order ID: " +
                orderId,
            );
          }
        },
        prefill: {
          name: localStorage.getItem("userName") || "",
          email: localStorage.getItem("userEmail") || "",
          contact: localStorage.getItem("userPhone") || "",
        },
        theme: {
          color: "#9333EA",
        },
        modal: {
          ondismiss: async function () {
            // User closed the payment modal
            toast.info("Payment cancelled");

            try {
              await removeTransaction(orderId);
            } catch (error) {
              console.error("Failed to remove transaction:", error);
            }
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", async function (response) {
        console.error("Payment failed:", response.error);
        toast.error(
          `Payment failed: ${response.error.description || "Please try again"}`,
        );

        try {
          await removeTransaction(orderId);
        } catch (error) {
          console.error("Failed to remove transaction:", error);
        }
      });

      razorpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to initiate payment");
    }
  };

  const handleApplyCoupon = async (coupon) => {
    try {
      const profileId = localStorage.getItem("profileId");
      if (!profileId) {
        toast.error("Please login to apply coupon");
        return;
      }

      const couponCodeToApply = coupon?.couponCode || couponCode;
      if (!couponCodeToApply) {
        toast.error("Please enter a coupon code");
        return;
      }

      const response = await applyCoupon(profileId, couponCodeToApply);

      // Backend returns coupon details
      // Store the full coupon object for discount calculation and validation
      const appliedCouponData = {
        couponId: response.couponId || coupon?.couponId,
        couponCode: couponCodeToApply,
        description:
          response.description || coupon?.description || "Discount applied",
        message: response.message || coupon?.message,
        discountType: response.discountType || coupon?.discountType,
        discountValue: response.discountValue || coupon?.discountValue,
        maxDiscountAmount:
          response.maxDiscountAmount || coupon?.maxDiscountAmount,
        // Store activation rules for validation
        minCourseSelection:
          response.minCourseSelection || coupon?.minCourseSelection || 0,
        activationAmount:
          response.activationAmount || coupon?.activationAmount || 0,
      };

      setAppliedCoupon(appliedCouponData);
      setCouponCode(couponCodeToApply);
      setShowCouponPopup(false);
      toast.success(response.message || "Coupon applied successfully!");
    } catch (error) {
      console.error("Failed to apply coupon:", error);
      toast.error(error.message || "Failed to apply coupon");
    }
  };

  const handleRemoveCoupon = () => {
    // NEED A REMOVE COUPON API
    setAppliedCoupon(null);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  const pricing = useMemo(() => {
    let subtotal = 0;
    let allPro = true;
    let hasBasic = false;

    cart.forEach((c) => {
      // Use actual price from backend
      subtotal += c.price || 0;

      // Handle both formats: "BASIC" and "Basic Plan"
      const isBasic =
        c.plan === "BASIC" ||
        c.plan === "Basic Plan" ||
        c.plan?.toLowerCase().includes("basic");

      if (isBasic) {
        allPro = false;
        hasBasic = true;
      }
    });

    // Discount comes from applied coupon only
    let discount = 0;
    let discountType = "none";

    if (appliedCoupon) {
      if (appliedCoupon.discountType === "PERCENTAGE") {
        // Calculate percentage discount
        discount = (subtotal * appliedCoupon.discountValue) / 100;

        // Apply max discount cap if specified
        if (
          appliedCoupon.maxDiscountAmount &&
          discount > appliedCoupon.maxDiscountAmount
        ) {
          discount = appliedCoupon.maxDiscountAmount;
        }
      } else if (
        appliedCoupon.discountType === "FIXED" ||
        appliedCoupon.discountType === "FIXED_AMOUNT"
      ) {
        // Fixed amount discount
        discount = appliedCoupon.discountValue;
      }
      discountType = "coupon";
    }

    // if (nonUpgradeItems.length >= 5) {
    //     discount = subtotal * 0.25;
    //     discountType = "bundle";
    // } else if (allPro && nonUpgradeItems.length > 0) {
    //     discount = subtotal * 0.3;
    //     discountType = "pro";
    // }

    const total = Math.max(0, subtotal - discount);

    return { subtotal, discount, total, allPro, hasBasic, discountType };
  }, [cart, appliedCoupon]);

  // Calculate best available coupon
  const bestCoupon = useMemo(() => {
    if (appliedCoupon || availableCoupons.length === 0) return null;

    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    let maxDiscount = 0;
    let bestCouponOption = null;

    availableCoupons.forEach((coupon) => {
      // Skip if not applicable
      if (!coupon.applicable) return;

      // Check if requirements are met
      if (coupon.minCourseSelection && cart.length < coupon.minCourseSelection)
        return;
      if (coupon.activationAmount && subtotal < coupon.activationAmount) return;

      let potentialDiscount = 0;

      if (coupon.discountType === "PERCENTAGE") {
        potentialDiscount = (subtotal * coupon.discountValue) / 100;
        if (
          coupon.maxDiscountAmount &&
          potentialDiscount > coupon.maxDiscountAmount
        ) {
          potentialDiscount = coupon.maxDiscountAmount;
        }
      } else if (
        coupon.discountType === "FIXED" ||
        coupon.discountType === "FIXED_AMOUNT"
      ) {
        potentialDiscount = coupon.discountValue;
      }

      if (potentialDiscount > maxDiscount) {
        maxDiscount = potentialDiscount;
        bestCouponOption = {
          ...coupon,
          calculatedDiscount: potentialDiscount,
        };
      }
    });

    return bestCouponOption;
  }, [cart, availableCoupons, appliedCoupon]);

  const upgradeAllToPro = async () => {
    // Handle both formats: "BASIC" and "Basic Plan"
    const basicItems = cart.filter(
      (item) =>
        item.plan === "BASIC" ||
        item.plan === "Basic Plan" ||
        item.plan?.toLowerCase().includes("basic"),
    );

    for (const item of basicItems) {
      try {
        await removeFromCart(item.id, { source: "upgrade_all" });

        const courseData = {
          id: item.courseId,
          name: item.name,
          courseCodes: item.courseCodes,
          universityName: item.universityName,
          year: item.year,
          branchNames: item.branchNames,
        };

        await addToCart(courseData, "PRO", { source: "upgrade_all" });
      } catch (error) {
        console.error("Failed to upgrade", item.name, error);
      }
    }

    if (basicItems.length > 0) {
      toast.success(`Upgraded ${basicItems.length} course(s) to Pro!`);
    }
  };

  return (
    <div className="w-full min-h-screen pt-20 md:pt-28">
      {/* Top banner */}
      <GradientDiv>
        <div className="py-6 px-4 md:py-10">
          <span className="text-lg md:text-2xl font-semibold block">
            Your savings on this order could be maximized!
          </span>
          <span className="text-yellow-400 text-xs md:text-sm">
            Add 1 or 2 more courses to unlock bundle discount
          </span>
        </div>
      </GradientDiv>

      {/* Main content */}
      <div className="px-4 py-6 md:p-10 md:flex gap-6">
        {/* Left side */}
        <div className="w-full md:w-[70%]" id="left-section">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold py-4 md:py-6">
              Review Your Order
            </h1>

            {/* Best Coupon Banner */}
            {bestCoupon && (
              <div className="mb-4 bg-gradient-to-r from-green-50/60 to-emerald-50/60 border-2 border-green-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">🎉</span>
                      <span className="font-bold text-green-800">
                        Save ₹{bestCoupon.calculatedDiscount}!
                      </span>
                    </div>
                    <div className="text-sm text-green-700">
                      Use code{" "}
                      <span className="font-semibold">
                        {bestCoupon.couponCode}
                      </span>{" "}
                      - {bestCoupon.description || bestCoupon.message}
                    </div>
                  </div>
                  <button
                    onClick={() => handleApplyCoupon(bestCoupon)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ml-4"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {cart.map((course) => (
                <Mycart_purchased_course_card
                  key={course.id}
                  title={course.name}
                  credits={course.courseCodes ?? []}
                  dept={
                    Array.isArray(course.branchNames) &&
                    course.branchNames.length > 0
                      ? course.branchNames[0]
                      : "Unknown"
                  }
                  plan={course.plan}
                  price={course.price}
                  onRemove={() =>
                    removeFromCart(course.id, {
                      source: "cart_item",
                    })
                  }
                  onUpgrade={() => upgradeToPro(course.id)}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl md:text-4xl font-bold">
                Suggested Courses to add
              </h1>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="relative">
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition"
                onClick={() => {
                  const container =
                    document.getElementById("suggested-courses");
                  container.scrollBy({
                    left: -300,
                    behavior: "smooth",
                  });
                }}
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition"
                onClick={() => {
                  const container =
                    document.getElementById("suggested-courses");
                  container.scrollBy({
                    left: 300,
                    behavior: "smooth",
                  });
                }}
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <div
                id="suggested-courses"
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
              >
                {filteredSuggestedCourses.map((course) => (
                  <Mycart_suggested_courses_card
                    key={course.id}
                    course={course}
                    title={course.title}
                    credits={course.subjectCode}
                    dept={course.dept}
                    hasBasic={course.hasBasic}
                    isUpgrade={course.isUpgrade}
                    upgradePrice={course.upgradePrice}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-[30%] mt-8 md:mt-0 flex items-start">
          <div className="w-full mx-auto">
            <OrderSummary
              cart={cart}
              pricing={pricing}
              onRemoveFromCart={(id) =>
                removeFromCart(id, { source: "order_summary" })
              }
              onUpgradeAllToPro={upgradeAllToPro}
              onShowCouponPopup={() => setShowCouponPopup(true)}
              appliedCoupon={appliedCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              couponCode={couponCode}
              onCouponCodeChange={setCouponCode}
              onApplyCoupon={() => handleApplyCoupon()}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>

      {/* Coupon Popup */}
      {showCouponPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Available Coupons
              </h3>
              <button
                onClick={() => setShowCouponPopup(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {isLoadingCoupons ? (
                <div className="text-center py-8 text-gray-500">
                  Loading coupons...
                </div>
              ) : availableCoupons.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No coupons available at the moment
                </div>
              ) : (
                availableCoupons.map((coupon) => (
                  <div
                    key={coupon.couponId}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-bold text-lg text-gray-800">
                          {coupon.couponCode}
                          {coupon.discountType === "PERCENTAGE" && (
                            <span className="ml-2 text-green-600">
                              {coupon.discountValue}% OFF
                            </span>
                          )}
                          {coupon.discountType === "FIXED" && (
                            <span className="ml-2 text-green-600">
                              ₹{coupon.discountValue} OFF
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {coupon.description || coupon.message}
                        </div>
                        {coupon.minCourseSelection > 0 && (
                          <div className="text-xs text-gray-500 mt-1">
                            Min {coupon.minCourseSelection} courses required
                          </div>
                        )}
                        {coupon.maxDiscountAmount > 0 &&
                          coupon.discountType === "PERCENTAGE" && (
                            <div className="text-xs text-gray-500 mt-1">
                              Max discount: ₹{coupon.maxDiscountAmount}
                            </div>
                          )}
                      </div>
                      <button
                        onClick={() => handleApplyCoupon(coupon)}
                        disabled={!coupon.applicable}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {coupon.applicable ? "Apply" : "Not Eligible"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
