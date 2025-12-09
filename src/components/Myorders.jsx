import React, { useState, useEffect } from "react";
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
  const [filter, setFilter] = useState("ALL"); // ALL, ACTIVE, EXPIRED, CANCELLED

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
      // Convert subscription to course format
      const courseForEnrollment = {
        id: subscription.course.id,
        name: subscription.course.name,
        courseCodes: subscription.course.courseCode || [],
        universityName: subscription.course.universityName?.[0] || "",
        branchNames: subscription.course.branchNames || [],
        year: subscription.course.year || "",
      };

      toast.info("Enrolling in FREE course...");

      // Add FREE plan to cart via API
      await addToCart(courseForEnrollment, "FREE", {
        source: "re_enroll_cancelled",
      });

      // Remove from cancelled list (frontend only - backend should handle this)
      setCancelledSubscriptions((prev) =>
        prev.filter((sub) => sub.id !== subscription.id),
      );

      toast.success("Successfully enrolled in FREE course!");

      // Optionally navigate to the course
      if (subscription.course.courseCode?.[0]) {
        navigate(
          `/book-dashboard?subcode=${subscription.course.courseCode[0]}`,
        );
      }
    } catch (error) {
      console.error("Failed to enroll:", error);
      toast.error("Failed to enroll in course");
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
