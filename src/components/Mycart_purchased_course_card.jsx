export default function Mycart_purchased_course_card({ title, credits, dept }) {
  return (
    <div className="w-full max-w-md flex items-center justify-between bg-[linear-gradient(90deg,rgba(56,26,178,1)_12%,rgba(155,50,173,1)_44%,rgba(254,172,47,1)_86%)] text-white rounded-2xl shadow-md p-4">
      {/* Left side */}
      <div className="flex items-center space-x-3">
        <div>
          <h2 className="text-sm font-semibold truncate max-w-[150px]">
            {title}
          </h2>
          <p className="text-xs text-gray-200">
            AKTU · {credits} Credits · {dept}
          </p>
        </div>
      </div>

      {/* Right side */}
      <button className="bg-white text-purple-900 font-semibold rounded-full px-3 py-1 text-xs hover:opacity-90 transition">
        Upgrade to Pro
      </button>
    </div>
  );
}
