import { useState } from "react";

export default function Mycart_suggested_courses_card({
  course,
  title,
  courseCode,
  branchNames,
  hasBasic,
  onAddToCart,
}) {
  const [showSparkle, setShowSparkle] = useState(false);

  const handleAddToCart = (plan) => {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 1000);
    onAddToCart(course, plan);
  };

  return (
    <div className="w-64 flex-shrink-0 bg-[#fafafa] rounded-2xl p-5 flex flex-col justify-between border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 relative">
      <div className="flex flex-col gap-3">
        <div className="text-lg font-bold text-gray-900 leading-snug">
          {title}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {courseCode && (
            <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
              {courseCode}
            </div>
          )}
          <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
            AKTU
          </div>
          {Array.isArray(branchNames) && branchNames.length > 0 && 
            branchNames.slice(0, 2).map((branch, index) => 
              branch && (
                <div key={index} className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
                  {branch}
                </div>
              )
            )
          }
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        {hasBasic ? (
          <button
            onClick={() => handleAddToCart("PRO")}
            className="w-full py-2.5 bg-zinc-900 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-sm hover:bg-black hover:shadow-lg active:scale-95 cursor-pointer"
          >
            Upgrade to Pro
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAddToCart("BASIC")}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 bg-[#ffffff] border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm active:scale-95 cursor-pointer"
            >
              Buy Basic
            </button>
            <button
              onClick={() => handleAddToCart("PRO")}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 bg-zinc-900 text-white hover:bg-black hover:shadow-lg active:scale-95 cursor-pointer"
            >
              Buy Pro
            </button>
          </div>
        )}
      </div>

      {/* Sparkle effect */}
      {showSparkle && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-4xl animate-bounce">✨</div>
        </div>
      )}
    </div>
  );
}
