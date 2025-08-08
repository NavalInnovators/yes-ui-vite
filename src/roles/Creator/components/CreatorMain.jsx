import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NewQnA from "../pages/NewQnA";
import Pending from "../pages/Pending";
import Reviewed from "../pages/Reviewed";
import YourEarning from "../pages/YourEarning";

export default function CreatorMain() {
  return (
    <div className="flex-1 overflow-y-auto w-screen p-[20px] dark:bg-black">
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="new_qna" element={<NewQnA />} />
          <Route path="pending" element={<Pending />} />
          <Route path="reviewed" element={<Reviewed />} />
          <Route path="your_earning" element={<YourEarning />} />
        </Routes>
      </div>
    </div>
  );
}
