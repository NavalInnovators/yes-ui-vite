const isBrowser = typeof window !== "undefined";

const safeParse = (value) => {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("[courseUtils] Failed to parse stored courses", error);
    return [];
  }
};

const readCoursesFromStorage = (storage, key) => {
  if (!isBrowser || !storage) {
    return [];
  }

  try {
    return safeParse(storage.getItem(key));
  } catch (error) {
    console.warn("[courseUtils] Storage read error", error);
    return [];
  }
};

export const normalizeCourseCode = (value) =>
  (value || "").toString().trim().toLowerCase();

const collectStoredCourses = () => {
  if (!isBrowser) {
    return [];
  }

  const courses = [
    ...readCoursesFromStorage(window.sessionStorage, "allCourses"),
    ...readCoursesFromStorage(window.localStorage, "allCourses"),
    ...readCoursesFromStorage(window.localStorage, "myCourses"),
  ];

  // Deduplicate by id + first course code match
  const seen = new Set();
  return courses.filter((course) => {
    const key = course?.id || course?.name || JSON.stringify(course);
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

export const findCourseByCode = (subjectCode) => {
  const normalized = normalizeCourseCode(subjectCode);
  if (!normalized) {
    return null;
  }

  const courses = collectStoredCourses();
  return (
    courses.find(
      (course) =>
        Array.isArray(course?.courseCodes) &&
        course.courseCodes.some(
          (code) => normalizeCourseCode(code) === normalized,
        ),
    ) || null
  );
};

export const getCourseTrackingMeta = (subjectCode) => {
  const course = findCourseByCode(subjectCode);
  const normalizedCode = (subjectCode || "").toString().trim();

  return {
    course,
    courseId: course?.id || `subject-${normalizeCourseCode(subjectCode)}`,
    courseName: course?.name || normalizedCode.toUpperCase(),
    subjectCode: normalizedCode,
  };
};
