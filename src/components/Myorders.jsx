import React from "react";
import GradientDiv from "../roles/components/GradientDiv";
import Active_Courses_Card from "./Myorders_Active_Courses_Card";
import Expired_Courses_Card from "./Myorders_Expired_Courses_Card";

export default function Myorders() {
  const courses = [
    {
      courseName: "Data Management and Entrepreneurship",
      credits: "KHU702",
      planType: "Pro Plan",
      purchaseDate: "Jan 15, 2024",
      expiryDate: "Jan 15, 2025",
    },
    {
      courseName: "Data Warehouse and Data Mining",
      credits: "KCS023",
      planType: "Pro Plan",
      purchaseDate: "Jan 15, 2024",
      expiryDate: "Jan 15, 2025",
    },
    {
      courseName: "Data Warehouse and Data Mining",
      credits: "KOE829",
      planType: "Upgrade to Pro",
      purchaseDate: "Jan 15, 2024",
      expiryDate: "Jan 15, 2025",
    },
    {
      courseName: "Data Warehouse and Data Mining",
      credits: "KAC012",
      planType: "Upgrade to Pro",
      purchaseDate: "Jan 16, 2024",
      expiryDate: "Jan 15, 2025",
    },
    {
      courseName: "Machine Learning Basics",
      credits: "KOE123",
      planType: "Pro Plan",
      purchaseDate: "Feb 01, 2024",
      expiryDate: "Feb 01, 2025",
    },
    {
      courseName: "Advanced Algorithms",
      credits: "KCS567",
      planType: "Upgrade to Pro",
      purchaseDate: "Mar 01, 2024",
      expiryDate: "Mar 01, 2025",
    },
  ];

  return (
    <div className="w-full min-h-screen pt-24 md:pt-28">
      {" "}
      {/* pushes below navbar */}
      <div className="text-xl font-regular mb-6">
        <GradientDiv> <div className="mx-12">My Orders</div></GradientDiv>
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
