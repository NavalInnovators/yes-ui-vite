import { Link } from "react-router-dom";

export default function TopGradientBar() {
  return (
    <div className="flex justify-between items-center py-[20px] px-[30px] bg-gradient-to-r from-[#381AB2] via-[#9B32AD] to-[#FEAC2F] text-[#fff]">
      <h1 className="text-[30px]">Submit Answer</h1>
      <Link to="/new_qna" className="text-[18px] cursor-pointer">
        Close
      </Link>
    </div>
  );
}
