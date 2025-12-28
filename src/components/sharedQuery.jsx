import { useQuery } from "@tanstack/react-query";
import { getMyCourses } from "../api/api";
import { ensureSubscriptionsLoaded } from "../utils/subscriptionUtils";
import tokenStorage from "../utils/tokenStorage";

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
  const profileId = tokenStorage.getProfileId();
  const token = tokenStorage.getToken();
  
  return useQuery({
    queryKey: ["myCourses", "subscriptions"],
    queryFn: async () => {
      // Load both courses and subscriptions
      const [coursesData, subscriptionsData] = await Promise.all([
        getMyCourses(),
        ensureSubscriptionsLoaded()
      ]);

      // Sort courses based on subscription purchase dates (newest first)
      const sortedCourses = coursesData.sort((a, b) => {
        const subA = subscriptionsData.find(sub => 
          sub.course?.name === a.name && sub.status === 'ACTIVE'
        );
        const subB = subscriptionsData.find(sub => 
          sub.course?.name === b.name && sub.status === 'ACTIVE'
        );
        if (subA && subB) {
          return new Date(subB.purchaseDate) - new Date(subA.purchaseDate);
        }
        if (subA && !subB) return -1;
        if (!subA && subB) return 1;
        
        return 0;
      });

      // Update local cache for API calls (keep for getUserContext, etc.)
      localStorage.setItem("myCourses", JSON.stringify(sortedCourses));
      localStorage.setItem(
        "bookDetails",
        JSON.stringify(getBookDetails(sortedCourses))
      );

      return sortedCourses;
      },
    staleTime: 0,
    enabled: !!(profileId && token),
  });
};
