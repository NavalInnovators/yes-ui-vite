import { useState } from "react";
import "./UserDashboard.css";
import UserDashboardRight from "./UserDashboardRight";
import { useNavigate } from "react-router-dom";
import { getAllCourses, enrollCourse } from "../api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { useMyCourses, getBookDetails } from "./sharedQuery";
import { useCart } from "../context/CartContext";

const AllSubjects = ({ searchQuery }) => {
  const queryClient = useQueryClient();
  const { cart, addToCart, removeFromCart, updateCartItem } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("");
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

  // if (myCourses.length > 0 && !localStorage.getItem('myCourses')) {
  //   console.log("My courses api called......")
  //   localStorage.setItem('myCourses', JSON.stringify(myCourses));
  // }

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
    mutationFn: (course) => enrollCourse(course),
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
      console.log("Error in enrolling for the subject: ", error);
      toast.dismiss();
      toast.error(`Enrollment failed! Please try again`);
    },
  });

  // Handler for Buy button
  const handleBuyClick = (course, plan) => {
    // Check if course already exists in cart
    const existingItem = cart.find(item => item.courseId === course.id);
    
    if (existingItem) {
      // Update existing item with new plan
      updateCartItem(existingItem.id, { plan, price: plan === 'Basic' ? 110 : 150 });
      toast.success(`${course.name} updated to ${plan} plan!`);
    } else {
      // Add new item to cart
      addToCart(course, plan);
      toast.success(`${course.name} (${plan}) added to cart!`);
    }
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

    // If more than 5 courses → 30% discount
    if (cart.length >= 5) {
      discount = subtotal * 0.25;
    }

    // If upgrade-to-pro → 10% discount
    if (allPro && cart.length > 0) {
      discount = subtotal * 0.30;
    }

    const total = subtotal - discount;

    return { subtotal, discount, total, allPro, hasBasic };
  }, [cart]);

  const upgradeAllToPro = () => {
    cart.forEach(item => {
      if (item.plan === "Basic") {
        updateCartItem(item.id, { plan: "Pro", price: 150 });
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
            <div className="all-course-card" key={course.id}>
              <div className="all-course-card-info-container">
                <div className="all-course-card-header-container">
                  <div className="font-subheading-black">{course.name}</div>
                </div>
                <div className="all-course-card-tags-container font-mark-read-btn">
                  <div className="all-course-card-each-tag">
                    {course.universityName}
                  </div>
                  <div className="all-course-card-each-tag">{course.year}</div>
                  {course.branchNames.map((branch, index) => (
                    <div
                      className="all-course-card-each-tag"
                      key={`branch-${index}`}
                    >
                      {branch}
                    </div>
                  ))}
                  {course.courseCodes.map((courseCode, index) => (
                    <div
                      className="all-course-card-each-tag"
                      key={`code-${index}`}
                    >
                      {courseCode}
                    </div>
                  ))}
                </div>
              </div>

              <div className="all-course-card-footer">
                {/* ===== NEW: Buy split button =====
                  - Split into two halves: Buy Basic | Buy Pro
                  - Buttons have same width/shape as Start Learning
                  - Clicking opens the global sidebar with the selected plan
              */}
                <div className="buy-split-btn" role="group" aria-label="Buy plans">
                  <button
                    className="buy-btn buy-left"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyClick(course, "Basic");
                    }}
                  >
                    Buy Basic
                  </button>
                  <button
                    className="buy-btn buy-right"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyClick(course, "Pro");
                    }}
                  >
                    Buy Pro
                  </button>
                </div>

                <div
                  onClick={
                    isEnrolling
                      ? null
                      : () => {
                        console.log("Clicked on start learning.....");
                        sessionStorage.setItem(
                          "selectedCourseCode",
                          course.courseCodes[0]
                        );

                        // Check if the course is already enrolled (from server)
                        const courseExists = myCourses.some(
                          (tempCourse) => tempCourse.id === course.id
                        );
                        // const courseExists = myCourses.length > 0 ? myCourses : JSON.parse(localStorage.getItem('myCourses')).some(tempCourse => tempCourse.id === course.id);

                        if (courseExists) {
                          navigate(
                            `/book-dashboard?subcode=${course.courseCodes[0]}`
                          );
                          return;
                        } else {
                          if (!localStorage.getItem("token")) {
                            navigate("/login");
                            return;
                          } else {
                            console.log("Have token!");
                            toast.info(
                              "Enrolling in the course... Please wait",
                              { autoClose: false }
                            );
                            mutateEnroll(course);
                          }
                        }
                      }
                  }
                  className="all-course-card-start-learning-btn font-notification pointer-cursor"
                >
                  Start Learning
                </div>
              </div>
            </div>
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
          <div className="order-summary-container">
            <div className="pricing-sidebar-title">
              <div className="title-text">Order Summary</div>
            </div>

            <div className="pricing-sidebar-body">
            {cart.length <= 4 ? (<p className="muted green">Select 5+ courses to unlock 25% discount!</p>):(<p className="muted green">Upgrade to Pro, get 30% discount!</p>)}

              <div className="sidebar-card sidebar-card-content">
                
                {cart.map((c) => (
                  <div key={c.id} className="summary-row">
                    <div>{c.name} ({c.plan})</div>
                    <div className="price-delete">
                      ₹{c.plan === "Basic" ? 110 : 150}
                      <button onClick={() => removeFromCart(c.id)}>🗑️</button>
                    </div>
                  </div>
                ))}

                <hr />
                <div className="summary-row">
                  <div>Subtotal</div>
                  <div>₹{pricing.subtotal}</div>
                </div>

                <div className="summary-row green">
                  <div>Discount</div>
                  <div>-₹{pricing.discount}</div>
                </div>
              </div>

              {pricing.hasBasic && (
                <div className="sidebar-card small">
                  <div className="bundle-row">
                    <div>
                      <div className="bundle-title">Bundle Savings</div>
                      <div className="bundle-desc">Upgrade all to Pro & Save 10%</div>
                    </div>
                    <button className="bundle-pro-btn" onClick={upgradeAllToPro}>
                      Pro
                    </button>
                  </div>
                </div>
              )}

              <div className="sidebar-total">
                <div className="total-label">Total Amount Payable:</div>
                <div className="total-value">₹{pricing.total}</div>
              </div>
            </div>

            <div className="pricing-sidebar-footer">
              <button 
                className="secure-checkout-btn"
                onClick={() => navigate('/mycart')}
              >
                Secure Checkout
              </button>
            </div>


            {/* <div className="pricing-sidebar-body">
          
          <div className="sidebar-card">
            <div className="sidebar-card-content">
              <p className="muted">Select 3+ courses to unlock bundle discounts!</p>

              <div className="summary-row">
                <div>Subtotal</div>
                <div className="muted strike">$3,000</div>
              </div>

              <hr />

              <div className="summary-row">
                <div>Subtotal (3 items)</div>
                <div>$9,000</div>
              </div>

              <div className="summary-row green">
                <div>-$45</div>
                <div className="muted">(Save 15%)</div>
              </div>
            </div>
          </div>

          
          <div className="sidebar-card small">
            <div className="bundle-row">
              <div>
                <div className="bundle-title">Bundle Savings</div>
                <div className="bundle-desc">Maximize Savings! Upgrade All to Pro</div>
              </div>

              <div>
              
                <button
                  className="bundle-pro-btn"
                  onClick={() => {
                    toast.info("Upgrade all to Pro clicked (implement logic)");
                    // Here you might set a state to mark 'upgrade all' or open checkout
                  }}
                >
                  Pro
                </button>
              </div>
            </div>
          </div>

          
          <div className="sidebar-total">
            <div className="total-label">Total Amount Payable:</div>
            <div className="total-value">$8,955</div>
          </div>
        </div>

        
        <div className="pricing-sidebar-footer">
          <button
            className="secure-checkout-btn"
            onClick={() => {
              // TODO: wire to your payment flow
              toast.info("Proceeding to checkout (implement flow)");
            }}
          >
            Secure Checkout
          </button>
        </div> */}

            {/* ###########################
        ###########################
        ########################### */}

            {/* <div className="pricing-sidebar-header">
          <div>
            <strong>{sidebarPlan ? `${sidebarPlan} Plan` : "Plan"}</strong>
            <div className="small-muted">
              {sidebarCourse ? sidebarCourse.name : ""}
            </div>
          </div>
          <button
            className="pricing-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="pricing-sidebar-body">
          {/* Example content — replace with your payment / purchase UI */}
            {/* {sidebarCourse ? (
            <>
              <p>
                You chose <strong>{sidebarPlan}</strong> for{" "}
                <em>{sidebarCourse.name}</em>.
              </p>

              <div className="plan-features">
                <p>
                  <strong>What's included</strong>
                </p>
                <ul>
                  <li>Access to course notes</li>
                  <li>AI summaries & rephraser</li>
                  <li>Previous year insights</li>
                </ul>
              </div>

              <div className="purchase-actions">
                <button
                  className="confirm-purchase-btn"
                  onClick={() => {
                    // TODO: replace this with actual purchase flow
                    toast.info(
                      `Proceeding to buy ${sidebarPlan} for ${sidebarCourse.name}`
                    );
                    // close sidebar for now
                    closeSidebar();
                  }}
                >
                  Proceed to Pay
                </button>

                <button
                  className="cancel-purchase-btn"
                  onClick={closeSidebar}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div>Select a plan to continue.</div>
          )} 
        </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSubjects;
