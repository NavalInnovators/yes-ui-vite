import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";
import SearchAndFilterBar from "./SearchAndFilterBar";
import { SkeletonGrid } from "./SkeletonCard";
import { useMyCourses } from "./sharedQuery";
import { useState } from "react";
import { getUserPlanForCourse } from "../utils/subscriptionUtils";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { isPro, isBasic, isFree } from "../utils/planUtils";

function MySubjects({ searchQuery, onSearch }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: myCourses, isLoading, isError } = useMyCourses();
  const [selectedCategory, setSelectedCategory] = useState("");

  // Handle upgrade functionality
  const handleUpgrade = async (course, plan) => {
    try {
      const courseForCart = {
        id: course.id,
        name: course.name,
        courseCodes: course.courseCodes || [],
        universityName: course.universityName || "",
        branchNames: course.branchNames || [],
        year: course.year || "",
      };

      toast.info(`Adding ${plan} plan to cart...`);

      await addToCart(courseForCart, plan, {
        source: "upgrade_from_my_subjects",
      });

      navigate("/mycart");
    } catch (error) {
      toast.error(`Failed to add ${plan} plan to cart`);
    }
  };
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
    <div className="new-dashboard-layout">
      <SearchAndFilterBar
        searchQuery={searchQuery}
        onSearch={onSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={(category) =>
          setSelectedCategory((prev) => (prev === category ? "" : category))
        }
      />
      
      {/* Main Content Area */}
      <div className="dashboard-main-content">
        {/* Courses Grid */}
        <div className="courses-grid full-width">
          {isLoading ? (
            <SkeletonGrid count={8} />
          ) : isError ? (
            <div className="error-message">Error loading your courses. Please try again!</div>
          ) : filteredSubjects.length === 0 ? (
            <div className="no-courses-message">No courses found.</div>
          ) : (
            filteredSubjects.map((subject, index) => {
              const plan = getUserPlanForCourse(subject.courseCodes[0]);
              const isProPlan = isPro(plan);
              const isBasicPlan = isBasic(plan);
              const isFreePlan = isFree(plan);

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
                        className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isProPlan
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : isBasicPlan
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                      >
                        {isProPlan ? "Pro Plan" : isBasicPlan ? "Basic Plan" : "Free Plan"}
                      </span>
                    </div>

                    <div className="text-lg font-bold text-gray-900 leading-snug">
                      {subject.name}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-xs text-gray-500">
                        {subject.universityName}
                      </div>
                      <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-xs text-gray-500 ">
                        Year {subject.year}
                      </div>
                      {subject.branchNames.slice(0, 1).map((branch, index) => (
                        <div
                          key={index}
                          className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-xs  text-gray-500 "
                        >
                          {branch}
                        </div>
                      ))}
                      {subject.courseCodes.slice(0, 1).map((courseCode, index) => (
                        <div
                          key={index}
                          className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-xs text-gray-500 "
                        >
                          {courseCode}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upgrade Buttons */}
                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-center gap-2">
                      {isFree && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpgrade(subject, "BASIC");
                          }}
                          className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 bg-[#ffffff] border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm active:scale-95 cursor-pointer"
                        >
                          Get Basic
                        </button>
                      )}
                      
                      {!isProPlan && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpgrade(subject, "PRO");
                          }}
                          className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 text-white hover:opacity-90 hover:shadow-lg active:scale-95 cursor-pointer border border-purple-300"
                          style={{background: 'linear-gradient(270deg,#feac2f,#9b32ad,#381ab2)'}}
                        >
                          Get Pro
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default MySubjects;
