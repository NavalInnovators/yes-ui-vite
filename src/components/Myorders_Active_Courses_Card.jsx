import { useNavigate } from "react-router-dom";
import { getPlanColorClass, getPlanDisplayName } from "../utils/planUtils";

export default function Active_Courses_Card({
  courseName,
  courseCode,
  planType,
  purchaseDate,
  expiryDate,
  onUpgradeBasic,
  onUpgradePro,
  onCancel,
  branchNames,
  universityName,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (courseCode && courseCode !== "N/A") {
      navigate(`/book-dashboard?subcode=${courseCode}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="w-full bg-[#fafafa] rounded-2xl p-5 flex flex-col justify-between border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 cursor-pointer"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${getPlanColorClass(planType)}`}
          >
            {getPlanDisplayName(planType)}
          </span>
          {onCancel && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              className="px-3 py-1 text-[12px] font-semibold text-zinc-700 hover:bg-red-100 hover:text-red-600 rounded-md transition-all duration-300 cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

        <div className="text-lg font-bold text-gray-900 leading-snug">
          {courseName}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
            {courseCode}
          </div>
          <div className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
            {universityName || "AKTU"}
          </div>
          {Array.isArray(branchNames) && branchNames.length > 0 && (
            branchNames.slice(0, 2).map((branch, index) => (
              <div key={index} className="bg-gray-200 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase">
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
          <div className="flex gap-1 items-center text-gray-500">
            <span className="font-medium">Expires:</span>
            <span className="font-semibold">{expiryDate}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <div className="flex items-center gap-2">
          {onUpgradeBasic && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpgradeBasic();
              }}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 bg-[#ffffff] border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm active:scale-95 cursor-pointer"
            >
              Get Basic
            </button>
          )}
          {onUpgradePro && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpgradePro();
              }}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 text-white hover:opacity-90 hover:shadow-lg active:scale-95 cursor-pointer border border-purple-300"
              style={{background: 'linear-gradient(270deg,#feac2f,#9b32ad,#381ab2)'}}
            >
              Get Pro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
