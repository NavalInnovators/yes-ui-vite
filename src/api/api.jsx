import axios from "axios";
import { BACKEND_URL, AI_URL } from "../constants/api";
import { track } from "@vercel/analytics/react";

const api = axios.create({
  baseURL: BACKEND_URL,
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
  const getToken = localStorage.getItem("token");
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
  const profileId = localStorage.getItem("profileId");
  const token = localStorage.getItem("token");
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
  const token = localStorage.getItem("token");
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
  const token = localStorage.getItem("token");
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
      error.response?.data?.message || "Failed to fetch subjects."
    );
  }
};

// GET from Query
export const fetchQueries = async () => {
  const profileId = localStorage.getItem("profileId");
  const token = localStorage.getItem("token");
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
  const getToken = localStorage.getItem("token");
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
  const getToken = localStorage.getItem("token");
  const profileId = localStorage.getItem("profileId");
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
    const token = localStorage.getItem("token");
    const profileId = localStorage.getItem("profileId");

    const response = await api.get(`/api/profile/${profileId}/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`profile`, response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const profileId = localStorage.getItem("profileId");

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
    const token = localStorage.getItem("token");
    const profileId = localStorage.getItem("profileId");

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
    const token = localStorage.getItem("token");
    const profileId = localStorage.getItem("profileId");

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
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/api/getSyllabus?subcode=${subCode}`, config)
  return response.data.data;
}

export const getQnA = async (subCode) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/api/getQA?subcode=${subCode}`, config)
  return response.data.data;
}

export const getUnitNotes = async (subCode) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get(`/api/getUnitNotes/${subCode}`, config)
  return response.data.data;
}

export const getAnalyticData = async (subCode) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.get(`/api/analyticData/${subCode}`, config);
    return response.data.data;
};


export const enrollCourse = async (course) => {
  try {
    const profileId = parseInt(localStorage.getItem("profileId"));
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await api.post(
      `/api/profile/${profileId}/course/${parseInt(course.id)}/enroll`,
      {},
      config
    );
    console.log(`Response from course enroll api: =============>`, response.data);
    return [response.data, course];
  } catch (error) {
    throw error;
  }
}

// APIs of Summrizer and Rephraser
export const summarizeAnswer = async (question, answer) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.post(
      `api/summarize`,
      { question, answer },
      config
    );
    // Step 1: Extract the raw string
    const rawData = response.data; // This is a string like "FastAPI Response: {...}"

    // Step 2: Remove the prefix
    const jsonString = rawData.replace("FastAPI Response: ", "");

    // Step 3: Parse it
    const parsed = JSON.parse(jsonString);

    // Step 4: Return the summarized answer
    
    console.log("response is "+parsed?.data?.summarized_answer);
    return parsed?.data?.summarized_answer;
    // return response.data?.data?.summarized_answer;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to summarize answer."
    );
  }
};

export const rephraseAnswer = async (style, summary, answer) => {
  try {
    console.log("Before making call from API.jsx type of are:"+ typeof(style)+" "+typeof(summary)+typeof(answer));
    const response = await apiAI.post(
      `/rephrase`,
      { style, summary, answer },
    );

    const rephrasedText = response?.data?.data?.rephrased_text;
    console.log("Rephrased Text:", rephrasedText); // For debug
    return rephrasedText;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to rephrase answer."
    );
  }
};

export const resetPasswordLink = async (email) => {
  try {
    const response = await api.post(
      '/api/password/forgot',
      {email},
    );
    console.log("Response for forget API: "+ response);
    console.log("Response.data is: "+ response.data);
    console.log("Response.data is: "+ response.data.success);
    return response.data;

  }catch (error) {
    console.error("Error response:", error.response);

    const message =
      error.response?.data?.message || "Failed to send reset link. Please try again.";

    // Optional: throw if needed by caller
    throw new Error(message);
  }
};
