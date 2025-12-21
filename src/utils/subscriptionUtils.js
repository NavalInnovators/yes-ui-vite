// Utility functions for managing user subscriptions

export const fetchAllSubscriptions = async (profileId) => {
  const { getSubscriptions } = await import('../api/api');
  const response = await getSubscriptions(profileId, "ALL", {
    page: 0,
    size: 1000,
  });

  return response?.content || [];
};

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

    // FIlter active subscriptions
    const allSubscriptions = await fetchAllSubscriptions(profileId);
    const activeSubscriptions = allSubscriptions.filter(sub => sub.status === 'ACTIVE');
    
    // Store active subscriptions in localStorage
    localStorage.setItem('userSubscriptions', JSON.stringify(activeSubscriptions));
    return activeSubscriptions;
  } catch (error) {
    console.error('Failed to ensure subscriptions are loaded:', error);
    return [];
  }
};

// Clear subscriptions from localStorage
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


export const enhanceSubscription = (sub) => {
  if (sub.course.courseCode && sub.course.courseCode.length > 0) {
    return sub;
  }

  // find matching course in localStorage to get course codes
  const allCourses = JSON.parse(localStorage.getItem("allCourses") || "[]");
  const myCourses = JSON.parse(localStorage.getItem("myCourses") || "[]");

  const matchingCourse =
    allCourses.find((course) => course.id === sub.course.id) ||
    myCourses.find((course) => course.id === sub.course.id);

  if (matchingCourse?.courseCodes?.length > 0) {
    return {
      ...sub,
      course: {
        ...sub.course,
        courseCode: matchingCourse.courseCodes,
        universityName: matchingCourse.universityName
          ? [matchingCourse.universityName]
          : sub.course.universityName,
        branchNames: matchingCourse.branchNames || sub.course.branchNames,
      },
    };
  }

  return sub;
};

// Helper function to process and categorize subscriptions
export const processSubscriptions = (subscriptions) => {
  const enhanced = subscriptions.map(enhanceSubscription);
  
  const valid = enhanced.filter((sub) => 
    sub?.course?.name && 
    sub?.course?.courseCode && 
    sub.course.courseCode.length > 0
  );

  return {
    active: valid.filter((sub) => sub.status === "ACTIVE"),
    expired: valid.filter((sub) => sub.status === "EXPIRED"),
    cancelled: valid.filter((sub) => sub.status === "CANCELLED"),
  };
};