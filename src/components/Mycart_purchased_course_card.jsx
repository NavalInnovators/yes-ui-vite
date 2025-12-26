import { isPro, getPlanDisplayName } from "../utils/planUtils";

export default function Mycart_purchased_course_card({
  title,
  courseCode,
  branchNames,
  plan,
  price,
  onRemove,
  onUpgrade,
}) {
  const isProPlan = isPro(plan);

  return (
    <div className="w-full bg-[#fafafa] rounded-2xl p-4 flex flex-col justify-between border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2">
            <h3 className="text-lg font-bold text-gray-900 leading-snug mb-1 line-clamp-2">
              {title}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
                {Array.isArray(courseCode) ? courseCode[0] : courseCode || "N/A"}
              </div>
              {Array.isArray(branchNames) && branchNames.length > 0 && (
                branchNames.slice(0, 2).map((branch, index) => (
                  <div key={index} className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
                    {branch}
                  </div>
                ))
              )}
              <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
                AKTU
              </div>
            </div>
          </div>
          <button
            onClick={onRemove}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 border border-transparent hover:border-red-100 cursor-pointer"
            aria-label="Remove"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 mt-6 border-t border-gray-100">
        <div className="flex flex-col gap-0.5">
          <span
            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider w-fit ${isProPlan
              ? "bg-purple-100 text-purple-700 border border-purple-200"
              : "bg-blue-100 text-blue-700 border border-blue-200"
              }`}
          >
            {getPlanDisplayName(plan)}
          </span>
          <span className="text-xl font-extrabold text-gray-900">₹{price}</span>
        </div>

        {!isProPlan && (
          <button
            onClick={onUpgrade}
            className="px-6 py-2.5 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-sm hover:opacity-90 hover:shadow-lg active:scale-95 cursor-pointer border border-purple-300"
            style={{background: 'linear-gradient(270deg,#feac2f,#9b32ad,#381ab2)'}}
          >
            Upgrade to Pro
          </button>
        )}
      </div>
    </div>
  );
}
