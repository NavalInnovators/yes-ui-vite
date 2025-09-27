import GradientDiv from "../roles/components/GradientDiv";
import Mycart_purchased_course_card from "./Mycart_purchased_course_card";
import OrderSummary from "./Mycart_ordersummary";
import Mycart_suggested_courses_card from "./Mycart_suggested_courses_card";

export default function Mycart() {
  const courses = [
    {
      image: "https://via.placeholder.com/40",
      title: "Project Management and",
      credits: 4,
      dept: "CSE",
    },
    {
      image: "https://via.placeholder.com/40",
      title: "Data Warehouse and Data Mining",
      credits: 4,
      dept: "CEE",
    },
    {
      image: "https://via.placeholder.com/40",
      title: "Digital Innovation & Entrepreneurship",
      credits: 4,
      dept: "CSE",
    },
    {
      image: "https://via.placeholder.com/40",
      title: "Project Management and",
      credits: 4,
      dept: "CSE",
    },
    {
      image: "https://via.placeholder.com/40",
      title: "Data Warehouse and Data Mining",
      credits: 4,
      dept: "CEE",
    },
    {
      image: "https://via.placeholder.com/40",
      title: "Digital Innovation & Entrepreneurship",
      credits: 4,
      dept: "CSE",
    },
  ];

  return (
    <div className="w-full min-h-screen pt-20 md:pt-28">
      {/* Top banner */}
      <GradientDiv>
        <div className="py-6 px-4 md:py-10">
          <span className="text-lg md:text-2xl font-semibold block">
            Your savings on this order could be maximized!
          </span>
          <span className="text-yellow-400 text-xs md:text-sm">
            Add 1 or 2 more courses to unlock bundle discount
          </span>
        </div>
      </GradientDiv>

      {/* Main content */}
      <div className="px-4 py-6 md:p-10 md:flex gap-6">
        {/* Left side */}
        <div className="w-full md:w-[70%]" id="left-section">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold py-4 md:py-6">
              Review Your Order
            </h1>
            <div className="grid gap-3 md:grid-cols-2">
              {courses.map((course, idx) => (
                <Mycart_purchased_course_card key={idx} {...course} />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-4xl font-bold py-4 md:py-6">
              Suggested Courses to add
            </h1>
            <div className="grid gap-3 md:grid-cols-2">
              {courses.map((course, idx) => (
                <Mycart_suggested_courses_card key={idx} {...course} />
              ))}
            </div>
          </div>

          {/* Coupon Code Section */}
          <div className="mt-8 w-full flex flex-col items-start">
            <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">
              Enter Coupon Code
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-[30%] items-stretch sm:items-center">
              <input
                type="text"
                placeholder="Enter your code"
                className="w-full sm:w-auto flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition shadow-lg">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full md:w-[30%] mt-8 md:mt-0 flex items-start md:items-center">
          <div className="w-full h-auto md:h-[80%] mx-auto">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
