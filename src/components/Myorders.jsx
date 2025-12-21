import { useState, useEffect } from "react";
import GradientDiv from "../roles/components/GradientDiv";
import Active_Courses_Card from "./Myorders_Active_Courses_Card";
import Expired_Courses_Card from "./Myorders_Expired_Courses_Card";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchAllSubscriptions,
  processSubscriptions,
} from "../utils/subscriptionUtils";

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

        const allSubscriptions = await fetchAllSubscriptions(profileId);

        // Process and categorize subscriptions
        const { active, expired, cancelled } =
          processSubscriptions(allSubscriptions);

        setActiveSubscriptions(active);
        setExpiredSubscriptions(expired);
        setCancelledSubscriptions(cancelled);

        // Check for recent cancelled subscriptions that might be pending activation
        const recentCancelled = cancelled.filter((sub) => {
          const purchaseDate = new Date(sub.purchaseDate);
          const timeDiff = Date.now() - purchaseDate.getTime();
          const minutesDiff = timeDiff / (1000 * 60);
          return minutesDiff < 10;
        });

        if (recentCancelled.length > 0) {
          // Retry after 5 seconds to check if they got activated
          setTimeout(async () => {
            try {
              const retrySubscriptions = await fetchAllSubscriptions(profileId);
              const retryProcessed = processSubscriptions(retrySubscriptions);
              setActiveSubscriptions(retryProcessed.active);
              setExpiredSubscriptions(retryProcessed.expired);
              setCancelledSubscriptions(retryProcessed.cancelled);
            } catch (retryError) {
            }
          }, 5000);
        }
      } catch (error) {
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
        (activeSub) => activeSub.course.id === subscription.course.id,
      );

      if (isAlreadyActive) {
        toast.info("You are already enrolled in this course!");
        const courseCode =
          subscription.course.courseCode?.[0] ||
          subscription.course.courseCodes?.[0];
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

      toast.info("Enrolling in course... Please wait", {
        autoClose: false,
      });

      // Use direct enrollment API for free courses
      const { enrollCourse } = await import("../api/api");
      await enrollCourse(courseForEnrollment);

      setCancelledSubscriptions((prev) =>
        prev.filter((sub) => sub.id !== subscription.id),
      );

      // Create a new active subscription entry for the re-enrolled course
      const newActiveSubscription = {
        ...subscription,
        status: "ACTIVE",
        plan: "FREE",
        purchaseDate: new Date().toISOString(),
        expiryDate: new Date(
          Date.now() + 365 * 24 * 60 * 60 * 1000,
        ).toISOString(),
      };

      setActiveSubscriptions((prev) => [...prev, newActiveSubscription]);

      // Refresh subscriptions from backend after a short delay to ensure backend has processed
      setTimeout(async () => {
        try {
          const response = await getSubscriptions(profileId, "ALL");

          if (response?.content) {
            const newActive = response.content.filter(
              (sub) => sub.status === "ACTIVE",
            );
            const newExpired = response.content.filter(
              (sub) => sub.status === "EXPIRED",
            );
            const newCancelled = response.content.filter(
              (sub) => sub.status === "CANCELLED",
            );

            setActiveSubscriptions(newActive);
            setExpiredSubscriptions(newExpired);
            setCancelledSubscriptions(newCancelled);
          }
        } catch (refreshError) {
        }
      }, 1000);

      toast.dismiss();
      toast.success("Successfully enrolled in course!");

      const courseCode =
        subscription.course.courseCode?.[0] ||
        subscription.course.courseCodes?.[0];

      if (courseCode) {
        navigate(`/book-dashboard?subcode=${courseCode}`);
      } else {
        toast.success("Enrollment successful! Redirecting to your subjects...");
        setTimeout(() => {
          navigate("/my-subjects");
        }, 1500);
      }
    } catch (error) {
      toast.dismiss();

      if (error.response?.status === 401) {
        toast.error("Authentication expired. Please login again.");
      } else if (error.response?.status === 400) {
        toast.error(
          error.response?.data?.message || "Invalid request. Please try again.",
        );
      } else if (error.response?.status === 404) {
        toast.error("Course not found. Please refresh and try again.");
      } else if (error.response?.status === 409) {
        toast.info("You are already enrolled in this course!");

        setCancelledSubscriptions((prev) =>
          prev.filter((sub) => sub.id !== subscription.id),
        );

        const courseCode =
          subscription.course.courseCode?.[0] ||
          subscription.course.courseCodes?.[0];
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

      // Call API to cancel subscription
      const { cancelSubscription } = await import("../api/api");
      const reason = "User requested cancellation";

      await cancelSubscription(reason, profileId, subscription.id);

      setActiveSubscriptions((prev) =>
        prev.filter((sub) => sub.id !== subscription.id),
      );
      setCancelledSubscriptions((prev) => [
        ...prev,
        { ...subscription, status: "CANCELLED" },
      ]);

      toast.success("Subscription cancelled successfully");
    } catch (error) {
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
                    courseName={sub.course?.name || "Unknown Course"}
                    credits={sub.course?.courseCode?.[0] || "N/A"}
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
                    branchName={sub.course?.branchNames?.[0] || "CSE"}
                    universityName={sub.course?.universityName?.[0] || "AKTU"}
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
