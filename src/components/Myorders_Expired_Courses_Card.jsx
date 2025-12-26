import { isPro, isBasic } from "../utils/planUtils";

export default function Expired_Courses_Card({
  courseName,
  courseCode,
  planType,
  purchaseDate,
  expiryDate,
  isCancelled = false,
  universityName,
  branchNames,
}) {

  const isProPlan = isPro(planType);
  const isBasicPlan = isBasic(planType);

  return (
    <div
      className="w-full bg-gray-200 rounded-2xl p-5 flex flex-col justify-between border border-gray-300 transition-all duration-300 relative opacity-75"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isProPlan
                ? "bg-purple-100 text-purple-700 border border-purple-200"
                : isBasicPlan
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

        <div className="text-lg font-bold text-gray-700 leading-snug">
          {courseName}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <div className="bg-gray-300 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
            {courseCode}
          </div>
          <div className="bg-gray-300 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
            {universityName || "AKTU"}
          </div>
          {Array.isArray(branchNames) && branchNames.length > 0 && (
            branchNames.slice(0, 2).map((branch, index) => (
              <div key={index} className="bg-gray-300 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
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
    </div>
  );
}
