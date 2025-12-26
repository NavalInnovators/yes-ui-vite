import { useState, useMemo, useEffect } from "react";
import GradientDiv from "../roles/components/GradientDiv";
import Mycart_purchased_course_card from "./Mycart_purchased_course_card";
import OrderSummary from "./Mycart_ordersummary";
import Mycart_suggested_courses_card from "./Mycart_suggested_courses_card";
import { CartContentSkeleton } from "./SkeletonCard";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { trackCartEvent, getISTISOString } from "../utils/analytics";
import { useQueryClient } from "@tanstack/react-query";
import { isBasic, isPro } from "../utils/planUtils";
import {
    getCoupons,
    applyCoupon,
    createTransaction,
    verifyPayment,
    removeTransaction,
    getSubscriptions,
    enrollCourse,
    // getSuggestedCourses, // API function when available
} from "../api/api";

export default function Mycart() {
  const {
    cart,
    removeFromCart,
    updateCartItem,
    addToCart,
    checkout,
    setCart,
    reloadSubscriptions,
    isLoadingCart,
    isAddingToCart,
  } = useCart();
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  // State for suggested courses from API
  const [suggestedCourses, setSuggestedCourses] = useState([]);
  const [isLoadingSuggestedCourses, setIsLoadingSuggestedCourses] = useState(false);
  const [suggestedCoursesError, setSuggestedCoursesError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showCouponPopup, setShowCouponPopup] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);

  // Fetch suggested courses from API
  useEffect(() => {
    const fetchSuggestedCourses = async () => {
      try {
        const profileId = localStorage.getItem("profileId");
        if (!profileId || cart.length === 0) {
          setSuggestedCourses([]);
          return;
        }

        setIsLoadingSuggestedCourses(true);
        setSuggestedCoursesError(null);

        // const response = await getSuggestedCourses(profileId, cart);
        // setSuggestedCourses(response.data || []);

        setSuggestedCourses([]);

      } catch (error) {
        console.error("Failed to fetch suggested courses:", error);
        setSuggestedCoursesError("Failed to load suggested courses");
        setSuggestedCourses([]);
      } finally {
        setIsLoadingSuggestedCourses(false);
      }
    };

    fetchSuggestedCourses();
  }, [cart]);

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
  const filteredSuggestedCourses = suggestedCourses.filter((course) => {
    const title = (course.title || "").toLowerCase();
    const dept = (course.dept || "").toLowerCase();
    const subjectCode = (course.subjectCode || "").toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || dept.includes(q) || subjectCode.includes(q);
  });

  const upgradeToPro = async (id) => {
    const item = cart.find((item) => item.id === id);
    const itemIsBasic = isBasic(item?.plan);

    if (itemIsBasic) {
      try {
        // Remove BASIC item
        await removeFromCart(id, { source: "upgrade" });

        // Add PRO plan using the stored courseId
        const courseData = {
          id: item.courseId,
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
            const loadingToast = toast.loading("Processing payment...");

            await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
            );

            // Store cart items for enrollment before clearing
            const purchasedCourses = [...cart];

            // Clear cart immediately
            setCart([]);

            // Enroll in purchased courses
            toast.dismiss(loadingToast);
            const enrollingToast = toast.loading("Enrolling in courses...");
            
            try {
              const enrollmentPromises = purchasedCourses.map(async (cartItem) => {
                try {
                  // Get course from allCourses for enrollment
                  const allCourses = [
                    ...JSON.parse(sessionStorage.getItem("allCourses") || "[]"),
                    ...JSON.parse(localStorage.getItem("allCourses") || "[]"),
                  ];
                  
                  const actualCourse = allCourses.find(course => course.id === cartItem.courseId);
                  
                  if (actualCourse) {
                    const enrollmentResult = await enrollCourse(actualCourse);
                    return enrollmentResult[1] || actualCourse;
                  }
                  return null;
                } catch (enrollError) {
                  console.error(`Enrollment failed for ${cartItem.name}:`, enrollError);
                  // Don't fail the entire process if one enrollment fails
                  return null;
                }
              });

              const enrolledCourses = await Promise.all(enrollmentPromises);
              const successfulEnrollments = enrolledCourses.filter(course => course !== null);

              if (successfulEnrollments.length > 0) {
                // Update myCourses in localStorage
                const existingMyCourses = JSON.parse(localStorage.getItem("myCourses") || "[]");
                const updatedMyCourses = [...existingMyCourses];

                successfulEnrollments.forEach(enrolledCourse => {
                  const alreadyExists = updatedMyCourses.some(course => course.id === enrolledCourse.id);
                  if (!alreadyExists) {
                    updatedMyCourses.push(enrolledCourse);
                  }
                });

                localStorage.setItem("myCourses", JSON.stringify(updatedMyCourses));
                
                const { getBookDetails } = await import("./sharedQuery");
                localStorage.setItem("bookDetails", JSON.stringify(getBookDetails(updatedMyCourses)));
              }

              toast.dismiss(enrollingToast);

            } catch (enrollmentError) {
              console.error("Enrollment process failed:", enrollmentError);
              toast.dismiss(enrollingToast);
            }

            try {
              await reloadSubscriptions();
              
              toast.dismiss(loadingToast);
              toast.success("Payment successful! Courses activated.");
              
              queryClient.invalidateQueries(["myCourses"]);
              
              navigate("/my-subjects");
            } catch (error) {
              toast.dismiss(loadingToast);
              toast.success("Payment successful! Please check your courses.");
              
              queryClient.invalidateQueries(["myCourses"]);
              navigate("/my-subjects");
            }

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

      if (isBasic(c.plan)) {
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
    const basicItems = cart.filter((item) => isBasic(item.plan));

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
            Review Your Cart
          </span>
        </div>
      </GradientDiv>

      {/* Main content */}
      {isLoadingCart || isAddingToCart ? (
        <CartContentSkeleton />
      ) : cart.length === 0 ? (
        // Empty cart state
        <div className="px-4 py-6 md:p-10 flex justify-center items-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <svg 
                className="w-24 h-24 mx-auto text-gray-300 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" 
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Take the next step in your learning journey. Browse and choose courses made for you.
            </p>
            <button
              onClick={() => navigate("/all-subjects")}
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg cursor-pointer"
            >
              Browse All Subjects
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-6 md:p-10 md:flex gap-6">
        {/* Left side */}
        <div className="w-full md:w-[70%]" id="left-section">
          <div>
            <h1 className="text-2xl font-bold py-4 md:py-6">
              Review Your Order
            </h1>

            {/* Best Coupon Banner */}
            {bestCoupon && (
              <div className="mb-4 bg-gradient-to-r from-green-50/60 to-emerald-50/60 border-2 border-green-200 rounded-2xl p-4 md:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">🎉</span>
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
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer shadow-sm hover:shadow-md"
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
                  courseCode={course.courseCodes ?? []}
                  branchNames={course.branchNames ?? []}
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

          {/* Suggested Courses */}
          {(suggestedCourses.length > 0 || isLoadingSuggestedCourses) && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                  Suggested Courses to add
                </h1>
                {!isLoadingSuggestedCourses && suggestedCourses.length > 0 && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                )}
              </div>

              {isLoadingSuggestedCourses ? (
                <div className="flex justify-center py-12">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                    <div className="text-gray-500">Loading suggested courses...</div>
                  </div>
                </div>
              ) : suggestedCoursesError ? (
                <div className="text-center py-8">
                  <div className="text-red-500 mb-2">{suggestedCoursesError}</div>
                  <button
                    onClick={() => {
                      // Retry fetching suggested courses
                      const fetchSuggestedCourses = async () => {
                        try {
                          const profileId = localStorage.getItem("profileId");
                          if (!profileId || cart.length === 0) return;

                          setIsLoadingSuggestedCourses(true);
                          setSuggestedCoursesError(null);

                          // TODO: Replace with actual API call when available
                          // const response = await getSuggestedCourses(profileId, cart);
                          // setSuggestedCourses(response.data || []);
                          
                          setSuggestedCourses([]);
                        } catch (error) {
                          setSuggestedCoursesError("Failed to load suggested courses");
                        } finally {
                          setIsLoadingSuggestedCourses(false);
                        }
                      };
                      fetchSuggestedCourses();
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredSuggestedCourses.length > 0 ? (
                <div>
                  <div
                    id="suggested-courses"
                    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                  >
                    {filteredSuggestedCourses.map((course) => (
                      <Mycart_suggested_courses_card
                        key={course.id}
                        course={course}
                        title={course.title}
                        courseCode={course.subjectCode}
                        branchNames={course.branchNames}
                        hasBasic={course.hasBasic}
                        isUpgrade={course.isUpgrade}
                        upgradePrice={course.upgradePrice}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>
                  
                  {/* Navigation buttons below carousel */}
                  {filteredSuggestedCourses.length > 1 && (
                    <div className="flex justify-center gap-4 mt-4">
                      <button
                        className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all border border-gray-200"
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
                          className="w-5 h-5 text-gray-600"
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
                        className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all border border-gray-200"
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
                          className="w-5 h-5 text-gray-600"
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
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {searchQuery ? "No courses match your search criteria" : "No suggested courses available"}
                </div>
              )}
            </div>
          )}
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
  )}

</div>
)
}