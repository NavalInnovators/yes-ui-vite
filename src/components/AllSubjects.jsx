import { useState, useEffect, useMemo } from "react";
import "./UserDashboard.css";
import UserDashboardRight from "./UserDashboardRight";
import { useNavigate } from "react-router-dom";
import { getAllCourses, enrollCourse, getCoupons } from "../api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMyCourses, getBookDetails } from "./sharedQuery";
import { useCart } from "../context/CartContext";
import AllSubjects_CourseCard from "./AllSubjects_CourseCard";
import OrderSummary from "./Mycart_ordersummary";

const AllSubjects = ({ searchQuery }) => {
  const queryClient = useQueryClient();
  const { cart, addToCart, removeFromCart, updateCartItem } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const navigate = useNavigate();
  const yearCategoryMap = {
    "1st Year": 1,
    "2nd Year": 2,
    "3rd Year": 3,
    "4th Year": 4,
  };
  const {
    data: allCourses = [],
    isLoading: isLoadingAllCourses,
    isError,
  } = useQuery({
    queryKey: ["allCourses"],
    queryFn: getAllCourses,
    enabled: !sessionStorage.getItem("allCourses"),
  });

  if (allCourses.length > 0 && !sessionStorage.getItem("allCourses")) {
    sessionStorage.setItem("allCourses", JSON.stringify(allCourses));
  }

  // calling myCourses from shared query
  useMyCourses();

  // Fetch available coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const profileId = localStorage.getItem("profileId");
        if (!profileId) return;

        const coupons = await getCoupons(profileId);
        setAvailableCoupons(coupons || []);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  // Filter the courses based on the search query
  const categories = useMemo(() => {
    const years = new Set();
    const branches = new Set();
    const universities = new Set();

    (allCourses.length > 0
      ? allCourses
      : JSON.parse(sessionStorage.getItem("allCourses") || "[]")
    ).forEach((course) => {
      if (course.year) years.add(`${course.year} Year`);
      if (course.branchNames) {
        course.branchNames.forEach((branch) => branches.add(branch));
      }
      if (course.universityName != "Unknown")
        universities.add(course.universityName);
    });

    // Sort years numerically
    const sortedYears = Array.from(years).sort((a, b) => {
      const numA = parseInt(a); // extract number before "Year"
      const numB = parseInt(b);
      return numA - numB;
    });

    return [
      ...Array.from(universities),
      ...sortedYears,
      ...Array.from(branches).sort(), // optional alphabetical sort
    ];
  }, [allCourses]);

  const filteredCourses = (
    allCourses.length > 0
      ? allCourses
      : JSON.parse(sessionStorage.getItem("allCourses") || "[]")
  ).filter((course) => {
    const normalize = (str) => str?.trimEnd().toLowerCase();
    const normalizeHyphen = (str) => normalize(str).replace(/\s*-\s*/g, "-");
    const yearCategoryMap = {
      "1 Year": 1,
      "2 Year": 2,
      "3 Year": 3,
      "4 Year": 4,
      "1st Year": 1,
      "2nd Year": 2,
      "3rd Year": 3,
      "4th Year": 4,
    };
    // Year categories
    if (yearCategoryMap[selectedCategory]) {
      return course.year === yearCategoryMap[selectedCategory];
    }

    // Branch categories
    if (
      course.branchNames?.some(
        (branch) =>
          normalizeHyphen(branch) === normalizeHyphen(selectedCategory)
      )
    ) {
      return true;
    }

    // University
    if (normalize(course.universityName) === normalize(selectedCategory)) {
      return true;
    }

    // Otherwise, normal search
    const query = normalize(selectedCategory || searchQuery);
    return (
      normalize(course.name)?.includes(query) ||
      normalize(course.universityName)?.includes(query) ||
      String(course.year).toLowerCase().includes(query) ||
      course.branchNames?.some((branch) =>
        normalizeHyphen(branch).includes(normalizeHyphen(query))
      ) ||
      course.courseCodes?.some((code) => normalize(code)?.includes(query))
    );
  });

  const { data: myCourses = [] } = useMyCourses();

  const { mutate: mutateEnroll, isPending: isEnrolling } = useMutation({
    mutationFn: (course) => {
      return enrollCourse(course);
    },
    onSuccess: (data) => {
      const enrolledCourse = data[1];

      const alreadyExists = myCourses.some(
        (obj) => obj.id === enrolledCourse.id
      );

      if (alreadyExists) {
        toast.dismiss();
        toast.info("Course Already Enrolled!");
        navigate(`/book-dashboard?subcode=${enrolledCourse.courseCodes[0]}`);
        return;
      }

      const updatedCourses = [...myCourses, enrolledCourse];
      localStorage.setItem("myCourses", JSON.stringify(updatedCourses));
      localStorage.setItem(
        "bookDetails",
        JSON.stringify(getBookDetails(updatedCourses))
      );

      toast.dismiss();
      toast.success("Successfully enrolled in the course!");
      navigate(`/book-dashboard?subcode=${enrolledCourse.courseCodes[0]}`);

      queryClient.invalidateQueries(["myCourses"]);
    },
    onError: (error) => {
      console.error("Enrollment Error:", error.response);
      toast.dismiss();

      if (error.response?.status === 404) {
        toast.error(
          "Course not found. Please refresh the page and try again.",
        );
      } else {
        toast.error(`Enrollment failed! ${error.message}`);
      }
    },
  });

  // Handler for Buy button
  const handleBuyClick = async (course, plan) => {
    // Check if course already exists in cart
    const existingItem = cart.find((item) => item.courseId === course.id);

    if (existingItem) {
      // If changing plan, remove old item and add new one via API to get correct price
      if (existingItem.plan !== plan) {
        toast.info(`Updating ${course.name} to ${plan} plan...`);
        await removeFromCart(existingItem.id, {
          source: "plan_change",
        });
        await addToCart(course, plan, {
          source: "all_subjects",
        });
        toast.success(`${course.name} updated to ${plan} plan!`);
      } else {
        toast.info(`${course.name} is already in cart with ${plan} plan`);
      }
    } else {
      // Add new item to cart
      addToCart(course, plan, {
        source: "all_subjects",
      });
      toast.success(`${course.name} (${plan}) added to cart!`);
    }
  };

  const pricing = useMemo(() => {
    let subtotal = 0;
    let allPro = true;
    let hasBasic = false;

    cart.forEach((c) => {
      // Use actual price from backend
      subtotal += c.price || 0;

      if (c.plan === "BASIC") {
        allPro = false;
        hasBasic = true;
      }
    });

    let discount = 0;

    const total = subtotal - discount;

    return { subtotal, discount, total, allPro, hasBasic };
  }, [cart]);

  // Calculate best available coupon
  const bestCoupon = useMemo(() => {
    if (availableCoupons.length === 0 || cart.length === 0) return null;

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
        potentialDiscount = coupon.discountValue / 100; // Convert paise to rupees
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
  }, [cart, availableCoupons]);

  const upgradeAllToPro = () => {
    cart.forEach((item) => {
      if (item.plan === "BASIC") {
        updateCartItem(item.id, { plan: "PRO", price: 150 });
      }
    });
  };

  return (
    <div className="userdashboard-content-page">
      <div className="all-course-card-container">
        {/* Handle loading and error states */}
        {isLoadingAllCourses ? (
          <div>Loading all your courses...</div>
        ) : isError ? (
          <div>Error loading courses. Please try again later.</div>
        ) : filteredCourses.length === 0 ? (
          <div>No courses found.</div>
        ) : (
          filteredCourses.map((course) => (
            <AllSubjects_CourseCard
              key={course.id}
              course={course}
              myCourses={myCourses}
              navigate={navigate}
              mutateEnroll={mutateEnroll}
              isEnrolling={isEnrolling}
              handleBuyClick={handleBuyClick}
            />
          ))
        )}
      </div>

      <div className="userdashboard-sidesection">
        {/* Show Categories if no course is selected, else show Order Summary */}
        {cart.length === 0 ? (
          <UserDashboardRight
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={(category) => {
              if (selectedCategory === category) {
                setSelectedCategory("");
              } else {
                setSelectedCategory(category);
              }
            }}
          />
        ) : (
          <OrderSummary
            cart={cart}
            pricing={pricing}
            onRemoveFromCart={(id) => removeFromCart(id, { source: "order_summary" })}
            onUpgradeAllToPro={upgradeAllToPro}
            onShowCouponPopup={() => navigate("/mycart")}
            appliedCoupon={appliedCoupon || bestCoupon} // Show best available if none applied
            onRemoveCoupon={() => setAppliedCoupon(null)}
            couponCode={couponCode}
            onCouponCodeChange={setCouponCode}
            onApplyCoupon={() => {
              if (bestCoupon && couponCode === bestCoupon.couponCode) {
                setAppliedCoupon(bestCoupon);
                toast.success("Coupon applied!");
              } else {
                toast.error("Invalid coupon code");
              }
            }}
            onCheckout={() => navigate("/mycart")}
            showCouponInput={false}
            checkoutButtonText="Proceed to Cart"
          />
        )}
      </div>
    </div>
  );
};

export default AllSubjects;
