import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import DashBoard from "./components/sidebar-pages/DashBoard";
import Notification from "./components/sidebar-pages/Notification";
import HomeLayout from "./HomeLayout";
import { AnimatePresence } from "motion/react";
import { DarkModeProvider } from "./context/DarkModeContext";
import QueryManagement from "./components/sidebar-pages/QueryManagement";
import QueryThread from "./components/sidebar-pages/QueryThread";
import FormsManagement from "./components/sidebar-pages/FormsManagement";
import UserManagement from "./components/sidebar-pages/UserManagement";
import UserProfile from "./components/sidebar-pages/UserProfile";

function Admin() {
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    console.log("Admin path detected:", location.pathname);
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
            <Route path="query_management" element={<QueryManagement />} />
            <Route path="query_management/:id" element={<QueryThread />} />
            <Route path="forms_management" element={<FormsManagement />} />
            <Route path="user_management" element={<UserManagement />} />
            <Route path="user_management/:id" element={<UserProfile />} />

            <Route path="notification" element={<Notification />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </DarkModeProvider>
  );
}

export default Admin;