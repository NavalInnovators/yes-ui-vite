import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import DashBoard from "./components/sidebar-pages/DashBoard";
import ReviewedQNA from "./components/sidebar-pages/ReviewedQNA";
import Notification from "./components/sidebar-pages/Notification";
import NewQNA from "./components/sidebar-pages/NewQNA";
import HomeLayout from "./HomeLayout";
import DraftPage from "./pages/draft_page/DraftPage";
import { AnimatePresence } from "motion/react";
import { DarkModeProvider } from "./context/DarkModeContext";

function Reviewer() {
  const location = useLocation();

  if (location.pathname.startsWith("/reviewer")) {
    console.log("Reviewer path detected:", location.pathname);
    document.documentElement.overflowX = "hidden";
    document.documentElement.overflowY = "hidden";

    document.body.overflowX = "hidden";
    document.body.overflowY = "hidden";
  }

  return (
    <DarkModeProvider>
      <AnimatePresence>
        <Routes location={location}>
          {/* Home */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<DashBoard />} />

            <Route path="notification" element={<Notification />} />

            <Route path="new_qna" element={<NewQNA />}>
              {/* Draft Page */}
              <Route path="qna/:id" element={<DraftPage />} />
            </Route>

            <Route path="reviewed_qna" element={<ReviewedQNA />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </DarkModeProvider>
  );
}

export default Reviewer;
