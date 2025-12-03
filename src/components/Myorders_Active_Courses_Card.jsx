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
  onCancel,
  branchName,
  universityName,
}) {
  const cardColor =
    planColors[planType] || "bg-gray-200 text-black border border-gray-300";
  const buttonStyle =
    buttonColors[planType] ||
    "bg-white text-black hover:bg-gray-100 hover:shadow-lg";

  return (
    <div
      className={`rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col ${cardColor}`}
    >
      {/* Course Title */}
      <h2 className="font-bold text-lg md:text-xl truncate pb-1">
        {courseName}
      </h2>

      {/* Course Info */}
      <p className="text-sm md:text-base pb-8">
        {credits} | {universityName || "AKTU"} | {branchName || "CSE"}
      </p>

      {/* Dates */}
      <div className="mb-4">
        <p className="text-xs md:text-sm">
          {" "}
          <b>Purchase Date: </b>
          {purchaseDate}
        </p>
        <p className="text-xs md:text-sm">
          <b>Expires On: </b>
          {expiryDate}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-auto">
        {/* Plan Button */}
        {onUpgrade ? (
          <button
            onClick={onUpgrade}
            className="flex-1 px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-200 bg-[linear-gradient(90deg,rgba(56,26,178,1)_12%,rgba(155,50,173,1)_44%,rgba(254,172,47,1)_96%)] text-white hover:scale-102"
          >
            Upgrade to Pro
          </button>
        ) : (
          <div className="flex-1 px-4 py-2 rounded-full text-sm font-semibold bg-white text-black text-center shadow-md">
            Pro Plan Active
          </div>
        )}

        {/* Cancel Button */}
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-red-500 text-white hover:bg-red-600 shadow-md transition-all duration-200 hover:scale-102"
            title="Cancel Subscription"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
