import { useState, useEffect } from "react";
import GradientDiv from "../roles/components/GradientDiv";
import Active_Courses_Card from "./Myorders_Active_Courses_Card";
import Expired_Courses_Card from "./Myorders_Expired_Courses_Card";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { getSubscriptions } from "../api/api";
import { toast } from "react-toastify";

export default function Myorders() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [expiredSubscriptions, setExpiredSubscriptions] = useState([]);
  const [cancelledSubscriptions, setCancelledSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch subscriptions from API
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const profileId = localStorage.getItem("profileId");
        if (!profileId) {
          toast.error("Please login to view orders");
          navigate("/login");
          return;
        }

        setIsLoading(true);

        // Fetch from API
        let apiActive = [];
        let apiExpired = [];
        let apiCancelled = [];

        try {
          const response = await getSubscriptions(profileId, "ALL");

          response.content?.forEach((sub) => {
            if (sub.status === "ACTIVE") {
              apiActive.push(sub);
            } else if (sub.status === "EXPIRED") {
              apiExpired.push(sub);
            } else if (sub.status === "CANCELLED") {
              apiCancelled.push(sub);
            }
          });
        } catch (apiError) {
          console.warn("API subscriptions not available:", apiError);
        }

        // Fetch from localStorage (mock orders from checkout)
        const localOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        console.log("💾 LocalStorage Orders:", localOrders);

        // Convert localStorage orders to subscription format
        const localActive = localOrders
          .filter((order) => order.status === "active")
          .map((order) => ({
            id: order.id,
            course: {
              name: order.name,
              id: order.courseId,
              courseCode: order.courseCodes || [],
              universityName: [order.universityName || ""],
              branchNames: order.branchNames || [],
            },
            plan: order.plan,
            purchaseDate: order.purchaseDate,
            expiryDate: order.expiryDate,
            status: "ACTIVE",
            isLocal: true, // Flag to identify localStorage orders
          }));

        // Combine API and localStorage orders
        setActiveSubscriptions([...apiActive, ...localActive]);
        setExpiredSubscriptions(apiExpired);
        setCancelledSubscriptions(apiCancelled);
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        toast.error("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptions();
  }, [navigate]);

  const handleUpgradeToPro = async (subscription) => {
    try {
      // Convert subscription to course format for cart
      const courseForCart = {
        id: subscription.course.id,
        name: subscription.course.name,
        courseCodes: subscription.course.courseCode || [],
        universityName: subscription.course.universityName?.[0] || "",
        branchNames: subscription.course.branchNames || [],
        year: subscription.course.year || "",
      };

      toast.info("Adding PRO plan to cart...");

      // Add PRO plan to cart via API
      await addToCart(courseForCart, "PRO", {
        source: "upgrade_from_orders",
      });

      toast.success("PRO plan added to cart!");
      navigate("/mycart");
    } catch (error) {
      console.error("Failed to upgrade:", error);
      toast.error("Failed to add PRO plan to cart");
    }
  };

  const handleStartLearning = async (subscription) => {
    try {
      const profileId = localStorage.getItem("profileId");
      const token = localStorage.getItem("token");
      
      if (!profileId) {
        toast.error("Please login to start learning");
        return;
      }

      if (!token) {
        toast.error("Authentication required. Please login again.");
        return;
      }

      // Check if course is already active to prevent duplicate enrollment
      const isAlreadyActive = activeSubscriptions.some(
        (activeSub) => activeSub.course.id === subscription.course.id
      );

      if (isAlreadyActive) {
        toast.info("You are already enrolled in this course!");
        // Navigate to course dashboard
        const courseCode = subscription.course.courseCode?.[0] || subscription.course.courseCodes?.[0];
        if (courseCode) {
          navigate(`/book-dashboard?subcode=${courseCode}`);
        }
        return;
      }

      // Convert subscription to course format for enrollment
      const courseForEnrollment = {
        id: subscription.course.id,
        name: subscription.course.name,
        courseCodes: subscription.course.courseCode || [],
        universityName: subscription.course.universityName?.[0] || "",
        branchNames: subscription.course.branchNames || [],
        year: subscription.course.year || "",
      };

      console.log("Starting free enrollment for cancelled course:", {
        courseId: courseForEnrollment.id,
        courseName: courseForEnrollment.name,
        profileId
      });

      toast.info("Enrolling in course... Please wait", {
        autoClose: false,
      });

      // Use direct enrollment API for free courses (same as AllSubjects component)
      const { enrollCourse } = await import("../api/api");
      const [enrollmentResponse] = await enrollCourse(courseForEnrollment);
      
      console.log("Enrollment successful:", enrollmentResponse);

      // Remove from cancelled list immediately
      setCancelledSubscriptions((prev) =>
        prev.filter((sub) => sub.id !== subscription.id),
      );

      // Create a new active subscription entry for the re-enrolled course
      const newActiveSubscription = {
        ...subscription,
        status: "ACTIVE",
        plan: "FREE", // Re-enrollment is always free
        purchaseDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
      };

      // Add to active subscriptions
      setActiveSubscriptions((prev) => [...prev, newActiveSubscription]);

      // Refresh subscriptions from backend after a short delay to ensure backend has processed
      setTimeout(async () => {
        try {
          const response = await getSubscriptions(profileId, "ALL");
          
          if (response?.content) {
            const newActive = response.content.filter(sub => sub.status === "ACTIVE");
            const newExpired = response.content.filter(sub => sub.status === "EXPIRED");
            const newCancelled = response.content.filter(sub => sub.status === "CANCELLED");
            
            setActiveSubscriptions(newActive);
            setExpiredSubscriptions(newExpired);
            setCancelledSubscriptions(newCancelled);
            
            console.log("Subscriptions refreshed after enrollment");
          }
        } catch (refreshError) {
          console.warn("Failed to refresh subscriptions:", refreshError);
          // Don't show error to user as the main enrollment was successful
        }
      }, 1000); // 1 second delay to allow backend processing

      toast.dismiss(); // Dismiss the loading toast
      toast.success("Successfully enrolled in course!");

      // Navigate to the course dashboard
      const courseCode = subscription.course.courseCode?.[0] || subscription.course.courseCodes?.[0];
      
      console.log("Navigation details:", {
        courseCode,
        courseCodeArray: subscription.course.courseCode,
        courseCodesArray: subscription.course.courseCodes,
        navigationUrl: courseCode ? `/book-dashboard?subcode=${courseCode}` : null
      });

      if (courseCode) {
        console.log(`Navigating to: /book-dashboard?subcode=${courseCode}`);
        navigate(`/book-dashboard?subcode=${courseCode}`);
      } else {
        console.warn("No course code found for navigation");
        toast.success("Enrollment successful! Redirecting to your subjects...");
        // Fallback navigation to my-subjects page
        setTimeout(() => {
          navigate("/my-subjects");
        }, 1500);
      }
    } catch (error) {
      toast.dismiss(); // Dismiss any loading toasts
      console.error("Failed to enroll in cancelled course:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Show more specific error messages
      if (error.response?.status === 401) {
        toast.error("Authentication expired. Please login again.");
      } else if (error.response?.status === 400) {
        toast.error(error.response?.data?.message || "Invalid request. Please try again.");
      } else if (error.response?.status === 404) {
        toast.error("Course not found. Please refresh and try again.");
      } else if (error.response?.status === 409) {
        toast.info("You are already enrolled in this course!");
        
        // Remove from cancelled list since user is already enrolled
        setCancelledSubscriptions((prev) =>
          prev.filter((sub) => sub.id !== subscription.id),
        );
        
        // Navigate to the course dashboard
        const courseCode = subscription.course.courseCode?.[0] || subscription.course.courseCodes?.[0];
        if (courseCode) {
          navigate(`/book-dashboard?subcode=${courseCode}`);
        }
      } else {
        toast.error(error.message || "Failed to enroll in course");
      }
    }
  };

  const handleCancelSubscription = async (subscription) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel "${subscription.course.name}"?`,
    );

    if (!confirmCancel) return;

    try {
      const profileId = localStorage.getItem("profileId");

      // If it's a localStorage order, just remove it
      if (subscription.isLocal) {
        const localOrders = JSON.parse(localStorage.getItem("orders") || "[]");
        const updatedOrders = localOrders.filter(
          (order) => order.id !== subscription.id,
        );
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        // Update state
        setActiveSubscriptions((prev) =>
          prev.filter((sub) => sub.id !== subscription.id),
        );

        toast.success("Subscription cancelled successfully");
      } else {
        // Call API to cancel subscription
        const { cancelSubscription } = await import("../api/api");
        const reason = "User requested cancellation";

        await cancelSubscription(reason, profileId, subscription.id);

        // Move to cancelled list
        setActiveSubscriptions((prev) =>
          prev.filter((sub) => sub.id !== subscription.id),
        );
        setCancelledSubscriptions((prev) => [
          ...prev,
          { ...subscription, status: "CANCELLED" },
        ]);

        toast.success("Subscription cancelled successfully");
      }
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
      toast.error(error.message || "Failed to cancel subscription");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full min-h-screen pt-24 md:pt-28">
      <div className="text-xl font-regular mb-6">
        <GradientDiv>
          <div className="mx-12">My Orders</div>
        </GradientDiv>
      </div>

      <div className="w-[90%] mx-auto">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading your orders...</div>
          </div>
        ) : (
          <>
            {/* Active Courses */}
            <h1 className="text-2xl font-semibold mb-6">
              Active Courses ({activeSubscriptions.length})
            </h1>
            {activeSubscriptions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No active courses. Browse courses to get started!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {activeSubscriptions.map((sub) => (
                  <Active_Courses_Card
                    key={sub.id}
                    courseName={sub.course.name}
                    credits={sub.course.courseCode?.[0] || "N/A"}
                    planType={
                      sub.plan === "PRO"
                        ? "Pro Plan"
                        : sub.plan === "BASIC"
                        ? "Basic Plan"
                        : sub.plan === "FREE"
                        ? "Free Plan"
                        : sub.plan
                    }
                    purchaseDate={formatDate(sub.purchaseDate)}
                    expiryDate={formatDate(sub.expiryDate)}
                    branchName={sub.course.branchNames?.[0] || "CSE"}
                    universityName={sub.course.universityName?.[0] || ""}
                    onUpgrade={
                      sub.plan === "BASIC" || sub.plan === "FREE"
                        ? () => handleUpgradeToPro(sub)
                        : null
                    }
                    onCancel={() => handleCancelSubscription(sub)}
                  />
                ))}
              </div>
            )}

            {/* Expired Courses */}
            <h1 className="text-2xl font-semibold py-8">
              Expired Courses ({expiredSubscriptions.length})
            </h1>
            {expiredSubscriptions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No expired courses
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {expiredSubscriptions.map((sub) => (
                  <Expired_Courses_Card
                    key={sub.id}
                    courseName={sub.course.name}
                    credits={sub.course.courseCode?.[0] || "N/A"}
                    planType={
                      sub.plan === "PRO"
                        ? "Pro Plan"
                        : sub.plan === "BASIC"
                        ? "Basic Plan"
                        : sub.plan
                    }
                    purchaseDate={formatDate(sub.purchaseDate)}
                    expiryDate={formatDate(sub.expiryDate)}
                  />
                ))}
              </div>
            )}

            {/* Cancelled Courses */}
            {cancelledSubscriptions.length > 0 && (
              <>
                <h1 className="text-2xl font-semibold py-8">
                  Cancelled Courses ({cancelledSubscriptions.length})
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {cancelledSubscriptions.map((sub) => (
                    <Expired_Courses_Card
                      key={sub.id}
                      courseName={sub.course.name}
                      credits={sub.course.courseCode?.[0] || "N/A"}
                      planType={
                        sub.plan === "PRO"
                          ? "Pro Plan"
                          : sub.plan === "BASIC"
                          ? "Basic Plan"
                          : sub.plan
                      }
                      purchaseDate={formatDate(sub.purchaseDate)}
                      expiryDate={formatDate(sub.expiryDate)}
                      onStartLearning={() => handleStartLearning(sub)}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
