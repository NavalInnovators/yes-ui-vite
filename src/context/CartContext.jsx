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
      const exists = prev.find(item => item.id === cartItem.id);
      if (exists) {
        // Update existing item
        return prev.map(item => 
          item.id === cartItem.id ? cartItem : item
        );
      }
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

    setOrders(prev => [...prev, ...newOrders]);
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
      addedAt: new Date().toISOString()
    };

    setCart(prev => [...prev, upgradeItem]);
  };

  const getSuggestedCourses = (cartItems) => {
    // Get all courses from sessionStorage
    const allCourses = JSON.parse(sessionStorage.getItem('allCourses') || '[]');
    
    // Get years from cart items
    const cartYears = [...new Set(cartItems.map(item => item.year))];
    
    // Filter courses by year and exclude already in cart
    const suggested = allCourses.filter(course => 
      cartYears.includes(course.year) && 
      !cartItems.some(cartItem => cartItem.courseId === course.id)
    );

    return suggested.map(course => ({
      id: course.id,
      title: course.name,
      subjectCode: course.courseCodes[0],
      dept: course.branchNames[0] || 'CSE',
      year: course.year,
      universityName: course.universityName,
      branchNames: course.branchNames,
      courseCodes: course.courseCodes,
      hasBasic: false // This would be determined by checking if user has basic access
    }));
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
    getSuggestedCourses
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
