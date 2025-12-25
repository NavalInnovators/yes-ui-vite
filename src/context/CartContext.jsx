import { createContext, useContext, useState, useEffect } from "react";
import {
  trackCartEvent,
  cancelPopupAbandonment,
  clearPopupTimersForCartItems,
  getISTISOString,
} from "../utils/analytics";
import {
  getCart,
  addToCart as addToCartAPI,
  removeFromCart as removeFromCartAPI,
  clearCart as clearCartAPI,
  getSubscriptions,
} from "../api/api";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);

  // Helper function to get all courses from storage
  const getAllCourses = () => {
    try {
      const coursesFromSession = sessionStorage.getItem("allCourses");
      const coursesFromLocal = localStorage.getItem("allCourses");
      return JSON.parse(coursesFromSession || coursesFromLocal || "[]");
    } catch {
      return [];
    }
  };

  // Helper function to find courseId by course name
  const getCourseIdByName = (courseName) => {
    const allCourses = getAllCourses();
    const matchingCourse = allCourses.find((c) => c.name === courseName);
    return matchingCourse ? matchingCourse.id : null;
  };

  // Helper function to transform API cart response
  const transformCartItem = (item) => {
    const allCourses = getAllCourses();
    const matchingCourse = allCourses.find((c) => c.name === item.courseName);
    const actualCourseId = matchingCourse ? matchingCourse.id : null;

    return {
      cartId: item.cartId,
      id: item.cartId,
      courseId: actualCourseId,
      name: item.courseName,
      courseCodes: matchingCourse?.courseCodes || [],
      universityName: matchingCourse?.universityName || item.universityName || "",
      year: matchingCourse?.year || item.year || "",
      branchNames: matchingCourse?.branchNames || item.branchNames || [],
      plan: item.planName,
      price: item.amount / 100, // Convert paise to rupees
      addedAt: item.addedAt || getISTISOString(),
      isUpgrade: item.isUpgrade || false,
    };
  };

  // Load cart from API on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const profileId = localStorage.getItem("profileId");
        if (!profileId) {
          setIsLoadingCart(false);
          return;
        }

        // Clear old localStorage cart data (migration to API)
        localStorage.removeItem("cart");
        localStorage.removeItem("courseIdMap"); // Clean up old mapping approach

        const response = await getCart(profileId);
        console.log("Cart loaded from API:", response);

        if (response && Array.isArray(response)) {
          const transformedCart = response.map((item) =>
            transformCartItem(item),
          );
          setCart(transformedCart);
          console.log("Transformed cart:", transformedCart);
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setIsLoadingCart(false);
      }
    };

    loadCart();

    // Load subscriptions from API
    const loadSubscriptions = async () => {
      try {
        const profileId = localStorage.getItem("profileId");
        const token = localStorage.getItem("token");

        if (!profileId || !token) return;

        const response = await getSubscriptions(profileId, "ACTIVE");

        if (response && response.content && Array.isArray(response.content)) {
          setSubscriptions(response.content);
          // Store subscriptions in localStorage for API access
          localStorage.setItem('userSubscriptions', JSON.stringify(response.content));
        }
      } catch (error) {
        console.error("Failed to load subscriptions:", error);
      }
    };

    loadSubscriptions();

    // Load orders from localStorage (keeping this for now)
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = async (course, plan, options = {}) => {
    const { source = "unknown", metadata = {} } = options;

    try {
      const profileId = localStorage.getItem("profileId");
      const token = localStorage.getItem("token");

      if (!profileId) {
        toast.error("Please login to add items to cart");
        return;
      }

      const planId = plan;

      await addToCartAPI(profileId, planId, course.id);

      console.log("Add to cart successful");

      // Reload cart from API to get updated state
      const updatedCart = await getCart(profileId);
      if (updatedCart && Array.isArray(updatedCart)) {
        const transformedCart = updatedCart.map((item) =>
          transformCartItem(item),
        );
        setCart(transformedCart);
      }

      // Track analytics
      trackCartEvent({
        action: "added",
        source,
        courseId: course.id,
        courseName: course.name,
        plan: plan,
        price: plan === "BASIC" ? 110 : 150,
        subjectCode: course.courseCodes?.[0] || null,
        timestamp: getISTISOString(),
        requiredPlan: metadata?.required_plan || null,
      });

      // Show success notification
      toast.success(`${course.name} (${plan}) added to cart!`);
    } catch (error) {
      console.group("❌ Add to Cart Failed");
      console.error("Error:", error.message);
      console.error("Full error:", error);
      if (error.response) {
        console.error("Response status:", error.response?.status);
        console.error("Response data:", error.response?.data);
      }
      console.groupEnd();
      toast.error(error.message || "Failed to add item to cart");
    }
  };

  const removeFromCart = async (id, options = {}) => {
    const { source = "cart", metadata = {} } = options;

    try {
      const removedItem = cart.find((item) => item.id === id);

      if (removedItem) {
        await removeFromCartAPI(id);

        // Update local state
        setCart((prev) => prev.filter((item) => item.id !== id));

        // Track analytics
        trackCartEvent({
          action: "removed",
          source,
          courseId: removedItem.courseId,
          courseName: removedItem.name,
          plan: removedItem.plan,
          price: removedItem.price,
          subjectCode: removedItem.courseCodes?.[0] || null,
          timestamp: getISTISOString(),
          requiredPlan: metadata?.required_plan || null,
        });
        cancelPopupAbandonment(removedItem.courseId);
      }
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      toast.error(error.message || "Failed to remove item from cart");
    }
  };

  const updateCartItem = (id, updates) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const clearCart = async () => {
    try {
      const profileId = localStorage.getItem("profileId");
      if (!profileId) {
        return;
      }

      await clearCartAPI(profileId);

      clearPopupTimersForCartItems(cart);
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error(error.message || "Failed to clear cart");
    }
  };

  const checkout = () => {
    clearPopupTimersForCartItems(cart);
    // Move cart items to orders
    const newOrders = cart.map((item) => ({
      ...item,
      id: `order-${Date.now()}-${Math.random()}`,
      purchaseDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      expiryDate: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: "active",
    }));

    // Check for duplicate courses and replace them
    setOrders((prev) => {
      let updatedOrders = [...prev];

      newOrders.forEach((newOrder) => {
        const existingOrderIndex = updatedOrders.findIndex(
          (existingOrder) =>
            existingOrder.name === newOrder.name &&
            existingOrder.courseId === newOrder.courseId,
        );

        if (existingOrderIndex !== -1) {
          console.log(`Replacing existing order for course: ${newOrder.name}`);
          updatedOrders[existingOrderIndex] = newOrder;
        } else {
          updatedOrders.push(newOrder);
        }
      });

      return updatedOrders;
    });

    setCart([]);
  };

  const upgradeToPro = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, plan: "Pro", price: 150 } : order,
      ),
    );
  };

  const addUpgradeToCart = (order) => {
    const upgradePrice = 150 - 110;
    const upgradeItem = {
      id: `upgrade-${order.id}`,
      courseId: order.courseId,
      name: order.name,
      courseCodes: order.courseCodes,
      universityName: order.universityName,
      year: order.year,
      branchNames: order.branchNames,
      plan: "Pro",
      price: upgradePrice,
      originalOrderId: order.id,
      isUpgrade: true,
      addedAt: getISTISOString(),
    };

    setCart((prev) => [...prev, upgradeItem]);

    trackCartEvent({
      action: "added",
      source: "upgrade_prompt",
      courseId: upgradeItem.courseId,
      courseName: upgradeItem.name,
      plan: upgradeItem.plan,
      price: upgradeItem.price,
      subjectCode: upgradeItem.courseCodes?.[0] || null,
      timestamp: upgradeItem.addedAt,
      requiredPlan: null,
    });
  };

  const getUserPlanForCourse = (courseId) => {
    // Checking API subscriptions
    const apiSubscription = subscriptions.find(
      (sub) =>
        sub.course?.id === courseId &&
        sub.status === "ACTIVE",
    );

    if (apiSubscription) {
      return apiSubscription.plan; // Returns "FREE", "BASIC", or "PRO"
    }

    return "Free";
  };

  const checkFeatureAccess = (courseId, feature, unitNumber = null) => {
    const userPlan = getUserPlanForCourse(courseId);

    const featureAccess = {
      Syllabus: { Free: true, Basic: true, Pro: true },
      "Q&A": { Free: true, Basic: true, Pro: true },
      Notes: { Free: "limited", Basic: "full", Pro: "full" },
      Insights: { Free: "limited", Basic: "full", Pro: "full" },
      Summariser: {
        Free: "limited",
        Basic: "unlimited",
        Pro: "unlimited",
      },
      Rephraser: {
        Free: "limited",
        Basic: "unlimited",
        Pro: "unlimited",
      },
      Roadmap: { Free: false, Basic: false, Pro: true },
      "AI Chatbot": { Free: false, Basic: false, Pro: true },
    };

    if ((feature === "Notes" || feature === "Insights") && unitNumber) {
      if (userPlan === "Free" && unitNumber > 1) {
        return false;
      }
      if (userPlan === "Free" && unitNumber === 1) {
        return "limited";
      }
    }

    const access = featureAccess[feature]
      ? featureAccess[feature][userPlan]
      : false;
    return access;
  };

  const getRequiredPlanForFeature = (feature) => {
    const featureRequirements = {
      Syllabus: "Free",
      "Q&A": "Free",
      Notes: "Basic",
      Insights: "Basic",
      Summariser: "Basic",
      Rephraser: "Basic",
      Roadmap: "Pro",
      "AI Chatbot": "Pro",
    };
    return featureRequirements[feature] || "Free";
  };

  const getLifetimeUsage = (feature) => {
    const usageKey = `lifetime_${feature.toLowerCase()}_usage`;
    return parseInt(localStorage.getItem(usageKey) || "0");
  };

  const incrementLifetimeUsage = (feature) => {
    const usageKey = `lifetime_${feature.toLowerCase()}_usage`;
    const currentUsage = getLifetimeUsage(feature);
    localStorage.setItem(usageKey, (currentUsage + 1).toString());
  };

  const checkLifetimeLimit = (feature) => {
    const userPlan = getUserPlanForCourse("global");
    const currentUsage = getLifetimeUsage(feature);
    const limit = 50;

    if (userPlan === "Free" && currentUsage >= limit) {
      return false;
    }
    return true;
  };

  const getRemainingUsage = (feature) => {
    const userPlan = getUserPlanForCourse("global");
    const currentUsage = getLifetimeUsage(feature);
    const limit = 50;

    if (userPlan === "Free") {
      return Math.max(0, limit - currentUsage);
    }
    return "unlimited";
  };

  const getSuggestedCourses = (cartItems) => {
    let allCourses = JSON.parse(sessionStorage.getItem("allCourses") || "[]");

    if (!allCourses || allCourses.length === 0) {
      allCourses = JSON.parse(localStorage.getItem("allCourses") || "[]");
    }

    if (!allCourses || allCourses.length === 0) {
      return [];
    }

    const cartYears = [...new Set(cartItems.map((item) => item.year))];

    if (cartYears.length === 0) {
      return [];
    }

    const sameYearCourses = allCourses.filter(
      (course) => {
        const isSameYear = cartYears.includes(course.year);
        
        const isInCart = cartItems.some((cartItem) => cartItem.courseId === course.id);
        
        const hasActiveSubscription = subscriptions.some(
          (sub) => sub.course?.id === course.id && sub.status === "ACTIVE"
        );
        
        return isSameYear && !isInCart && !hasActiveSubscription;
      }
    );

    const prioritizedCourses = [
      ...sameYearCourses.map((course) => ({
        id: course.id,
        title: course.name,
        subjectCode: course.courseCodes[0],
        dept: course.branchNames[0],
        year: course.year,
        universityName: course.universityName,
        branchNames: course.branchNames,
        courseCodes: course.courseCodes,
        hasBasic: false,
        isUpgrade: false,
      })),
    ];

    return prioritizedCourses;
  };

  // Function to reload subscriptions (after payment)
  const reloadSubscriptions = async () => {
    try {
      const profileId = localStorage.getItem("profileId");
      const token = localStorage.getItem("token");

      if (!profileId || !token) return;

      // Fetch ALL subscriptions to see the complete picture
      const response = await getSubscriptions(profileId, "ALL");
      
      console.log("Reloaded subscriptions after payment:", response);

      if (response && response.content && Array.isArray(response.content)) {
        // Store all subscriptions for debugging
        const allSubs = response.content;
        const activeSubs = allSubs.filter(sub => sub.status === 'ACTIVE');
        
        setSubscriptions(activeSubs);
        // Store active subscriptions in localStorage for API access
        localStorage.setItem('userSubscriptions', JSON.stringify(activeSubs));
      }
    } catch (error) {
      console.error("Failed to reload subscriptions:", error);
    }
  };

  const value = {
    cart,
    orders,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    checkout,
    upgradeToPro,
    addUpgradeToCart,
    getSuggestedCourses,
    setCart,
    getUserPlanForCourse,
    checkFeatureAccess,
    getRequiredPlanForFeature,
    getLifetimeUsage,
    incrementLifetimeUsage,
    checkLifetimeLimit,
    getRemainingUsage,
    isLoadingCart,
    reloadSubscriptions,
    subscriptions,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
