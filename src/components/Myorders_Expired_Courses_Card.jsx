import React from "react";

export default function Expired_Courses_Card({
  courseName,
  credits,
  purchaseDate,
  expiryDate,
}) {
  return (
    <div className="rounded-xl p-6 shadow-lg flex flex-col bg-gray-300 border border-gray-300 transition-transform hover:scale-[1.02] w-full">
      {/* Title */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-lg md:text-xl truncate">{courseName}</h2>
      </div>

      {/* Course Info */}
      <p className="text-sm md:text-base pb-8">{credits} | AKTU | CEE</p>

      {/* Dates + Grey pill */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs md:text-sm">Purchase Date: {purchaseDate}</p>
          <p className="text-xs md:text-sm">Expired on: {expiryDate}</p>
        </div>
        {/* Grey status pill */}
        <span className="mt-auto px-3 py-1 rounded-full text-sm font-semibold bg-gray-400 text-white">
          Expired
        </span>
      </div>

      {/* Start Learning button (active) */}
      <button className="w-full px-3 py-3 rounded-4xl bg-gray-50 hover:bg-white text-black font-semibold">
        Start Learning
      </button>
    </div>
  );
}
