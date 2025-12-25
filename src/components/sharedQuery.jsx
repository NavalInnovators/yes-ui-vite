import { useQuery } from "@tanstack/react-query";
import { getMyCourses } from "../api/api";

export const getBookDetails = (allCoursesData) => {
  if (!allCoursesData || allCoursesData.length === 0) return {};

  return allCoursesData.reduce((bookDetails, course) => {
    // For each course code in the courseCodes array
    course.courseCodes.forEach((code) => {
      // Create a new object for this course code
      bookDetails[code] = {
        universityName: course.universityName,
        year: course.year,
        name: course.name,
        branchNames: course.branchNames,
      };
    });
    return bookDetails;
  }, {});
};

export const useMyCourses = () => {
  const profileId = localStorage.getItem("profileId");
  const token = localStorage.getItem("token");
  
  return useQuery({
    queryKey: ["myCourses"],
    queryFn: async () => {
      // Fetching my courses from server only
      const coursesData = await getMyCourses();

      // Update local cache for API calls (keep for getUserContext, etc.)
      localStorage.setItem("myCourses", JSON.stringify(coursesData));
      localStorage.setItem(
        "bookDetails",
        JSON.stringify(getBookDetails(coursesData))
      );

      return coursesData;
      },
    staleTime: 0,
    enabled: !!(profileId && token),
  });
};
