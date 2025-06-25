import { useQuery } from '@tanstack/react-query';
import { getMyCourses } from '../api/api';

export const getBookDetails = (allCoursesData) => {
    if (!allCoursesData) {
        return {};
    }

    if (allCoursesData.length > 0) {
        return allCoursesData.reduce((bookDetails, course) => {
            // For each course code in the courseCodes array
            course.courseCodes.forEach(code => {
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
    }
};


export const useMyCourses = () => {
    return useQuery({
        queryKey: ["myCourses"],
        queryFn: async () => {
            try {
                if (localStorage.getItem('myCourses')) {
                    return JSON.parse(localStorage.getItem('myCourses') || '[]');
                }
                else {
                    const coursesData = await getMyCourses();
                    localStorage.setItem('myCourses', JSON.stringify(coursesData));
                    if (coursesData) {
                        const bookDetails = getBookDetails(coursesData);
                        localStorage.setItem('bookDetails', JSON.stringify(bookDetails));
                    }
                    return coursesData;
                }
            } catch (error) {
                const cachedData = localStorage.getItem('myCourses') || '[]';
                if (cachedData) {
                    return JSON.parse(cachedData);
                }
                throw error;
            }
        },
        // enabled: !localStorage.getItem('myCourses'),
    });
};