import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

export default function CreatorMain() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="new_qna" element={<NewQnA />} />
        <Route path="pending" element={<Pending />} />
        <Route path="reviewed" element={<Reviewed />} />
        <Route path="your_earning" element={<Your Earning />} />
      </Routes>
    </div>
  );
}
