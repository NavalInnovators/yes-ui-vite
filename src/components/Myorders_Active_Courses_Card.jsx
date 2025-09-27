import React from "react";

// Dynamic color mapping for the card background
const planColors = {
  "Basic Plan": "bg-gradient-to-r from-cyan-200 to-blue-200 text-black",
  "Pro Plan": "bg-[linear-gradient(90deg,rgba(56,26,178,1)_12%,rgba(155,50,173,1)_44%,rgba(254,172,47,1)_86%)] text-white",
};

// Dynamic button style based on plan type
const buttonColors = {
  "Basic Plan": "bg-white text-purple-900 hover:opacity-90",
  "Pro Plan": "bg-white text-black hover:opacity-90",
};

export default function Active_Courses_Card({
  courseName,
  credits,
  planType,
  purchaseDate,
  expiryDate,
  onUpgrade,
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
          <p className="text-xs md:text-sm"> <b>Purchase Date: </b>{purchaseDate}</p>
          <p className="text-xs md:text-sm"><b>Expires On: </b>{expiryDate}</p>
        </div>

        {/* Plan Button */}
        {onUpgrade ? (
          <button
            onClick={onUpgrade}
            className={`
              mt-auto px-4 py-2 rounded-full text-sm font-semibold shadow-md 
              transition-all duration-200 ${buttonStyle}
            `}
          >
            Upgrade to Pro
          </button>
        ) : (
          <div className="mt-auto px-4 py-2 rounded-full text-sm font-semibold bg-white text-black text-center shadow-md">
            Pro Plan Active
          </div>
        )}
      </div>
    </div>
  );
}
