import axios from "axios";
import { BACKEND_URL, AI_URL, DEV_BACKEND_URL } from "../constants/api";
import { track } from "@vercel/analytics/react";
import { generateProtectedHeaders, getUserContext } from "../utils/apiUtils";
import tokenStorage from "../utils/tokenStorage";


const api = axios.create({
  baseURL: DEV_BACKEND_URL, // change to BACKEND_URL for production
  headers: {
    "Content-Type": "application/json",
  },
  maxBodyLength: Infinity,
});

const apiAI = axios.create({
  baseURL: AI_URL,
  headers: {
    "Content-Type": "application/json",
  },
  maxBodyLength: Infinity,
});

export const apiSignUp = async (data) => {
  try {
    const response = await api.post("/api/auth/signup", data);
    // if (response.status === 200) {
    //   track('signup_success');
    // }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateOtp = async ({ otp, email }) => {
  try {
    const response = await api.post("api/auth/otp/validate", {
      otp,
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiLogin = async (data) => {
  try {
    const response = await api.post("/api/auth/login", data);
    if (response.status == 200) {
      track('login_success');
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUniversities = async () => {
  try {
    const response = await api.get("/api/university/all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllColleges = async (universityId) => {
  try {
    const response = await api.get(`/api/college/university/${universityId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBranches = async (collegeId) => {
  try {
    const response = await api.get(`/api/branches/college/${collegeId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const submitVerificationDetails = async (
  profileId,
  verificationData
) => {
  const getToken = tokenStorage.getToken();
  const config = {
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${getToken}`,
    },
  };
  console.log("config", config);

  const response = await api.post(
    `/api/profile/${profileId}/set-details`,
    verificationData,
    config
  );
  return response.data;
};

// POST request for Feedback
export const postFeedback = async (feedbackData) => {
  const profileId = tokenStorage.getProfileId();
  const token = tokenStorage.getToken();
  try {
    const response = await api.post(
      `/api/feedback/submit/${profileId}`,
      feedbackData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to submit feedback."
    );
  }
};

// POST request for Query
export const postQuery = async (queryData) => {
  const token = tokenStorage.getToken();
  try {
    const response = await api.post(`/api/queries/submit`, queryData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("RESPONSE: " + response);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to submit query.");
  }
};

// GET request for Subjects
export const fetchSubjects = async (profileId) => {
  const token = tokenStorage.getToken();
  try {
    const response = await api.get(`/api/profile/${profileId}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("RESPONSE: " + response);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch subjects.",
    );
  }
};

// GET from Query
export const fetchQueries = async () => {
  const profileId = tokenStorage.getProfileId();
  const token = tokenStorage.getToken();
  try {
    const response = await api.get(`/api/queries/profile/${profileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response?.data?.message || "Failed to fetch queries.");
    throw new Error(
      error.response?.data?.message || "Failed to fetch queries."
    );
  }
};

export const getAllCourses = async () => {
  const getToken = tokenStorage.getToken();
  const config = {
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${getToken}`,
    },
  };

  const response = await api.get(`/api/course/all`, config);
  return response.data;
};
export const getMyCourses = async () => {
  const getToken = tokenStorage.getToken();
  const profileId = tokenStorage.getProfileId();
  // const profileId = 101
  const config = {
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${getToken}`,
    },
  };

  const response = await api.get(`/api/profile/${profileId}/courses`, config);
  return response.data;
};

export const getProfile = async () => {
  try {
    const token = tokenStorage.getToken();
    const profileId = tokenStorage.getProfileId();

    const response = await api.get(`/api/profile/${profileId}/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`profile`, response.data);
    // ✅ set avatarUrl into localStorage only the first time
    if (response.data.profile?.avatarUrl && !localStorage.getItem("profileAvatarUrl")) {
      localStorage.setItem("profileAvatarUrl", response.data.profile.avatarUrl);
      // 👇 trigger an event so Navbar can listen
      window.dispatchEvent(new Event("profileUpdated"));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    const token = tokenStorage.getToken();
    const profileId = tokenStorage.getProfileId();

    const response = await api.put(`/api/profile/${profileId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEduData = async () => {
  try {
    const token = tokenStorage.getToken();
    const profileId = tokenStorage.getProfileId();

    const response = await api.get(`/api/profile/${profileId}/education/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`getEduData`, response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEduData = async (data) => {
  try {
    const token = tokenStorage.getToken();
    const profileId = tokenStorage.getProfileId();

    const response = await api.put(
      `/api/profile/${profileId}/education/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`updateEduData`, response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSyllabus = async (subCode) => {
  try {
    const { unitNo } = getUserContext(subCode);
    const token = tokenStorage.getToken();
    const config = {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    };

    // Add unitNo as optional parameter if available
    const unitParam = unitNo ? `&unitNo=${unitNo}` : '';
    const response = await api.get(`/api/getSyllabus?subcode=${subCode}${unitParam}`, config);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export const getQnA = async (subCode) => {
  try {
    const { profileId, unitNo } = getUserContext(subCode);

    if (!profileId) {
      throw new Error('Missing profileId - user not logged in');
    }

    // Get planId specifically for this course
    const { planId } = getUserContext(subCode);

    const headers = await generateProtectedHeaders(profileId, subCode, unitNo, planId, 'QNA');
    const config = { headers };

    // Add unitNo as optional parameter if available
    const unitParam = unitNo ? `&unitNo=${unitNo}` : '';
    const response = await api.get(`/api/getQA?subcode=${subCode}${unitParam}`, config);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export const getUnitNotes = async (subCode) => {
  try {
    const { profileId, courseCode, unitNo, planId } = getUserContext();

    if (!profileId) {
      throw new Error('Missing profileId - user not logged in');
    }

    const actualCourseCode = courseCode || subCode;
    const headers = await generateProtectedHeaders(profileId, actualCourseCode, unitNo, planId, 'NOTES');
    const config = { headers };

    // Add unitNo as optional parameter if available
    const unitParam = unitNo ? `?unitNo=${unitNo}` : '';
    const response = await api.get(`/api/getUnitNotes/${subCode}${unitParam}`, config);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export const getAnalyticData = async (subCode, unitNo) => {
  try {
    const { profileId, unitNo: contextUnitNo, planId } = getUserContext(subCode);

    if (!profileId) {
      throw new Error('Missing profileId - user not logged in');
    }

    // Use provided unitNo parameter, fallback to context unitNo
    const finalUnitNo = unitNo || contextUnitNo;

    const headers = await generateProtectedHeaders(profileId, subCode, finalUnitNo, planId, 'INSIGHTS');
    const config = { headers };

    // Add unitNo as query parameter if available
    const unitParam = finalUnitNo ? `?unitNo=${finalUnitNo}` : '';
    const response = await api.get(`/api/analyticData/${subCode}${unitParam}`, config);

    return response.data.data;
  } catch (error) {
    throw error;
  }
};


export const enrollCourse = async (course) => {
  try {
    const profileId = tokenStorage.getProfileId();
    const courseId = course.id;
    const token = tokenStorage.getToken();

    const endpoint = `/api/profile/${profileId}/course/${courseId}/enroll`;

    const config = {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await api.post(endpoint, {}, config);

    return [response.data, course];
  } catch (error) {
    console.error("Enrollment API Error:", error.response);
    throw error;
  }
}

// APIs of Summrizer and Rephraser
export const summarizeAnswer = async (q_id) => {
  try {
    const { profileId, courseCode, unitNo, planId } = getUserContext();

    if (!profileId) {
      throw new Error('Missing profileId - user not logged in');
    }

    const headers = await generateProtectedHeaders(profileId, courseCode, unitNo, planId, 'SUMMARIZER');
    const config = { headers };

    // Add unitNo as optional parameter if available
    const unitParam = unitNo ? `&unitNo=${unitNo}` : '';
    const response = await api.get(`/api/summarize?q_id=${q_id}${unitParam}`, config);

    // Handle the response format
    const rawData = response.data;
    if (typeof rawData === 'string' && rawData.startsWith("FastAPI Response: ")) {
      const jsonString = rawData.replace("FastAPI Response: ", "");
      const parsed = JSON.parse(jsonString);
      return parsed?.data?.summarized_answer;
    }

    return response.data?.data?.summarized_answer || response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to summarize answer."
    );
  }
};

export const rephraseAnswer = async (q_id, style) => {
  try {
    const { profileId, courseCode, unitNo, planId } = getUserContext();

    if (!profileId) {
      throw new Error('Missing profileId - user not logged in');
    }

    const headers = await generateProtectedHeaders(profileId, courseCode, unitNo, planId, 'REPHRASER');
    const config = { headers };

    // Add unitNo as optional parameter if available
    const unitParam = unitNo ? `&unitNo=${unitNo}` : '';
    const response = await api.get(`/api/rephrase?q_id=${q_id}&style=${style}${unitParam}`, config);

    const rephrasedText = response?.data?.content || response.data;
    return rephrasedText;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to rephrase answer.",
    );
  }
};

export const resetPasswordLink = async (email) => {
  try {
    const response = await api.post("/api/password/forgot", { email });
    console.log("Response for forget API: " + response);
    console.log("Response.data is: " + response.data);
    console.log("Response.data is: " + response.data.success);
    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);

    const message =
      error.response?.data?.message ||
      "Failed to send reset link. Please try again.";

    // Optional: throw if needed by caller
    throw new Error(message);
  }
};

// CART APIs
export const getCart = async (profileId) => {
  try {
    const token = tokenStorage.getToken();
    const response = await api.get(`/api/cart/view/${profileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);

    const message =
      error.response?.data?.message || "Failed to get cart. Please try again.";
    throw new Error(message);
  }
};

export const addToCart = async (profileId, planId, courseId) => {
  try {
    const token = tokenStorage.getToken();

    const response = await api.post(
      "/api/cart/add",
      {
        profileId,
        planId,
        courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("API Response:", response.status, response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response);

    const message =
      error.response?.data?.message ||
      "Failed to add course to cart. Please try again.";
    throw new Error(message);
  }
};

export const removeFromCart = async (cartId) => {
  try {
    const token = tokenStorage.getToken();
    const response = await api.post(
      `/api/cart/remove/${cartId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);

    const message =
      error.response?.data?.message ||
      "Failed to remove course from cart. Please try again.";
    throw new Error(message);
  }
};

export const clearCart = async (profileId) => {
  try {
    const token = tokenStorage.getToken();
    const response = await api.post(
      `/api/cart/clear/${profileId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);

    const message =
      error.response?.data?.message ||
      "Failed to clear cart. Please try again.";
    throw new Error(message);
  }
};


// COUPON APIs
export const applyCoupon = async (profileId, couponCode) => {
  try {
    const token = tokenStorage.getToken();
    const response = await api.post(
      `/api/coupons/apply`,
      {
        profileId,
        couponCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);

    const message =
      error.response?.data?.message ||
      "Failed to apply coupon. Please try again.";
    throw new Error(message);
  }
};

export const getCoupons = async (profileId) => {
  try {
    const token = tokenStorage.getToken();
    const response = await api.get(`/api/coupons/applicable/${profileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);

    const message =
      error.response?.data?.message ||
      "Failed to fetch coupons. Please try again.";
    throw new Error(message);
  }
};


// SUBSCRIPTION APIs
export const cancelSubscription = async (reason, profileId, subscriptionId) => {
  try {
    const token = tokenStorage.getToken();
    const response = await api.post(
      `/api/subscriptions/cancel`,
      {
        reason,
        profileId,
        subscriptionId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);

    const message =
      error.response?.data?.message ||
      "Failed to cancel subscription. Please try again.";
    throw new Error(message);
  }
};

export const getSubscriptions = async (
  profileId,
  filter = "ALL",
  pageable = {},
) => {
  try {
    const token = tokenStorage.getToken();
    const params = new URLSearchParams();
    params.append("filter", filter);

    if (pageable.page !== undefined) params.append("page", pageable.page);
    if (pageable.size !== undefined) params.append("size", pageable.size);
    if (pageable.sort) {
      params.append("sort", pageable.sort);
    } else {
      params.append("sort", "purchaseDate,desc");
    }

    const response = await api.get(
      `/api/subscriptions/${profileId}/get?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);

    const message =
      error.response?.data?.message ||
      "Failed to fetch subscriptions. Please try again.";
    throw new Error(message);
  }
};

// TRANSACTION APIs
export const createTransaction = async (profileId, couponCode = null) => {
  try {
    const token = tokenStorage.getToken();
    const response = await api.post(
      `/api/transactions/create-transaction`,
      {
        profileId,
        couponCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("Transaction Creation:", {
      status: response.status,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error.response);

    const message =
      error.response?.data?.message ||
      "Failed to create transaction. Please try again.";
    throw new Error(message);
  }
};

export const verifyPayment = async (orderId, paymentId, signature) => {
  try {
    const token = tokenStorage.getToken();
    const response = await api.post(
      `/api/transactions/verify-payment`,
      {
        razorpayOrderId: orderId,
        razorpayPaymentId: paymentId,
        razorpaySignature: signature,
        status: "SUCCESS",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("Payment Verification:", {
      status: response.status,
      data: response.data
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error.response);

    const message =
      error.response?.data?.message ||
      "Payment verification failed. Please contact support.";
    throw new Error(message);
  }
};

export const removeTransaction = async (orderId) => {
  try {
    const token = tokenStorage.getToken();
    const response = await api.post(
      `/api/transactions/remove/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    console.log("Transaction Removed:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error removing transaction:", error.response);

    const message =
      error.response?.data?.message ||
      "Failed to remove transaction. Please try again.";
    throw new Error(message);
  }
};

// ROADMAP APIs
export const submitRoadmapInput = async (profileId, subCode, inputData) => {
  try {
    const { courseCode, unitNo, planId } = getUserContext();
    const headers = await generateProtectedHeaders(profileId, courseCode, unitNo, planId, 'ROADMAP');

    const response = await api.put(
      `/api/roadmap/input/${profileId}/${subCode}`,
      inputData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting roadmap input:", error.response);
    const message =
      error.response?.data?.message ||
      "Failed to submit roadmap input. Please try again.";
    throw new Error(message);
  }
};

export const generateRoadmap = async (profileId, subCode) => {
  try {
    const { courseCode, unitNo, planId } = getUserContext();
    const headers = await generateProtectedHeaders(profileId, courseCode, unitNo, planId, 'ROADMAP');

    const response = await api.post(
      `/api/roadmap/generate/${profileId}/${subCode}`,
      {},
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating roadmap:", error.response);
    const message =
      error.response?.data?.message ||
      "Failed to generate roadmap. Please try again.";
    throw new Error(message);
  }
};

export const getRoadmap = async (profileId, subCode) => {
  try {
    const { courseCode, unitNo, planId } = getUserContext();
    const headers = await generateProtectedHeaders(profileId, courseCode, unitNo, planId, 'ROADMAP');

    const response = await api.get(
      `/api/roadmap/${profileId}/${subCode}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching roadmap:", error.response);
    const message =
      error.response?.data?.message ||
      "Failed to fetch roadmap. Please try again.";
    throw new Error(message);
  }
};
