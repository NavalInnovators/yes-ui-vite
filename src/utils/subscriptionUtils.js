// Utility functions for managing user subscriptions

// Ensure subscriptions are loaded in localStorage
export const ensureSubscriptionsLoaded = async () => {
  try {
    // Check if subscriptions are already loaded
    const existingSubscriptions = localStorage.getItem('userSubscriptions');
    if (existingSubscriptions && JSON.parse(existingSubscriptions).length > 0) {
      return JSON.parse(existingSubscriptions);
    }

    // If not loaded, fetch them
    const profileId = localStorage.getItem("profileId");
    const token = localStorage.getItem("token");
    
    if (!profileId || !token) {
      console.warn('Cannot load subscriptions: missing profileId or token');
      return [];
    }

    // Dynamic import to avoid circular dependency
    const { getSubscriptions } = await import('../api/api');
    const response = await getSubscriptions(profileId, "ACTIVE");
    
    if (response && response.content && Array.isArray(response.content)) {
      // Store subscriptions in localStorage
      localStorage.setItem('userSubscriptions', JSON.stringify(response.content));
      return response.content;
    }
    
    return [];
  } catch (error) {
    console.error('Failed to ensure subscriptions are loaded:', error);
    return [];
  }
};

// Clear subscriptions from localStorage (useful for logout)
export const clearSubscriptions = () => {
  localStorage.removeItem('userSubscriptions');
};

// Get user's plan for a specific course
export const getUserPlanForCourse = (courseCode) => {
  try {
    const subscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
    
    if (subscriptions.length === 0) {
      return 'FREE';
    }

    // Find course from stored data
    const allCourses = [
      ...JSON.parse(sessionStorage.getItem("allCourses") || "[]"),
      ...JSON.parse(localStorage.getItem("allCourses") || "[]"),
      ...JSON.parse(localStorage.getItem("myCourses") || "[]"),
    ];
    
    const normalizedCourseCode = courseCode?.toLowerCase().trim();
    const course = allCourses.find(course => 
      Array.isArray(course?.courseCodes) &&
      course.courseCodes.some(code => 
        code.toLowerCase().trim() === normalizedCourseCode
      )
    );
    
    if (course) {
      const currentSubscription = subscriptions.find(sub => 
        sub.course?.name === course.name && sub.status === 'ACTIVE'
      );
      if (currentSubscription) {
        return currentSubscription.plan;
      }
    }
    
    return 'FREE';
  } catch (error) {
    console.error('Error getting user plan for course:', error);
    return 'FREE';
  }
};