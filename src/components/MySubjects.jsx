import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";
import UserDashboardRight from "./UserDashboardRight";
import { useMyCourses } from "./sharedQuery";

function MySubjects({ searchQuery }) {
  const navigate = useNavigate();
  const { data: myCourses, isLoading, isError } = useMyCourses();

  // Filter the subjects based on the search query or show all if the query is empty
  const filteredSubjects = myCourses
    ? myCourses.filter((subject) => {
        const normalize = (str) => str?.toLowerCase().trim();
        const normalizeHyphen = (str) =>
          normalize(str).replace(/\s*-\s*/g, "-");
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
          <div>Please wait while we load your courses....</div>
        ) : isError ? (
          <div>Error loading your courses. Please try again!</div>
        ) : filteredSubjects.length === 0 ? (
          <div>No courses found.</div>
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
        <UserDashboardRight />
      </div>
    </div>
  );
}

export default MySubjects;
