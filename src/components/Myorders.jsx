import React from "react";
import GradientDiv from "../roles/components/GradientDiv";
import Active_Courses_Card from "./Myorders_Active_Courses_Card";
import Expired_Courses_Card from "./Myorders_Expired_Courses_Card";
import { useCart } from "../context/CartContext";

export default function Myorders() {
  const { orders, addUpgradeToCart } = useCart();

  // Create some dummy expired courses
  const expiredCourses = [
    {
      courseName: "Data Structures and Algorithms",
      credits: "KCS301",
      planType: "Basic Plan",
      purchaseDate: "Jan 15, 2023",
      expiryDate: "Jan 15, 2024",
    },
    {
      courseName: "Computer Networks",
      credits: "KCS302",
      planType: "Pro Plan",
      purchaseDate: "Feb 01, 2023",
      expiryDate: "Feb 01, 2024",
    },
    {
      courseName: "Database Management Systems",
      credits: "KCS303",
      planType: "Basic Plan",
      purchaseDate: "Mar 01, 2023",
      expiryDate: "Mar 01, 2024",
    },
  ];

  const handleUpgradeToPro = (order) => {
    addUpgradeToCart(order);
  };

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
          {orders.map((course, idx) => (
            <Active_Courses_Card 
              key={idx} 
              courseName={course.name}
              credits={course.courseCodes[0]}
              planType={course.plan === "Pro" ? "Pro Plan" : "Basic Plan"}
              purchaseDate={course.purchaseDate}
              expiryDate={course.expiryDate}
              onUpgrade={course.plan === "Basic" ? () => handleUpgradeToPro(course) : null}
            />
          ))}
        </div>
        <h1 className="text-2xl font-semibold py-8">Expired Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {expiredCourses.map((course, idx) => (
            <Expired_Courses_Card key={idx} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}
