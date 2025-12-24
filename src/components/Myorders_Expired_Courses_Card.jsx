import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Expired_Courses_Card({
  course,
  courseName,
  courseCode,
  planType,
  purchaseDate,
  expiryDate,
  onAction,
  isCancelled = false,
  universityName,
  branchNames,
}) {
  const [selectedPlan, setSelectedPlan] = useState("FREE");
  const navigate = useNavigate();

  const isPro = planType === "Pro Plan";
  const isBasic = planType === "Basic Plan";

  return (
    <div
      className={`w-full bg-[#fafafa] rounded-2xl p-5 flex flex-col justify-between border transition-all duration-300 ${isCancelled
        ? "border-orange-200 bg-orange-50/10"
        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
        }`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isPro
                ? "bg-purple-100 text-purple-700 border border-purple-200"
                : isBasic
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}
            >
              {planType}
            </span>

            <span
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isCancelled
                ? "bg-orange-100 text-orange-700 border border-orange-200"
                : "bg-red-50 text-red-600 border border-red-100"
                }`}
            >
              {isCancelled ? "Cancelled" : "Expired"}
            </span>
          </div>
        </div>

        <div className="text-lg font-bold text-gray-900 leading-snug">
          {courseName}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
            {courseCode}
          </div>
          <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
            {universityName || "AKTU"}
          </div>
          {Array.isArray(branchNames) && branchNames.length > 0 && (
            branchNames.slice(0, 2).map((branch, index) => (
              <div key={index} className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
                {branch}
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col gap-1 mt-1 text-[13px]">
          <div className="flex gap-1 items-center text-gray-500">
            <span className="font-medium">Purchased:</span>
            <span className="font-semibold">{purchaseDate}</span>
          </div>
          {!isCancelled && (
            <div className="flex gap-1 items-center text-gray-500">
              <span className="font-medium">Expired:</span>
              <span className="font-semibold">{expiryDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Plan Selection & Action */}
      {/* 
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex gap-1 bg-gray-200 p-1 rounded-xl">
          {["FREE", "BASIC", "PRO"].map((plan) => (
            <label key={plan} className="flex-1 relative cursor-pointer">
              <input
                type="radio"
                name={`plan_${course?.id || courseCode}`}
                value={plan}
                checked={selectedPlan === plan}
                onChange={() => setSelectedPlan(plan)}
                className="absolute opacity-0 w-0 h-0"
              />
              <span
                className={`flex items-center justify-center w-full py-2 text-[10px] font-bold rounded-lg transition-all duration-200 ${selectedPlan === plan
                  ? "bg-[#ffffff] text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                {plan}
              </span>
            </label>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAction(selectedPlan);
          }}
          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300 active:scale-95 cursor-pointer ${selectedPlan === "FREE"
            ? "bg-[#ffffff] border border-gray-300 hover:border-gray-400/70 text-gray-700 hover:shadow-sm"
            : "bg-black text-white hover:bg-zinc-800 border border-black hover:shadow-md"
            }`}
        >
          {selectedPlan === "FREE" ? "Re-enroll Free" : "Buy & Re-enroll"}
        </button>
      </div>
      */}
    </div>
  );
}
