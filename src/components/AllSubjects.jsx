import { useState, useEffect, useMemo } from "react";
import "./UserDashboard.css";
import SearchAndFilterBar from "./SearchAndFilterBar";
import { SkeletonGrid } from "./SkeletonCard";
import { useNavigate } from "react-router-dom";
import { getAllCourses, enrollCourse, getCoupons } from "../api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMyCourses, getBookDetails } from "./sharedQuery";
import { useCart } from "../context/CartContext";
import AllSubjects_CourseCard from "./AllSubjects_CourseCard";
import OrderSummary from "./Mycart_ordersummary";
import { isBasic } from "../utils/planUtils";
import { NoData } from "./EmptyStates";

const AllSubjects = ({ searchQuery, onSearch }) => {
  const queryClient = useQueryClient();
  const { cart, addToCart, removeFromCart, updateCartItem } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const navigate = useNavigate();
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

  // calling myCourses from shared query - only when logged in
  const { data: myCourses = [] } = useMyCourses();

  // Fetch available coupons only when there are items in cart
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const profileId = localStorage.getItem("profileId");
        if (!profileId || cart.length === 0) {
          setAvailableCoupons([]);
          return;
        }

        const coupons = await getCoupons(profileId);
        setAvailableCoupons(coupons || []);
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
        setAvailableCoupons([]);
      }
    };

    fetchCoupons();
  }, [cart.length]);

  // Filter the courses based on the search query
  const categories = useMemo(() => {
    const years = new Set();
    const branches = new Set();
    const universities = new Set();

    (allCourses.length > 0
      ? allCourses
      : JSON.parse(sessionStorage.getItem("allCourses") || "[]")
    ).forEach((course) => {
      if (course.year) years.add(`Year ${course.year}`);
      if (course.branchNames) {
        course.branchNames.forEach((branch) => branches.add(branch));
      }
      if (course.universityName != "Unknown")
        universities.add(course.universityName);
    });

    // Sort years numerically
    const sortedYears = Array.from(years).sort((a, b) => {
      const numA = parseInt(a.replace("Year ", ""));
      const numB = parseInt(b.replace("Year ", ""));
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
      "Year 1": 1,
      "Year 2": 2,
      "Year 3": 3,
      "Year 4": 4,
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
    }
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

    let discount = 0;
    const total = subtotal - discount;

    return { subtotal, discount, total, allPro, hasBasic };
  }, [cart]);


  const upgradeAllToPro = () => {
    cart.forEach((item) => {
      if (isBasic(item.plan)) {
        updateCartItem(item.id, { plan: "PRO", price: 150 });
      }
    });
  };

  return (
    <div className="new-dashboard-layout">
      {/* Search and Filter Bar */}
      <SearchAndFilterBar
        searchQuery={searchQuery}
        onSearch={onSearch}
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
      
      <div className="dashboard-main-content">
        <div className={`courses-grid ${cart.length > 0 ? 'with-sidebar' : 'full-width'}`}>
          {isLoadingAllCourses ? (
            <SkeletonGrid 
              count={cart.length > 0 ? 6 : 8} 
            />
          ) : isError ? (
            <div className="error-message">Error loading courses. Please try again later.</div>
          ) : filteredCourses.length === 0 ? (
            <NoData 
              title="No Courses Found"
              message="No courses match your search criteria. Try adjusting your filters or search terms."
              className="col-span-full"
            />
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

        {/* Order Summary Sidebar */}
        {cart.length > 0 && (
          <div className="order-summary-sidebar">
            <OrderSummary
              cart={cart}
              pricing={pricing}
              onRemoveFromCart={(id) => removeFromCart(id, { source: "order_summary" })}
              onUpgradeAllToPro={upgradeAllToPro}
              onShowCouponPopup={() => navigate("/mycart")}
              appliedCoupon={null}
              availableCouponsCount={availableCoupons.length}
              onRemoveCoupon={() => setAppliedCoupon(null)}
              couponCode={couponCode}
              onCouponCodeChange={setCouponCode}
              onApplyCoupon={() => navigate("/mycart")}
              onCheckout={() => navigate("/mycart")}
              showCouponInput={false}
              checkoutButtonText="Proceed to Cart"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSubjects;
