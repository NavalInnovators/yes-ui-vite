import { useState } from "react";
import "./UserDashboard.css";
import UserDashboardRight from "./UserDashboardRight";
import { useNavigate } from "react-router-dom";
import { getAllCourses, enrollCourse } from "../api/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { useMyCourses, getBookDetails } from "./sharedQuery";

const AllSubjects = ({ searchQuery }) => {
  const queryClient = useQueryClient();

  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const yearCategoryMap = {
    "1st Year": 1,
    "2nd Year": 2,
    "3rd Year": 3,
    "4th Year": 4,
  };
  const {
    data: allCourses = [],
    isLoading: isLoadingAllCourses,
    isError,
  } = useQuery({
    queryKey: ["allCourses"],
    queryFn: getAllCourses,
    enabled: !sessionStorage.getItem("allCourses"),
  });

  if (allCourses.length > 0 && !sessionStorage.getItem("allCourses")) {
    sessionStorage.setItem("allCourses", JSON.stringify(allCourses));
  }

  // calling myCourses from shared query
  useMyCourses();

  // if (myCourses.length > 0 && !localStorage.getItem('myCourses')) {
  //   console.log("My courses api called......")
  //   localStorage.setItem('myCourses', JSON.stringify(myCourses));
  // }

  // Filter the courses based on the search query
  const categories = useMemo(() => {
    const years = new Set();
    const branches = new Set();
    const universities = new Set();

    (allCourses.length > 0
      ? allCourses
      : JSON.parse(sessionStorage.getItem("allCourses") || "[]")
    ).forEach((course) => {
      if (course.year) years.add(`${course.year} Year`);
      if (course.branchNames) {
        course.branchNames.forEach((branch) => branches.add(branch));
      }
      if (course.universityName != "Unknown")
        universities.add(course.universityName);
    });

    // Sort years numerically
    const sortedYears = Array.from(years).sort((a, b) => {
      const numA = parseInt(a); // extract number before "Year"
      const numB = parseInt(b);
      return numA - numB;
    });

    return [
      ...Array.from(universities),
      ...sortedYears,
      ...Array.from(branches).sort(), // optional alphabetical sort
    ];
  }, [allCourses]);

  const filteredCourses = (
    allCourses.length > 0
      ? allCourses
      : JSON.parse(sessionStorage.getItem("allCourses") || "[]")
  ).filter((course) => {
    const normalize = (str) => str?.trimEnd().toLowerCase();
    const normalizeHyphen = (str) => normalize(str).replace(/\s*-\s*/g, "-");
    const yearCategoryMap = {
      "1 Year": 1,
      "2 Year": 2,
      "3 Year": 3,
      "4 Year": 4,
      "1st Year": 1,
      "2nd Year": 2,
      "3rd Year": 3,
      "4th Year": 4,
    };
    // Year categories
    if (yearCategoryMap[selectedCategory]) {
      return course.year === yearCategoryMap[selectedCategory];
    }

    // Branch categories
    if (
      course.branchNames?.some(
        (branch) =>
          normalizeHyphen(branch) === normalizeHyphen(selectedCategory)
      )
    ) {
      return true;
    }

    // University
    if (normalize(course.universityName) === normalize(selectedCategory)) {
      return true;
    }

    // Otherwise, normal search
    const query = normalize(selectedCategory || searchQuery);
    return (
      normalize(course.name)?.includes(query) ||
      normalize(course.universityName)?.includes(query) ||
      String(course.year).toLowerCase().includes(query) ||
      course.branchNames?.some((branch) =>
        normalizeHyphen(branch).includes(normalizeHyphen(query))
      ) ||
      course.courseCodes?.some((code) => normalize(code)?.includes(query))
    );
  });

  const { data: myCourses = [] } = useMyCourses();

  const { mutate: mutateEnroll, isPending: isEnrolling } = useMutation({
    mutationFn: (course) => enrollCourse(course),
    onSuccess: (data) => {
      const enrolledCourse = data[1];

      const alreadyExists = myCourses.some(
        (obj) => obj.id === enrolledCourse.id
      );

      if (alreadyExists) {
        toast.dismiss();
        toast.info("Course Already Enrolled!");
        navigate(`/book-dashboard?subcode=${enrolledCourse.courseCodes[0]}`);
        return;
      }

      const updatedCourses = [...myCourses, enrolledCourse];
      localStorage.setItem("myCourses", JSON.stringify(updatedCourses));
      localStorage.setItem(
        "bookDetails",
        JSON.stringify(getBookDetails(updatedCourses))
      );

      toast.dismiss();
      toast.success("Successfully enrolled in the course!");
      navigate(`/book-dashboard?subcode=${enrolledCourse.courseCodes[0]}`);

      queryClient.invalidateQueries(["myCourses"]);
    },
    onError: (error) => {
      console.log("Error in enrolling for the subject: ", error);
      toast.dismiss();
      toast.error(`Enrollment failed! Please try again`);
    },
  });

  return (
    <div className="userdashboard-content-page">
      <div className="all-course-card-container">
        {/* Handle loading and error states */}
        {isLoadingAllCourses ? (
          <div>Loading all your courses...</div>
        ) : isError ? (
          <div>Error loading courses. Please try again later.</div>
        ) : filteredCourses.length === 0 ? (
          <div>No courses found.</div>
        ) : (
          filteredCourses.map((course) => (
            <div className="all-course-card" key={course.id}>
              <div className="all-course-card-info-container">
                <div className="all-course-card-header-container">
                  <div className="font-subheading-black">{course.name}</div>
                </div>
                <div className="all-course-card-tags-container font-mark-read-btn">
                  <div className="all-course-card-each-tag">
                    {course.universityName}
                  </div>
                  <div className="all-course-card-each-tag">{course.year}</div>
                  {course.branchNames.map((branch, index) => (
                    <div
                      className="all-course-card-each-tag"
                      key={`branch-${index}`}
                    >
                      {branch}
                    </div>
                  ))}
                  {course.courseCodes.map((courseCode, index) => (
                    <div
                      className="all-course-card-each-tag"
                      key={`code-${index}`}
                    >
                      {courseCode}
                    </div>
                  ))}
                </div>
              </div>
              <div
                onClick={
                  isEnrolling
                    ? null
                    : () => {
                        console.log("Clicked on start learning.....");
                        sessionStorage.setItem(
                          "selectedCourseCode",
                          course.courseCodes[0]
                        );

                        // Check if the course is already enrolled (from server)
                        const courseExists = myCourses.some(
                          (tempCourse) => tempCourse.id === course.id
                        );
                        // const courseExists = myCourses.length > 0 ? myCourses : JSON.parse(localStorage.getItem('myCourses')).some(tempCourse => tempCourse.id === course.id);

                        if (courseExists) {
                          navigate(
                            `/book-dashboard?subcode=${course.courseCodes[0]}`
                          );
                          return;
                        } else {
                          if (!localStorage.getItem("token")) {
                            navigate("/login");
                            return;
                          } else {
                            console.log("Have token!");
                            toast.info(
                              "Enrolling in the course... Please wait",
                              { autoClose: false }
                            );
                            mutateEnroll(course);
                          }
                        }
                      }
                }
                className="all-course-card-start-learning-btn font-notification pointer-cursor"
              >
                Start Learning
              </div>
            </div>
          ))
        )}
      </div>

      <div className="userdashboard-sidesection">
        <UserDashboardRight
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={(category) => {
            if (selectedCategory === category) {
              setSelectedCategory("");
            } else {
              setSelectedCategory(category);
            }
          }}
        />
      </div>
    </div>
  );
};

export default AllSubjects;
