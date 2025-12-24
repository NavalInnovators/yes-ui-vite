import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";
import UserDashboardRight from "./UserDashboardRight";
import { useMyCourses } from "./sharedQuery";
import { useState, useEffect } from "react";
import { useSubscriptions } from "../hooks/useSubscriptions";

function MySubjects({ searchQuery }) {
  const navigate = useNavigate();
  const { data: myCourses, isLoading, isError } = useMyCourses();
  const [selectedCategory, setSelectedCategory] = useState("");
  const { getPlanForCourse, isLoading: subscriptionsLoading } = useSubscriptions();
  const categories = (() => {
    if (!myCourses) return [];

    const years = new Set();
    const branches = new Set();

    myCourses.forEach((course) => {
      if (course.year) years.add(course.year);
      course.branchNames?.forEach((branch) => branches.add(branch));
    });
    // Sort years numerically
    const sortedYears = Array.from(years).sort((a, b) => {
      const numA = parseInt(a); // extract number before "Year"
      const numB = parseInt(b);
      return numA - numB;
    });

    return [
      ...sortedYears.map((y) => `Year ${y}`),
      ...Array.from(branches).sort(),
    ];
  })();
  const yearCategoryMap = {
    "Year 1": 1,
    "Year 2": 2,
    "Year 3": 3,
    "Year 4": 4,
    "1st Year": 1,
    "2nd Year": 2,
    "3rd Year": 3,
    "4th Year": 4,
  };

  // Filter the subjects based on the search query or show all if the query is empty
  const filteredSubjects = myCourses
    ? myCourses.filter((subject) => {
      const normalize = (str) => str?.toLowerCase().trim();
      const normalizeHyphen = (str) =>
        normalize(str).replace(/\s*-\s*/g, "-");

      // Category filter
      if (selectedCategory) {
        if (yearCategoryMap[selectedCategory]) {
          return subject.year === yearCategoryMap[selectedCategory];
        }
        return subject.branchNames?.some(
          (branch) =>
            normalizeHyphen(branch) === normalizeHyphen(selectedCategory)
        );
      }

      // Normal search
      const query = normalizeHyphen(searchQuery);
      return (
        normalize(subject.name)?.includes(query) ||
        normalize(subject.universityName)?.includes(query) ||
        String(subject.year).toLowerCase().includes(query) ||
        subject.branchNames?.some((branch) =>
          normalizeHyphen(branch).includes(query)
        ) ||
        subject.courseCodes?.some((code) => normalize(code).includes(query))
      );
    })
    : [];
  return (
    <div className="userdashboard-content-page">
      <div className="all-course-card-container">
        {isLoading || subscriptionsLoading ? (
          <div>Please wait while we load your courses....</div>
        ) : isError ? (
          <div>Error loading your courses. Please try again!</div>
        ) : filteredSubjects.length === 0 ? (
          <div>No courses found.</div>
        ) : (
          filteredSubjects.map((subject, index) => {
            const plan = getPlanForCourse(subject.courseCodes[0]);
            const isPro = plan === "PRO" || plan === "Pro Plan";
            const isBasic = plan === "BASIC" || plan === "Basic Plan";

            return (
              <div
                key={index}
                className="w-full min-h-[220px] bg-[#fafafa] rounded-2xl p-6 flex flex-col justify-between border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => {
                  sessionStorage.setItem(
                    "selectedCourseCode",
                    subject.courseCodes[0]
                  );
                  navigate(`/book-dashboard?subcode=${subject.courseCodes[0]}`);
                }}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isPro
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : isBasic
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                        }`}
                    >
                      {isPro ? "Pro Plan" : isBasic ? "Basic Plan" : "Free Plan"}
                    </span>
                  </div>

                  <div className="text-lg font-bold text-gray-900 leading-snug">
                    {subject.name}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
                      {subject.universityName}
                    </div>
                    <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
                      Year {subject.year}
                    </div>
                    {subject.branchNames.slice(0, 1).map((branch, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase"
                      >
                        {branch}
                      </div>
                    ))}
                    {subject.courseCodes.slice(0, 1).map((courseCode, index) => (
                      <div
                        key={index}
                        className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase"
                      >
                        {courseCode}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* <div className="recommended-courses">
              <div className="recommended-heading heading-500-30-black">
                Recommended Courses
              </div>
              <div className="recomended-all-course-card-container">
                {allCourseCard.slice(8, 11).map((allCourseCard) => (
                  <div className="all-course-card" key={allCourseCard.subCode}>
                    <div className="all-course-card-info-container">
                      <div className="all-course-card-header-container">
                        <div className="font-subheading-black">
                          {allCourseCard.sub}
                        </div>
                        <div className="font-paragraph-grey">
                          {allCourseCard.totalUnits}
                        </div>
                      </div>
                      <div className="all-course-card-tags-container font-mark-read-btn">
                        <div className="all-course-card-each-tag">
                          {allCourseCard.univ}
                        </div>
                        <div className="all-course-card-each-tag">
                          {allCourseCard.year}
                        </div>
                        <div className="all-course-card-each-tag">
                          {allCourseCard.branch}
                        </div>
                        <div className="all-course-card-each-tag">
                          {allCourseCard.subCode}
                        </div>
                      </div>
                    </div>
                    <div className="all-course-card-start-learning-btn font-notification">
                      Start Learning
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
      </div>
      <div className="userdashboard-sidesection">
        <UserDashboardRight
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={(category) =>
            setSelectedCategory((prev) => (prev === category ? "" : category))
          }
        />
      </div>
    </div>
  );
}

export default MySubjects;
