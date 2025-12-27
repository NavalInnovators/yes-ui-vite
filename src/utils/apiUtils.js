// Generate required headers for protected APIs
export const generateProtectedHeaders = async (profileId, courseCode, unitNo, planId, featureId) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const token = localStorage.getItem("token");
  
  // Ensure all values are strings and not null/undefined
  const pid = profileId;
  const code = courseCode;
  const unit = unitNo;
  const feature = featureId;
  
  const message = `${pid}${code}${unit}${feature}${timestamp}`; 
  const signature = await hmacSHA256(token, message);
  
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Profile-Id': pid,
    'X-Course-Code': code,
    'X-Unit-No': unit,
    'X-Plan-Id': planId,
    'X-Feature-Id': feature,
    'X-Timestamp': timestamp.toString(),
    'X-Signature': signature
  };
};

// Generate headers with automatic context resolution
export const generateProtectedHeadersWithContext = async (featureId, overrideCourseCode = null) => {
  const context = await getUserContextAsync(overrideCourseCode);
  return generateProtectedHeaders(
    context.profileId,
    context.courseCode,
    context.unitNo,
    context.planId,
    featureId
  );
};

// HMAC SHA-256 function
async function hmacSHA256(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

// Get user context data from localStorage (synchronous)
export const getUserContext = (overrideCourseCode = null) => {
  const profileId = localStorage.getItem("profileId");
  let courseCode = overrideCourseCode || sessionStorage.getItem('selectedCourseCode');
  const unitNo = sessionStorage.getItem('selectedUnit') || '1';
  
  // Normalize courseCode to lowercase and clean any whitespace
  if (courseCode) {
    courseCode = courseCode.toLowerCase().trim();
  }
  
  // Get planId from user's subscription for the current course
  let planId = 'FREE'; 
  try {
    const subscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
    
    if (subscriptions.length > 0) {
      // Try to find course from stored data dynamically
      const allCourses = [
        ...JSON.parse(sessionStorage.getItem("allCourses") || "[]"),
        ...JSON.parse(localStorage.getItem("allCourses") || "[]"),
        ...JSON.parse(localStorage.getItem("myCourses") || "[]"),
      ];
      
      const course = allCourses.find(course => 
        Array.isArray(course?.courseCodes) &&
        course.courseCodes.some(code => 
          code.toLowerCase().trim() === courseCode
        )
      );
      
      if (course) {
        const currentSubscription = subscriptions.find(sub => 
          sub.course?.name === course.name && sub.status === 'ACTIVE'
        );
        if (currentSubscription) {
          planId = currentSubscription.plan;
        }
      }
    }
  } catch (error) {
    console.error('Error getting user subscription:', error);
  }
  
  return {
    profileId,
    courseCode,
    unitNo,
    planId,
  };
};

// Async version that can fetch subscriptions if not available
export const getUserContextAsync = async (overrideCourseCode = null) => {
  const profileId = localStorage.getItem("profileId");
  let courseCode = overrideCourseCode || sessionStorage.getItem('selectedCourseCode');
  const unitNo = sessionStorage.getItem('selectedUnit') || '1';
  
  // Normalize courseCode to lowercase and clean any whitespace
  if (courseCode) {
    courseCode = courseCode.toLowerCase().trim();
  }
  
  // Get planId from user's subscription for the current course
  let planId = 'FREE'; 
  try {
    // Try to get subscriptions from localStorage first
    let subscriptions = JSON.parse(localStorage.getItem('userSubscriptions') || '[]');
    
    // If no subscriptions in localStorage, try to fetch them
    if (subscriptions.length === 0) {
      const token = localStorage.getItem("token");
      if (profileId && token) {
        try {
          // Dynamic import to avoid circular dependency
          const { getSubscriptions } = await import('../api/api');
          const response = await getSubscriptions(profileId, "ACTIVE", {
            page: 0,
            size: 100,
            sort: "purchaseDate,desc"
          });
          
          if (response && response.content && Array.isArray(response.content)) {
            subscriptions = response.content;
            // Store for future use
            localStorage.setItem('userSubscriptions', JSON.stringify(subscriptions));
          }
        } catch (fetchError) {
          console.warn('Could not fetch subscriptions:', fetchError);
        }
      }
    }
    
    // Find course name dynamically from stored course data
    let targetCourseName = null;
    
    // Try to find course from stored data
    const allCourses = [
      ...JSON.parse(sessionStorage.getItem("allCourses") || "[]"),
      ...JSON.parse(localStorage.getItem("allCourses") || "[]"),
      ...JSON.parse(localStorage.getItem("myCourses") || "[]"),
    ];
    
    const course = allCourses.find(course => 
      Array.isArray(course?.courseCodes) &&
      course.courseCodes.some(code => 
        code.toLowerCase().trim() === courseCode
      )
    );
    
    if (course) {
      targetCourseName = course.name;
    }
    
    // If we found a course name, look for matching subscription
    if (targetCourseName && subscriptions.length > 0) {
      const currentSubscription = subscriptions.find(sub => 
        sub.course?.name === targetCourseName && sub.status === 'ACTIVE'
      );
      if (currentSubscription) {
        planId = currentSubscription.plan;
      }
    }
  } catch (error) {
    console.error('Error getting user subscription:', error);
  }
  
  return {
    profileId,
    courseCode,
    unitNo,
    planId,
  };
};