import { Navigate, Route, Routes } from "react-router-dom";

import DashBoard from "./components/sidebar-pages/DashBoard";
import ReviewedQNA from "./components/sidebar-pages/ReviewedQNA";
import Notification from "./components/sidebar-pages/Notification";
import NewQNA from "./components/sidebar-pages/NewQNA";
import HomeLayout from "./HomeLayout";
import DraftPage from "./pages/draft_page/DraftPage";

function Reviewer() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="notification" element={<Notification />} />
        <Route path="new_qna" element={<NewQNA />} />
        <Route path="reviewed_qna" element={<ReviewedQNA />} />
      </Route>

      {/* Draft */}
      <Route path="/qna/:id" element={<DraftPage />} />
    </Routes>
  );
}

export default Reviewer;
