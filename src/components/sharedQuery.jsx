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
  return useQuery({
    queryKey: ["myCourses"],
    queryFn: async () => {
      try {
        // Fetching my courses from server
        const coursesData = await getMyCourses();

        // Update local cache
        localStorage.setItem("myCourses", JSON.stringify(coursesData));
        localStorage.setItem(
          "bookDetails",
          JSON.stringify(getBookDetails(coursesData))
        );

        return coursesData;
      } catch (error) {
        console.error(
          "Failed to fetch courses, falling back to localStorage",
          error
        );

        // Fallback: use cached data if available
        const cachedData = localStorage.getItem("myCourses");
        if (cachedData) {
          return JSON.parse(cachedData);
        }

        throw error;
      }
    },
    staleTime: 0,
  });
};
