import React from "react";
import GradientDiv from "../roles/components/GradientDiv";
import Active_Courses_Card from "./Myorders_Active_Courses_Card";
import Expired_Courses_Card from "./Myorders_Expired_Courses_Card";

export default function Myorders() {
  const courses = [
    {
      courseName: "Data Management and Entrepreneurship",
      credits: "4 Credits",
      planType: "Pro Plan",
      purchaseDate: "Jan 15, 2024",
      expiryDate: "Jan 15, 2025",
    },
    {
      courseName: "Data Warehouse and Data Mining",
      credits: "4 Credits",
      planType: "Pro Plan",
      purchaseDate: "Jan 15, 2024",
      expiryDate: "Jan 15, 2025",
    },
    {
      courseName: "Data Warehouse and Data Mining",
      credits: "4 Credits",
      planType: "Upgrade to Pro",
      purchaseDate: "Jan 15, 2024",
      expiryDate: "Jan 15, 2025",
    },
    {
      courseName: "Data Warehouse and Data Mining",
      credits: "4 Credits",
      planType: "Upgrade to Pro",
      purchaseDate: "Jan 16, 2024",
      expiryDate: "Jan 15, 2025",
    },
    {
      courseName: "Machine Learning Basics",
      credits: "3 Credits",
      planType: "Pro Plan",
      purchaseDate: "Feb 01, 2024",
      expiryDate: "Feb 01, 2025",
    },
    {
      courseName: "Advanced Algorithms",
      credits: "4 Credits",
      planType: "Upgrade to Pro",
      purchaseDate: "Mar 01, 2024",
      expiryDate: "Mar 01, 2025",
    },
  ];

  return (
    <div className="w-full min-h-screen pt-24 md:pt-28">
      {" "}
      {/* pushes below navbar */}
      <div className="text-2xl font-semibold mb-6">
        <GradientDiv>My Orders</GradientDiv>
      </div>
      <div className="w-[90%] mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Active Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course, idx) => (
            <Active_Courses_Card key={idx} {...course} />
          ))}
        </div>
        <h1 className="text-2xl font-semibold py-8">Expired Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course, idx) => (
            <Expired_Courses_Card key={idx} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}
