import React from "react";

export default function Mycart_suggested_courses_card({
  title,
  credits,
  dept,
}) {
  return (
    <div className="w-full max-w-md bg-gray-300 text-black rounded-2xl shadow-md p-4 flex flex-col space-y-3">
      {/* Title */}
      <h2 className="text-xl font-semibold truncate">{title}</h2>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-white text-xs font-medium px-2 py-1 rounded-full">
          AKTU
        </span>
        <span className="bg-white  text-xs font-medium px-2 py-1 rounded-full">
          {credits} Credits
        </span>
        <span className="bg-white text-xs font-medium px-2 py-1 rounded-full">
          {dept}
        </span>
      </div>

      {/* Button */}
      <button className="bg-white py-2 text-black font-semibold rounded-full px-4 text-xs hover:opacity-90 transition self-start w-full">
        Basic $118 / month
      </button>
    </div>
  );
}
