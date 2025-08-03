import React from "react";
import "./UserDashboard.css";
import UserDashboardRight from "./UserDashboardRight";
import { useNavigate } from "react-router-dom";
import { getAllCourses, enrollCourse } from "../api/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useMyCourses, getBookDetails } from "./sharedQuery";

const AllSubjects = ({ searchQuery }) => {
  const navigate = useNavigate();

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
  const filteredCourses = (
    allCourses.length > 0
      ? allCourses
      : JSON.parse(sessionStorage.getItem("allCourses") || "[]")
  ).filter((course) => {
    const query = searchQuery;

    const nameMatch = course.name?.includes(query);
    const universityMatch = course.universityName?.includes(query);
    const yearMatch = String(course.year).includes(query);
    const normalizeHyphen = (str) => str.replace(/\s*-\s*/g, "-");

    const branchMatch = course.branchNames?.some((branch) =>
      normalizeHyphen(branch.toLowerCase()).includes(
        normalizeHyphen(searchQuery.toLowerCase())
      )
    );

    const codeMatch = course.courseCodes?.some((code) => code.includes(query));

    return (
      nameMatch || universityMatch || yearMatch || branchMatch || codeMatch
    );
  });

  const { mutate: mutateEnroll, isPending: isEnrolling } = useMutation({
    mutationFn: enrollCourse,
    onSuccess: (data) => {
      console.log("Successfully enrolled in the course!", data);
      const coursesToUpdate = JSON.parse(
        localStorage.getItem("myCourses") || "[]"
      );
      const courseAlreadyEnrolled = coursesToUpdate.some(
        (obj) => obj.id === data[1].id
      );

      if (courseAlreadyEnrolled) {
        navigate(`/book-dashboard?subcode=${data[1].courseCodes[0]}`);
        toast.dismiss();
        toast.info("Course Already Enrolled!");
      } else {
        coursesToUpdate.push(data[1]);
        console.log("Updating courses: ", coursesToUpdate);
        localStorage.setItem("myCourses", JSON.stringify(coursesToUpdate));
        localStorage.setItem(
          "bookDetails",
          JSON.stringify(getBookDetails(coursesToUpdate))
        );
        navigate(`/book-dashboard?subcode=${data[1].courseCodes[0]}`);
        toast.dismiss();
        toast.success("Successfully enrolled in the course!");
      }
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

                        const courseExists = JSON.parse(
                          localStorage.getItem("myCourses") || "[]"
                        ).some((tempCourse) => tempCourse.id === course.id);
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
        <UserDashboardRight />
      </div>
    </div>
  );
};

export default AllSubjects;
