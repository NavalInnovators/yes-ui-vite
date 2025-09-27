import React, { useState } from "react";

export default function Mycart_suggested_courses_card({
  title,
  credits,
  dept,
  hasBasic,
  onAddToCart,
}) {
  const [showSparkle, setShowSparkle] = useState(false);

  const handleAddToCart = (plan) => {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 1000);
    onAddToCart({ title, credits, dept }, plan);
  };

  const bgClass = hasBasic 
    ? "bg-gradient-to-r from-cyan-200 to-blue-200" 
    : "bg-gray-300";

  return (
    <div className={`w-64 flex-shrink-0 ${bgClass} text-black rounded-2xl shadow-md p-4 flex flex-col space-y-3 relative ${showSparkle ? 'animate-pulse' : ''}`}>
      {/* Title */}
      <h2 className="text-lg font-semibold truncate">{title}</h2>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-white text-xs font-medium px-2 py-1 rounded-full">
          AKTU
        </span>
        <span className="bg-white text-xs font-medium px-2 py-1 rounded-full">
          {credits} Credits
        </span>
        <span className="bg-white text-xs font-medium px-2 py-1 rounded-full">
          {dept}
        </span>
      </div>

      {/* Buttons */}
      {hasBasic ? (
        <button 
          onClick={() => handleAddToCart("Pro")}
          className="bg-white py-2 text-black font-semibold rounded-full px-4 text-xs hover:opacity-90 transition w-full"
        >
          Upgrade to Pro
        </button>
      ) : (
        <div className="buy-split-btn" role="group" aria-label="Buy plans">
          <button 
            onClick={() => handleAddToCart("Basic")}
            className="buy-btn buy-left"
          >
            Buy Basic
          </button>
          <button 
            onClick={() => handleAddToCart("Pro")}
            className="buy-btn buy-right"
          >
            Buy Pro
          </button>
        </div>
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
