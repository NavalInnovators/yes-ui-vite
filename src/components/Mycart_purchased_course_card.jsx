import { useState } from "react";

export default function Mycart_purchased_course_card({
  title,
  credits,
  dept,
  plan,
  price,
  onRemove,
  onUpgrade,
}) {
  const [showSparkle, setShowSparkle] = useState(false);

  const handleUpgrade = () => {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 1000);
    onUpgrade();
  };

  // Handle both backend formats: "PRO"/"BASIC" and "Pro Plan"/"Basic Plan"
  const isPro =
    plan === "PRO" ||
    plan === "Pro Plan" ||
    plan?.toLowerCase().includes("pro");
  const bgClass = isPro
    ? "bg-[linear-gradient(90deg,rgba(56,26,178,1)_12%,rgba(155,50,173,1)_44%,rgba(254,172,47,1)_86%)]"
    : "bg-gradient-to-r from-cyan-200 to-blue-200";
  const textClass = isPro ? "text-white" : "text-black";

  return (
    <div
      className={`w-full max-w-md relative flex items-center justify-between ${bgClass} ${textClass} rounded-2xl shadow-md p-4 ${
        showSparkle ? "animate-pulse" : ""
      }`}
    >
      {/* Remove button */}
      <button
        onClick={onRemove}
        className={`absolute top-2 right-2 ${
          isPro
            ? "text-white hover:text-red-300"
            : "text-gray-600 hover:text-red-600"
        } transition-colors`}
      >
        ✕
      </button>

      {/* Left side */}
      <div className="flex items-center space-x-3 pr-8">
        <div>
          <h2 className="text-sm font-semibold truncate max-w-[150px]">
            {title}
          </h2>
          <p className={`text-xs ${isPro ? "text-gray-200" : "text-gray-600"}`}>
            AKTU · {credits} · {dept}
          </p>
          <p
            className={`text-xs font-medium ${
              isPro ? "text-gray-100" : "text-gray-700"
            } mt-1`}
          >
            {plan?.includes("Plan")
              ? plan
              : `${
                  plan === "BASIC" ? "Basic" : plan === "PRO" ? "Pro" : plan
                } Plan`}{" "}
            - ₹{price}
          </p>
        </div>
      </div>

      {/* Right side - Upgrade button only for Basic plans */}
      {!isPro && (
        <button
          onClick={handleUpgrade}
          className="bg-white text-purple-900 font-semibold rounded-full px-3 py-1 text-xs hover:opacity-90 transition"
        >
          Upgrade to Pro
        </button>
      )}

      {/* Sparkle effect */}
      {showSparkle && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-4xl animate-bounce">✨</div>
        </div>
      )}
    </div>
  );
}
