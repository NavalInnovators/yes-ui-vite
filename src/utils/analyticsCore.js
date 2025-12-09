const SESSION_STORAGE_KEY = "analytics_session_id";
const POPUP_TIMER_PREFIX = "analytics_popup_timer";
const POPUP_ABANDONMENT_DELAY_MS = 15 * 60 * 1000; // 15 minutes

const isBrowser = typeof window !== "undefined";

const IST_FORMATTER = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export const getISTISOString = (date = new Date()) => {
  const parts = IST_FORMATTER.formatToParts(date).reduce((acc, part) => {
    if (part.type !== "literal") {
      acc[part.type] = part.value;
    }
    return acc;
  }, {});
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}+05:30`;
};

export const formatDuration = (ms) => {
  if (ms == null || ms < 0) return null;

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${seconds} sec`;
  }

  return `${minutes} min ${seconds} sec`;
};

let eventIdCounter = 0;

export const generateEventId = () => {
  if (!isBrowser) {
    return `event-server-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  const timestamp = Date.now();
  const array = new Uint8Array(8);
  window.crypto.getRandomValues(array);
  const randomHex = Array.from(array, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");

  eventIdCounter = (eventIdCounter + 1) % 10000;
  const counter = eventIdCounter.toString().padStart(4, "0");

  return `event-${timestamp}-${randomHex}-${counter}`;
};

const generateAnonymousUserId = () => {
  if (!isBrowser) {
    return `user-server-${Date.now()}`;
  }

  const timestamp = Date.now();
  const array = new Uint8Array(4);
  window.crypto.getRandomValues(array);
  const randomHex = Array.from(array, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");

  return `user-${timestamp.toString(36)}${randomHex}`;
};

const getRandomId = () => {
  if (!isBrowser) {
    return `server-${Date.now()}`;
  }

  if (window?.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
};

export const getSessionId = () => {
  if (!isBrowser) {
    return "server-session";
  }

  try {
    const existing =
      sessionStorage.getItem(SESSION_STORAGE_KEY) ||
      localStorage.getItem(SESSION_STORAGE_KEY);

    if (existing) {
      return existing;
    }

    const generated = getRandomId();
    sessionStorage.setItem(SESSION_STORAGE_KEY, generated);
    localStorage.setItem(SESSION_STORAGE_KEY, generated);
    return generated;
  } catch (error) {
    return getRandomId();
  }
};

export const getUserId = () => {
  if (!isBrowser) {
    return null;
  }

  try {
    const token = localStorage.getItem("token");
    const profileId = localStorage.getItem("profileId");

    if (token && profileId) {
      return profileId;
    }

    const ANONYMOUS_USER_KEY = "analytics_anonymous_user_id";
    let anonymousId = localStorage.getItem(ANONYMOUS_USER_KEY);

    if (!anonymousId) {
      anonymousId = generateAnonymousUserId();
      localStorage.setItem(ANONYMOUS_USER_KEY, anonymousId);
    }

    return anonymousId;
  } catch (error) {
    return null;
  }
};

const resolveTracker = () => {
  if (!isBrowser) {
    return null;
  }

  const { umami } = window;
  if (!umami) {
    return null;
  }

  if (typeof umami.track === "function") {
    return (eventName, payload) => umami.track(eventName, payload);
  }

  if (typeof umami.trackEvent === "function") {
    return (eventName, payload) => umami.trackEvent(eventName, payload);
  }

  return null;
};

let trackerCache = null;
const pendingEvents = [];
let retryTimer = null;

const flushPendingEvents = () => {
  const tracker = resolveTracker();
  if (!tracker) {
    if (!retryTimer) {
      retryTimer = setTimeout(() => {
        retryTimer = null;
        flushPendingEvents();
      }, 500);
    }
    return null;
  }

  trackerCache = tracker;

  while (pendingEvents.length) {
    const { eventName, payload } = pendingEvents.shift();
    try {
      tracker(eventName, payload);
    } catch (error) {
      // Silent fail
    }
  }

  return trackerCache;
};

const withBaseContext = (data = {}) => {
  return {
    ...data,
  };
};

export const track = (eventName, eventData = {}) => {
  const payload = withBaseContext(eventData);

  const tracker = trackerCache || resolveTracker();

  if (!tracker) {
    pendingEvents.push({ eventName, payload });
    flushPendingEvents();
    return;
  }

  trackerCache = tracker;

  try {
    tracker(eventName, payload);
  } catch (error) {
    // Silent fail
  }
};

export const initializeUserTracking = () => {
  if (!isBrowser) {
    return;
  }

  const performIdentification = () => {
    try {
      const token = localStorage.getItem("token");
      const profileId = localStorage.getItem("profileId");
      const userId = getUserId();
      const sessionId = getSessionId();
      const isLoggedIn = !!(token && profileId);

      if (userId && window.umami?.identify) {
        try {
          window.umami.identify(userId);
        } catch (identifyError) {
          // Silent fail
        }
      }

      track("loggedin_status", {
        user_id: userId,
        session_id: sessionId,
        is_logged_in: isLoggedIn,
        timestamp: getISTISOString(),
      });
    } catch (error) {
      // Silent fail
    }
  };

  if (window.umami?.identify) {
    performIdentification();
  } else {
    const checkUmami = setInterval(() => {
      if (window.umami?.identify) {
        clearInterval(checkUmami);
        performIdentification();
      }
    }, 100);

    setTimeout(() => {
      clearInterval(checkUmami);
    }, 5000);
  }
};

export const debugUmamiStatus = () => {
  if (!isBrowser) {
    return;
  }

  console.log("[analytics] Umami debug:", {
    umamiExists: !!window.umami,
    umamiType: typeof window.umami,
    identifyExists: !!window.umami?.identify,
    identifyType: typeof window.umami?.identify,
    umamiKeys: window.umami ? Object.keys(window.umami) : [],
    umamiObject: window.umami,
    userId: getUserId(),
    sessionId: getSessionId(),
    token: localStorage.getItem("token") ? "exists" : "missing",
    profileId: localStorage.getItem("profileId"),
  });

  if (window.umami?.identify) {
    try {
      const testUserId = getUserId();
      console.log("[analytics] Attempting manual identify with:", testUserId);
      window.umami.identify(testUserId);
      console.log("[analytics] Manual identify succeeded");
    } catch (e) {
      console.error("[analytics] Manual identify failed:", e);
    }
  }
};

export const reidentifyUserAfterAuth = () => {
  if (!isBrowser) {
    return;
  }

  try {
    const token = localStorage.getItem("token");
    const profileId = localStorage.getItem("profileId");

    if (!token || !profileId) {
      return;
    }

    const ANONYMOUS_USER_KEY = "analytics_anonymous_user_id";
    const previousAnonymousId = localStorage.getItem(ANONYMOUS_USER_KEY);
    localStorage.removeItem(ANONYMOUS_USER_KEY);

    const sessionId = getSessionId();

    if (window.umami) {
      try {
        if (typeof window.umami.identify === "function") {
          window.umami.identify(profileId);
        }
      } catch (identifyError) {
        // Silent fail
      }
    }

    track("user_authenticated", {
      user_id: profileId,
      session_id: sessionId,
      previous_anonymous_id: previousAnonymousId || null,
      timestamp: getISTISOString(),
    });
  } catch (error) {
    // Silent fail
  }
};

const popupTimers = new Map();

const buildPopupTimerKey = (subjectId) =>
  `${POPUP_TIMER_PREFIX}_${subjectId || "unknown"}`;

export const schedulePopupAbandonment = ({
  subjectId,
  courseName,
  addedAt,
  delayMs = POPUP_ABANDONMENT_DELAY_MS,
}) => {
  if (!isBrowser) {
    return () => {};
  }

  const key = buildPopupTimerKey(subjectId);

  if (popupTimers.has(key)) {
    clearTimeout(popupTimers.get(key));
  }

  const timerId = window.setTimeout(() => {
    const abandonedAt = getISTISOString();
    const durationMs = Date.now() - new Date(addedAt).getTime();
    track("plan_popup_abandoned", {
      subject_id: subjectId,
      course_name: courseName,
      added_at: addedAt,
      abandoned_at: abandonedAt,
      duration: formatDuration(durationMs),
    });
    popupTimers.delete(key);
  }, delayMs);

  popupTimers.set(key, timerId);

  return () => cancelPopupAbandonment(subjectId);
};

export const cancelPopupAbandonment = (subjectId) => {
  if (!isBrowser) {
    return;
  }

  const key = buildPopupTimerKey(subjectId);
  const timerId = popupTimers.get(key);
  if (timerId) {
    clearTimeout(timerId);
    popupTimers.delete(key);
  }
};

export const clearPopupTimersForCartItems = (cartItems) => {
  if (!Array.isArray(cartItems)) {
    return;
  }

  cartItems.forEach((item) => {
    cancelPopupAbandonment(item.courseId || item.id);
  });
};
