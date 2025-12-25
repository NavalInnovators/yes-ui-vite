import React, { useState } from "react";
import { toast } from "react-toastify";

const AllSubjects_CourseCard = ({
    course,
    myCourses,
    navigate,
    mutateEnroll,
    isEnrolling,
    handleBuyClick,
}) => {
    const [selectedPlan, setSelectedPlan] = useState("FREE");

    const handleAction = (e) => {
        e.stopPropagation();

        if (selectedPlan === "FREE") {
            sessionStorage.setItem("selectedCourseCode", course.courseCodes[0]);

            const courseExists = myCourses.some(
                (tempCourse) => tempCourse.id === course.id
            );

            if (courseExists) {
                navigate(`/book-dashboard?subcode=${course.courseCodes[0]}`);
                return;
            }

            if (!localStorage.getItem("token")) {
                navigate("/login");
                return;
            }

            console.log("Have token!");
            toast.info("Enrolling in the course... Please wait", {
                autoClose: false,
            });
            mutateEnroll(course);
        } else {
            // Basic or Pro Plan Logic - Add to Cart
            handleBuyClick(course, selectedPlan);
        }
    };

    return (
        <div className="w-full min-h-[320px] bg-[#fafafa] rounded-2xl p-6 flex flex-col justify-between border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
            <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                    <div className="text-lg font-bold text-gray-900 leading-snug mb-1">
                        {course.name}
                    </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    <div className="bg-gray-200 inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium text-gray-500">
                        {course.universityName}
                    </div>
                    <div className="bg-gray-200 inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium text-gray-500">
                        Year {course.year}
                    </div>
                    {course.branchNames?.map((branch, index) => (
                        <div
                            className="bg-gray-200 inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium text-gray-500"
                            key={`branch-${index}`}
                        >
                            {branch}
                        </div>
                    ))}
                    {course.courseCodes?.map((courseCode, index) => (
                        <div
                            className="bg-gray-200 inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium text-gray-500"
                            key={`code-${index}`}
                        >
                            {courseCode}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3 mt-4">
                <div className="flex flex-col gap-2.5">
                    <div className="flex gap-1 bg-gray-200 p-1 rounded-lg">
                        {["FREE", "BASIC", "PRO"].map((plan) => (
                            <label key={plan} className="flex-1 relative cursor-pointer">
                                <input
                                    type="radio"
                                    name={`plan_${course.id}`}
                                    value={plan}
                                    checked={selectedPlan === plan}
                                    onChange={() => setSelectedPlan(plan)}
                                    className="absolute opacity-0 w-0 h-0"
                                />
                                <span
                                    className={`flex items-center justify-center w-full py-2 text-sm font-semibold rounded-md transition-all duration-200 ${selectedPlan === plan
                                        ? "bg-[#ffffff] text-gray-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    {plan === "FREE" ? "Free" : plan === "BASIC" ? "Basic" : "Pro"}
                                </span>
                            </label>
                        ))}
                    </div>

                    <button
                        className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center cursor-pointer signature-gradient-border text-gray-900 hover:shadow-md hover:-translate-y-0.5    ${isEnrolling && selectedPlan === "FREE" ? "opacity-70 cursor-not-allowed" : ""}`}
                        onClick={isEnrolling && selectedPlan === "FREE" ? null : handleAction}
                        disabled={isEnrolling && selectedPlan === "FREE"}
                    >
                        {selectedPlan === "FREE" ? (
                            <>
                                Start Learning
                            </>
                        ) : (
                            <>
                                Add to Cart
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllSubjects_CourseCard;
