import { useState, useMemo } from "react";
import GradientDiv from "../roles/components/GradientDiv";
import Mycart_purchased_course_card from "./Mycart_purchased_course_card";
import OrderSummary from "./Mycart_ordersummary";
import Mycart_suggested_courses_card from "./Mycart_suggested_courses_card";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Mycart() {
  const { cart, removeFromCart, updateCartItem, addToCart, checkout, getSuggestedCourses } = useCart();
  const navigate = useNavigate();

  // Get suggested courses based on cart items
  const allSuggestedCourses = getSuggestedCourses(cart);

  const [searchQuery, setSearchQuery] = useState("");
  const [showCouponPopup, setShowCouponPopup] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");

  // Filter suggested courses based on search query
  const filteredSuggestedCourses = allSuggestedCourses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.subjectCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const upgradeToPro = (id) => {
    const item = cart.find(item => item.id === id);
    if (item && item.plan === "Basic") {
      updateCartItem(id, { plan: "Pro", price: 150 });
    }
  };

  const handleAddToCart = (course, plan) => {
    const courseData = {
      id: course.id,
      name: course.title,
      courseCodes: course.courseCodes,
      universityName: course.universityName,
      year: course.year,
      branchNames: course.branchNames
    };
    addToCart(courseData, plan);
    toast.success(`${course.title} (${plan}) added to cart!`);
  };

  const handleCheckout = () => {
    checkout();
    toast.success("Order placed successfully!");
    navigate('/myorders');
  };

  // Available coupons
  const availableCoupons = [
    {
      id: 'bundle25',
      code: 'BUNDLE25',
      name: 'Bundle Discount',
      description: 'Get 25% off on 5+ courses',
      discount: 0.25,
      type: 'bundle',
      minItems: 5
    },
    {
      id: 'pro30',
      code: 'PRO30',
      name: 'Pro Discount',
      description: 'Get 30% off when all courses are Pro',
      discount: 0.30,
      type: 'pro',
      requiresAllPro: true
    },
    {
      id: 'earlybird',
      code: 'EARLYBIRD',
      name: 'Early Bird',
      description: 'Get 15% off on your first purchase',
      discount: 0.15,
      type: 'general'
    },
    {
      id: 'winner',
      code: 'WINNER',
      name: 'Competition Winner',
      description: 'Get 20% off as a competition winner',
      discount: 0.20,
      type: 'general'
    },
    {
      id: 'student',
      code: 'STUDENT15',
      name: 'Student Discount',
      description: 'Get 15% off with student ID',
      discount: 0.15,
      type: 'general'
    }
  ];

  const applyCoupon = (coupon) => {
    setAppliedCoupon(coupon);
    setCouponCode(coupon.code);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const pricing = useMemo(() => {
    const basicPrice = 110;
    const proPrice = 150;

    let subtotal = 0;
    let allPro = true;
    let hasBasic = false;

    cart.forEach((c) => {
      if (c.plan === "Basic") {
        subtotal += basicPrice;
        allPro = false;
        hasBasic = true;
      } else {
        subtotal += proPrice;
      }
    });

    let discount = 0;
    let discountType = 'none';

    // Auto-apply appropriate discount based on cart conditions
    if (appliedCoupon) {
      // Apply coupon discount
      if (appliedCoupon.type === 'bundle' && cart.length >= appliedCoupon.minItems) {
        discount = subtotal * appliedCoupon.discount;
        discountType = 'coupon';
      } else if (appliedCoupon.type === 'pro' && allPro && cart.length > 0) {
        discount = subtotal * appliedCoupon.discount;
        discountType = 'coupon';
      } else if (appliedCoupon.type === 'general') {
        discount = subtotal * appliedCoupon.discount;
        discountType = 'coupon';
      }
    } else {
      // Auto-apply system discounts
      if (cart.length >= 5) {
        discount = subtotal * 0.25;
        discountType = 'bundle';
      } else if (allPro && cart.length > 0) {
        discount = subtotal * 0.30;
        discountType = 'pro';
      }
    }

    const total = subtotal - discount;

    return { subtotal, discount, total, allPro, hasBasic, discountType };
  }, [cart, appliedCoupon]);

  const upgradeAllToPro = () => {
    cart.forEach(item => {
      if (item.plan === "Basic") {
        updateCartItem(item.id, { plan: "Pro", price: 150 });
      }
    });
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
            <div className="grid gap-4 md:grid-cols-2">
              {cart.map((course) => (
                <Mycart_purchased_course_card 
                  key={course.id} 
                  title={course.name}
                  credits={course.courseCodes[0]}
                  dept={course.branchNames[0]}
                  plan={course.plan}
                  price={course.price}
                  onRemove={() => removeFromCart(course.id)}
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
                  const container = document.getElementById('suggested-courses');
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }}
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition"
                onClick={() => {
                  const container = document.getElementById('suggested-courses');
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }}
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div id="suggested-courses" className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {filteredSuggestedCourses.map((course) => (
                  <Mycart_suggested_courses_card 
                    key={course.id} 
                    title={course.title}
                    credits={course.subjectCode}
                    dept={course.dept}
                    hasBasic={course.hasBasic}
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
              onRemoveFromCart={removeFromCart}
              onUpgradeAllToPro={upgradeAllToPro}
              onShowCouponPopup={() => setShowCouponPopup(true)}
              appliedCoupon={appliedCoupon}
              onRemoveCoupon={removeCoupon}
              couponCode={couponCode}
              onCouponCodeChange={setCouponCode}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>

      {/* Coupon Popup */}
      {showCouponPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Available Coupons</h3>
              <button 
                onClick={() => setShowCouponPopup(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {availableCoupons.map((coupon) => (
                <div key={coupon.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-bold text-lg text-gray-800">{coupon.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{coupon.description}</div>
                      <div className="text-xs text-gray-500 mt-2">Code: {coupon.code}</div>
                    </div>
                    <button 
                      onClick={() => {
                        applyCoupon(coupon);
                        setShowCouponPopup(false);
                      }}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-purple-800 transition-all"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
