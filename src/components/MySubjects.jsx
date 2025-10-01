import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";
import UserDashboardRight from "./UserDashboardRight";
import { useMyCourses } from "./sharedQuery";
import { useState } from "react";
import { StateWrapper, InlineLoadingState, InlineErrorState, InlineDataUnavailableState, LoadingState404, Error404State } from "./LoadingStates";
function MySubjects({ searchQuery }) {
  const navigate = useNavigate();
  const { data: myCourses, isLoading, isError } = useMyCourses();
  const [selectedCategory, setSelectedCategory] = useState("");
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
        {isLoading ? (
          <LoadingState404 message="Loading your enrolled courses..." size="large" />
        ) : isError ? (
          <Error404State message="Failed to load your courses. Please try again!" size="large" />
        ) : filteredSubjects.length === 0 ? (
          <InlineDataUnavailableState message="You haven't enrolled in any courses yet." size="large" />
        ) : (
          filteredSubjects.map((subject, index) => {
            return (
              <div
                key={index}
                className="all-course-card pointer-cursor"
                onClick={() => {
                  sessionStorage.setItem(
                    "selectedCourseCode",
                    subject.courseCodes[0]
                  );
                  navigate(`/book-dashboard?subcode=${subject.courseCodes[0]}`);
                }}
              >
                <div className="all-course-card-info-container">
                  <div className="all-course-card-header-container">
                    <div className="font-subheading-black">{subject.name}</div>
                  </div>
                  <div className="all-course-card-tags-container font-mark-read-btn">
                    <div className="all-course-card-each-tag">
                      {subject.universityName}
                    </div>
                    <div className="all-course-card-each-tag">
                      {subject.year}
                    </div>
                    {subject.branchNames.map((branch, index) => (
                      <div key={index} className="all-course-card-each-tag">
                        {branch}
                      </div>
                    ))}
                    {subject.courseCodes.map((courseCode, index) => (
                      <div key={index} className="all-course-card-each-tag">
                        {courseCode}
                      </div>
                    ))}
                  </div>
                </div>
                {/* <div className="all-course-card-slider-container">
                      <MySubjectSlider
                        totalUnits={totalUnits}
                        completedUnits={completedUnits}
                      />
                    </div> */}
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
