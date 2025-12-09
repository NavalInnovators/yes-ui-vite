import {
  track,
  getISTISOString,
  formatDuration,
  generateEventId,
} from "./analyticsCore";

export const trackCartEvent = ({
  action,
  source = "unknown",
  courseId,
  courseName,
  plan,
  price,
  subjectCode = null,
  timestamp = getISTISOString(),
  requiredPlan = null,
  previousPlan = null,
  previousPrice = null,
}) => {
  const payload = {
    action,
    source,
    course_id: courseId,
    course_name: courseName,
    selected_plan: plan,
    price,
    subject_code: subjectCode,
    timestamp,
  };

  if (requiredPlan) {
    payload.required_plan = requiredPlan;
  }

  if (
    (action === "upgraded" ||
      action === "downgraded" ||
      action === "updated") &&
    previousPlan
  ) {
    payload.previous_plan = previousPlan;
    if (previousPrice) {
      payload.previous_price = previousPrice;
    }
  }

  track("cart_event", payload);
};

export const trackPopupOpen = ({
  subjectId,
  courseName,
  requiredPlan,
  openedAt,
}) => {
  const normalizedPlan = requiredPlan?.toLowerCase() || "unknown";
  const validPlans = ["free", "basic", "pro"];
  const plan = validPlans.includes(normalizedPlan) ? normalizedPlan : "unknown";

  track("plan_popup_opened", {
    subject_id: subjectId,
    course_name: courseName,
    required_plan: plan,
    opened_at: openedAt,
  });
};

export const trackPopupClosed = ({
  subjectId,
  courseName,
  openedAt,
  closedAt,
  closeReason = "unknown",
  durationMs = null,
  outcome = "closed",
}) => {
  track("plan_popup_closed", {
    subject_id: subjectId,
    course_name: courseName,
    opened_at: openedAt,
    closed_at: closedAt,
    duration: formatDuration(durationMs),
    close_reason: closeReason,
    outcome,
  });
};

export const trackBookDashboardActivity = ({
  courseId,
  courseName,
  subjectCode,
  section,
  fromSection = null,
  durationMs = null,
  unitsVisited = [],
  timestamp = getISTISOString(),
}) => {
  if (!section) {
    return null;
  }

  const eventId = generateEventId();

  let action = "viewed";
  if (durationMs != null && durationMs >= 15000) {
    action = "studied";
  }

  const payload = {
    event_id: eventId,
    action,
    course_id: courseId || null,
    course_name: courseName || null,
    subject_code: subjectCode || null,
    section,
    timestamp,
  };

  if (fromSection) {
    payload.from_section = fromSection;
  }

  if (durationMs != null) {
    payload.duration = formatDuration(durationMs);
  }

  if (unitsVisited && unitsVisited.length > 0) {
    payload.units_visited = unitsVisited;
  }

  track("book_dashboard_activity", payload);

  return eventId;
};

export const trackQnAStudied = ({
  parentEventId,
  courseId,
  questionsStudied = [],
  timestamp = getISTISOString(),
}) => {
  if (!questionsStudied || questionsStudied.length === 0) {
    return;
  }

  const payload = {
    parent_event_id: parentEventId,
    course_id: courseId || null,
    questions_studied: questionsStudied,
    timestamp,
  };

  track("qna_studied", payload);
};

export const trackNotesStudied = ({
  parentEventId,
  courseId,
  topicsStudied = [],
  timestamp = getISTISOString(),
}) => {
  if (!topicsStudied || topicsStudied.length === 0) {
    return;
  }

  const payload = {
    parent_event_id: parentEventId,
    course_id: courseId || null,
    topics_studied: topicsStudied,
    timestamp,
  };

  track("notes_studied", payload);
};

export const trackSummariserUsed = ({
  courseId,
  courseName,
  subjectCode,
  unit,
  questionId,
  topic,
  timestamp,
  usageCount = null,
}) => {
  track("summariser_used", {
    course_id: courseId,
    course_name: courseName,
    subject_code: subjectCode,
    unit,
    question_id: questionId || null,
    topic: topic || null,
    used_at: timestamp,
    usage_count: usageCount,
  });
};

export const trackRephraserUsed = ({
  courseId,
  courseName,
  subjectCode,
  unit,
  questionId,
  topic,
  style,
  timestamp,
  usageCount = null,
}) => {
  track("rephraser_used", {
    course_id: courseId,
    course_name: courseName,
    subject_code: subjectCode,
    unit,
    question_id: questionId || null,
    topic: topic || null,
    style,
    used_at: timestamp,
    usage_count: usageCount,
  });
};

export const trackSocialLinkClicked = ({
  platform,
  location,
  url = null,
  timestamp = getISTISOString(),
}) => {
  track("social_link_clicked", {
    platform,
    location,
    url,
    timestamp,
  });
};

export const trackQuerySubmitted = ({
  subject,
  query,
  timestamp = getISTISOString(),
}) => {
  track("query_submitted", {
    subject,
    query,
    timestamp,
  });
};

export const trackReviewSubmitted = ({
  rating,
  feedback,
  timestamp = getISTISOString(),
}) => {
  track("review_submitted", {
    rating: String(Math.floor(Number(rating))),
    feedback,
    timestamp,
  });
};

export const trackContactFormSubmitted = ({
  firstName,
  lastName,
  phone,
  email,
  subject,
  location,
  timestamp = getISTISOString(),
}) => {
  track("contact_form_submitted", {
    first_name: firstName,
    last_name: lastName,
    phone,
    email,
    subject,
    location,
    timestamp,
  });
};

export const trackUserLogout = ({ timestamp = getISTISOString() }) => {
  track("user_logout", {
    timestamp,
  });
};

export const trackProfileEdited = ({
  previousData,
  newData,
  timestamp = getISTISOString(),
}) => {
  if (!previousData || !newData) {
    return;
  }

  const editableFields = [
    "firstName",
    "lastName",
    "gender",
    "dateOfBirth",
    "password",
    "universityId",
    "collegeId",
    "branchId",
    "year",
  ];

  const payload = {
    timestamp,
  };
  const changedFields = [];

  editableFields.forEach((field) => {
    const oldValue = previousData[field];
    const newValue = newData[field];

    if (oldValue !== newValue && !(oldValue == null && newValue == null)) {
      changedFields.push(field);
      payload[`${field}.previous`] = oldValue ?? null;
      payload[`${field}.new`] = newValue ?? null;
    }
  });

  if (changedFields.length === 0) {
    return;
  }

  payload.fields_changed = changedFields;

  track("profile_edited", payload);
};
