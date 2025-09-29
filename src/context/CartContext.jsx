import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load cart and orders from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedOrders = localStorage.getItem('orders');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (course, plan) => {
    const cartItem = {
      id: `${course.id}-${plan}`,
      courseId: course.id,
      name: course.name,
      courseCodes: course.courseCodes,
      universityName: course.universityName,
      year: course.year,
      branchNames: course.branchNames,
      plan: plan,
      price: plan === 'Basic' ? 110 : 150,
      addedAt: new Date().toISOString()
    };

    setCart(prev => {
      // Check if course already exists in cart (regardless of plan)
      const existingCourseIndex = prev.findIndex(item => item.courseId === course.id);
      
      if (existingCourseIndex !== -1) {
        // Update existing course with new plan
        const updatedCart = [...prev];
        updatedCart[existingCourseIndex] = cartItem;
        return updatedCart;
      }
      
      // Add new course to cart
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartItem = (id, updates) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = () => {
    // Move cart items to orders
    const newOrders = cart.map(item => ({
      ...item,
      id: `order-${Date.now()}-${Math.random()}`,
      purchaseDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      status: 'active'
    }));

    // Check for duplicate courses and replace them
    setOrders(prev => {
      let updatedOrders = [...prev];
      
      newOrders.forEach(newOrder => {
        // Find existing orders with the same course name and courseId
        const existingOrderIndex = updatedOrders.findIndex(existingOrder => 
          existingOrder.name === newOrder.name && 
          existingOrder.courseId === newOrder.courseId
        );
        
        if (existingOrderIndex !== -1) {
          // Replace the existing order with the new one
          console.log(`Replacing existing order for course: ${newOrder.name}`);
          updatedOrders[existingOrderIndex] = newOrder;
        } else {
          // Add new order if no duplicate found
          updatedOrders.push(newOrder);
        }
      });
      
      return updatedOrders;
    });
    
    setCart([]);
  };

  const upgradeToPro = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, plan: 'Pro', price: 150 }
        : order
    ));
  };

  const addUpgradeToCart = (order) => {
    const upgradePrice = 150 - 110; // Pro price - Basic price
    const upgradeItem = {
      id: `upgrade-${order.id}`,
      courseId: order.courseId,
      name: order.name,
      courseCodes: order.courseCodes,
      universityName: order.universityName,
      year: order.year,
      branchNames: order.branchNames,
      plan: 'Pro', // This should be Pro plan, not "Upgrade to Pro"
      price: upgradePrice,
      originalOrderId: order.id,
      isUpgrade: true, // Mark this as an upgrade item
      addedAt: new Date().toISOString()
    };

    setCart(prev => [...prev, upgradeItem]);
  };

  // Plan-based feature access utilities
  const getUserPlanForCourse = (courseId) => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const courseOrder = allOrders.find(order => 
      order.courseId === courseId && order.status === 'active'
    );
    return courseOrder ? courseOrder.plan : 'Free';
  };

  const checkFeatureAccess = (courseId, feature, unitNumber = null) => {
    const userPlan = getUserPlanForCourse(courseId);
    
    const featureAccess = {
      'Syllabus': { Free: true, Basic: true, Pro: true },
      'Q&A': { Free: true, Basic: true, Pro: true },
      'Notes': { Free: 'limited', Basic: 'full', Pro: 'full' },
      'Insights': { Free: 'limited', Basic: 'full', Pro: 'full' },
      'Summariser': { Free: 'limited', Basic: 'unlimited', Pro: 'unlimited' },
      'Rephraser': { Free: 'limited', Basic: 'unlimited', Pro: 'unlimited' },
      'Roadmap': { Free: false, Basic: false, Pro: true },
      'AI Chatbot': { Free: false, Basic: false, Pro: true }
    };

    // Handle unit-wise restrictions for Notes and Insights FIRST
    if ((feature === 'Notes' || feature === 'Insights') && unitNumber) {
      if (userPlan === 'Free' && unitNumber > 1) {
        return false; // Free users can only access Unit 1
      }
      // If Free user accessing Unit 1, allow access
      if (userPlan === 'Free' && unitNumber === 1) {
        return 'limited'; // Free users have limited access to Unit 1
      }
    }
    
    // For other features or if no unit restrictions apply
    const access = featureAccess[feature] ? featureAccess[feature][userPlan] : false;
    return access;
  };

  const getRequiredPlanForFeature = (feature) => {
    const featureRequirements = {
      'Syllabus': 'Free',
      'Q&A': 'Free',
      'Notes': 'Basic',
      'Insights': 'Basic', 
      'Summariser': 'Basic',
      'Rephraser': 'Basic',
      'Roadmap': 'Pro',
      'AI Chatbot': 'Pro'
    };
    return featureRequirements[feature] || 'Free';
  };

  // Lifetime usage tracking for Summariser and Rephraser
  const getLifetimeUsage = (feature) => {
    const usageKey = `lifetime_${feature.toLowerCase()}_usage`;
    return parseInt(localStorage.getItem(usageKey) || '0');
  };

  const incrementLifetimeUsage = (feature) => {
    const usageKey = `lifetime_${feature.toLowerCase()}_usage`;
    const currentUsage = getLifetimeUsage(feature);
    localStorage.setItem(usageKey, (currentUsage + 1).toString());
  };

  const checkLifetimeLimit = (feature, courseId = null) => {
    // If courseId is provided, check plan for that specific course
    // Otherwise, check global plan (for backward compatibility)
    const userPlan = courseId ? getUserPlanForCourse(courseId) : getUserPlanForCourse('global');
    const currentUsage = getLifetimeUsage(feature);
    const limit = 50; // Free plan limit
    
    if (userPlan === 'Free' && currentUsage >= limit) {
      return false; // Limit exceeded
    }
    return true; // Within limit or has paid plan
  };

  const getRemainingUsage = (feature, courseId = null) => {
    // If courseId is provided, check plan for that specific course
    // Otherwise, check global plan (for backward compatibility)
    const userPlan = courseId ? getUserPlanForCourse(courseId) : getUserPlanForCourse('global');
    const currentUsage = getLifetimeUsage(feature);
    const limit = 50;
    
    if (userPlan === 'Free') {
      return Math.max(0, limit - currentUsage);
    }
    return 'unlimited';
  };

  const getSuggestedCourses = (cartItems) => {
    // Get all courses from sessionStorage first, then try localStorage as fallback
    let allCourses = JSON.parse(sessionStorage.getItem('allCourses') || '[]');
    
    // If no courses in sessionStorage, try localStorage
    if (!allCourses || allCourses.length === 0) {
      console.log('Debug - No courses in sessionStorage, trying localStorage');
      allCourses = JSON.parse(localStorage.getItem('allCourses') || '[]');
    }
    
    console.log('Debug - allCourses from storage:', allCourses.length);
    console.log('Debug - cartItems:', cartItems);
    
    // If still no courses, return empty array
    if (!allCourses || allCourses.length === 0) {
      console.log('Debug - No courses found in any storage');
      return [];
    }
    
    // Get years from cart items
    const cartYears = [...new Set(cartItems.map(item => item.year))];
    console.log('Debug - cartYears:', cartYears);
    
    // If no cart items, return empty array
    if (cartYears.length === 0) {
      console.log('Debug - No cart years found');
      return [];
    }

    // Get all orders to check for Basic Plan courses that can be upgraded
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    console.log('Debug - allOrders:', allOrders.length);

    // FIRST PRIORITY: Basic Plan courses from My Orders that can be upgraded
    const basicPlanOrders = allOrders.filter(order => 
      order.plan === 'Basic' && 
      cartYears.includes(order.year) &&
      !cartItems.some(cartItem => cartItem.courseId === order.courseId)
    );

    console.log('Debug - basicPlanOrders for upgrade:', basicPlanOrders.length);

    // SECOND PRIORITY: Same year courses (excluding already purchased courses)
    const sameYearCourses = allCourses.filter(course => 
      cartYears.includes(course.year) && 
      !cartItems.some(cartItem => cartItem.courseId === course.id) &&
      !allOrders.some(order => order.courseId === course.id) // Exclude already purchased courses
    );

    console.log('Debug - sameYearCourses:', sameYearCourses.length);

    // Combine and prioritize: First priority courses first, then second priority
    const prioritizedCourses = [
      ...basicPlanOrders.map(order => ({
        id: order.courseId,
        title: order.name,
        subjectCode: order.courseCodes[0],
        dept: order.branchNames[0] || 'CSE',
        year: order.year,
        universityName: order.universityName,
        branchNames: order.branchNames,
        courseCodes: order.courseCodes,
        hasBasic: true, // This is a Basic plan that can be upgraded
        isUpgrade: true, // Mark as upgrade course
        originalOrderId: order.id,
        upgradePrice: 150 - 110 // Pro - Basic price
      })),
      ...sameYearCourses.map(course => ({
        id: course.id,
        title: course.name,
        subjectCode: course.courseCodes[0],
        dept: course.branchNames[0] || 'CSE',
        year: course.year,
        universityName: course.universityName,
        branchNames: course.branchNames,
        courseCodes: course.courseCodes,
        hasBasic: false,
        isUpgrade: false
      }))
    ];

    console.log('Debug - prioritized courses total:', prioritizedCourses.length);
    console.log('Debug - upgrade courses:', prioritizedCourses.filter(c => c.isUpgrade).length);
    console.log('Debug - regular courses:', prioritizedCourses.filter(c => !c.isUpgrade).length);

    return prioritizedCourses;
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
    getRemainingUsage
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
