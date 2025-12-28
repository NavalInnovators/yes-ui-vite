import tokenStorage from "../utils/tokenStorage";
import { useState, useEffect } from "react";
import GradientDiv from "../roles/components/GradientDiv";
import Active_Courses_Card from "./Myorders_Active_Courses_Card";
import Expired_Courses_Card from "./Myorders_Expired_Courses_Card";
import { OrdersSkeleton } from "./SkeletonCard";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NoData } from "./EmptyStates";
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
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [subToCancel, setSubToCancel] = useState(null);
  const [showAllCancelled, setShowAllCancelled] = useState(false);
  const [showAllExpired, setShowAllExpired] = useState(false);

  // Fetch subscriptions from API
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const profileId = tokenStorage.getProfileId();
        if (!profileId) {
          toast.error("Please login to view orders");
          navigate("/login");
          return;
        }

        setIsLoading(true);

        const allSubscriptions = await fetchAllSubscriptions(profileId);

        // Ensure allCourses is loaded for metadata enhancement
        if (!localStorage.getItem("allCourses")) {
          const { getAllCourses } = await import("../api/api");
          const allCoursesResponse = await getAllCourses();
          if (allCoursesResponse?.content) {
            localStorage.setItem("allCourses", JSON.stringify(allCoursesResponse.content));
          }
        }

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

  const handleUpgrade = async (subscription, plan) => {
    try {
      const courseForCart = {
        id: subscription.course.id,
        name: subscription.course.name,
        courseCodes: subscription.course.courseCode || [],
        universityName: subscription.course.universityName?.[0] || "",
        branchNames: subscription.course.branchNames || [],
        year: subscription.course.year || "",
      };

      toast.info(`Adding ${plan} plan to cart...`);

      await addToCart(courseForCart, plan, {
        source: "upgrade_from_orders",
      });

      navigate("/mycart");
    } catch (error) {
      toast.error(`Failed to add ${plan} plan to cart`);
    }
  };



  const handleCancelSubscription = (subscription) => {
    setSubToCancel(subscription);
    setShowCancelModal(true);
  };

  const confirmCancellation = async () => {
    if (!subToCancel) return;

    try {
      const profileId = tokenStorage.getProfileId();
      const { cancelSubscription } = await import("../api/api");
      const reason = "User requested cancellation";

      await cancelSubscription(reason, profileId, subToCancel.id);

      setActiveSubscriptions((prev) =>
        prev.filter((sub) => sub.id !== subToCancel.id),
      );
      setCancelledSubscriptions((prev) => [
        ...prev,
        { ...subToCancel, status: "CANCELLED" },
      ]);

      toast.success("Subscription cancelled successfully");
    } catch (error) {
      toast.error(error.message || "Failed to cancel subscription");
    } finally {
      setShowCancelModal(false);
      setSubToCancel(null);
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
          <OrdersSkeleton />
        ) : activeSubscriptions.length === 0 && expiredSubscriptions.length === 0 && cancelledSubscriptions.length === 0 ? (
          <NoData 
            title="No Orders Found"
            message="You haven't purchased any courses yet. Browse our courses to get started!"
            className="py-16"
            buttonText="Browse Courses"
            onButtonClick={() => navigate('/all-subjects')}
          />
        ) : (
          <>
            {/* Active Courses */}
            <h1 className="text-2xl font-semibold mb-6">
              Active Courses ({activeSubscriptions.length})
            </h1>
            {activeSubscriptions.length === 0 ? (
              <NoData 
                title="No Active Courses"
                message="No active courses. Browse courses to get started!"
                className="py-8"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeSubscriptions.map((sub) => (
                  <Active_Courses_Card
                    key={sub.id}
                    courseName={sub.course?.name || "Unknown Course"}
                    courseCode={sub.course?.courseCode?.[0] || "N/A"}
                    planType={sub.plan}
                    purchaseDate={formatDate(sub.purchaseDate)}
                    expiryDate={formatDate(sub.expiryDate)}
                    branchNames={sub.course?.branchNames || []}
                    universityName={sub.course?.universityName?.[0] || "AKTU"}
                    onUpgradeBasic={
                      sub.plan === "FREE"
                        ? () => handleUpgrade(sub, "BASIC")
                        : null
                    }
                    onUpgradePro={
                      sub.plan === "FREE" || sub.plan === "BASIC"
                        ? () => handleUpgrade(sub, "PRO")
                        : null
                    }
                    onCancel={() => handleCancelSubscription(sub)}
                  />
                ))}
              </div>
            )}

            {/* Expired Courses */}
            {expiredSubscriptions.length > 0 && (
              <>
                <h1 className="text-2xl font-semibold py-8">
                  Expired Courses ({expiredSubscriptions.length})
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {(showAllExpired ? expiredSubscriptions : expiredSubscriptions.slice(0, 3)).map((sub) => (
                    <Expired_Courses_Card
                      key={sub.id}
                      courseName={sub.course.name}
                      courseCode={sub.course.courseCode?.[0] || "N/A"}
                      planType={sub.plan}
                      purchaseDate={formatDate(sub.purchaseDate)}
                      expiryDate={formatDate(sub.expiryDate)}
                      isCancelled={false}
                      universityName={sub.course?.universityName?.[0]}
                      branchNames={sub.course?.branchNames || []}
                    />
                  ))}
                </div>
                {expiredSubscriptions.length > 3 && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setShowAllExpired(!showAllExpired)}
                      className="px-6 py-3 bg-zinc-900 hover:bg-zinc-950 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-95"
                    >
                      {showAllExpired 
                        ? "Show Less" 
                        : `Show More (${expiredSubscriptions.length - 3} more)`
                      }
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Cancelled Courses */}
            {cancelledSubscriptions.length > 0 && (
              <>
                <h1 className="text-2xl font-semibold py-8">
                  Cancelled Courses ({cancelledSubscriptions.length})
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(showAllCancelled ? cancelledSubscriptions : cancelledSubscriptions.slice(0, 3)).map((sub) => (
                    <Expired_Courses_Card
                      key={sub.id}
                      courseName={sub.course.name}
                      courseCode={sub.course.courseCode?.[0] || "N/A"}
                      planType={sub.plan}
                      purchaseDate={formatDate(sub.purchaseDate)}
                      expiryDate={formatDate(sub.expiryDate)}
                      isCancelled={true}
                      universityName={sub.course?.universityName?.[0]}
                      branchNames={sub.course?.branchNames || []}
                    />
                  ))}
                </div>
                {cancelledSubscriptions.length > 3 && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setShowAllCancelled(!showAllCancelled)}
                      className="px-6 py-3 bg-zinc-900 hover:bg-zinc-950 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer active:scale-95"
                    >
                      {showAllCancelled 
                        ? "Show Less" 
                        : `Show More (${cancelledSubscriptions.length - 3} more)`
                      }
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Cancellation Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
                Wait, Are you sure?
              </h3>
              <div className="flex flex-col gap-2 mb-8">
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  You're about to cancel your access to:
                </p>
                <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <span className="text-sm font-bold text-gray-900 italic">
                    {subToCancel?.course?.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={confirmCancellation}
                  className="w-full py-3 bg-gray-50 hover:bg-zinc-100 text-gray-700 border border-gray-300 rounded-xl font-bold transition-all active:scale-95 cursor-pointer"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setSubToCancel(null);
                  }}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-red-200 cursor-pointer"
                >
                  Keep Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
