import React from "react";

// Dynamic color mapping for the card background
const planColors = {
  "Pro Plan": "bg-green-600 text-white",
  "Upgrade to Pro":
    "bg-[linear-gradient(90deg,rgba(56,26,178,1)_12%,rgba(155,50,173,1)_44%,rgba(254,172,47,1)_86%)] text-white",
};

// Dynamic button style based on plan type
const buttonColors = {
  "Pro Plan": "bg-white text-green-700 hover:bg-green-50 hover:shadow-lg",
  "Upgrade to Pro": "bg-white text-black hover:opacity-90",
};

export default function Active_Courses_Card({
  courseName,
  credits,
  planType,
  purchaseDate,
  expiryDate,
}) {
  const cardColor = planColors[planType] || "bg-gray-200 text-black";
  const buttonStyle =
    buttonColors[planType] ||
    "bg-white text-black hover:bg-gray-100 hover:shadow-lg";

  return (
    <div
      className={`rounded-xl p-6 shadow-lg flex flex-col ${cardColor} transition-transform hover:scale-[1.02]`}
    >
      {/* Course Title */}
      <h2 className="font-bold text-lg md:text-xl truncate pb-1">
        {courseName}
      </h2>

      {/* Course Info */}
      <p className="text-sm md:text-base pb-8">{credits} | AKTU | CEE</p>

      {/* Dates + Button */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs md:text-sm">Purchase Date: {purchaseDate}</p>
          <p className="text-xs md:text-sm">Expires: {expiryDate}</p>
        </div>

        {/* Plan Button */}
        <button
          className={`
            mt-auto px-4 py-2 rounded-full text-sm font-semibold shadow-md 
            transition-all duration-200 ${buttonStyle}
          `}
        >
          {planType === "Pro Plan" ? "Upgrade to Pro" : "Enjoy Pro Features"}
        </button>
      </div>
    </div>
  );
}
