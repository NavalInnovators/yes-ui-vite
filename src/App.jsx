import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Myorders from "./components/Myorders.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  Navbar,
  Testimonials,
  Footer,
  Login,
  SubmitQueryProfile,
  Notifications,
  EducationDetailsEdit,
  UserDashboard,
  CareerJob,
  CareerBlog,
  ContactPage,
  BookDashboard,
  AllQuery,
  SubmitQuery,
  Review,
  CompanyPage,
} from "./components/index.jsx";
import PaymentCompletion from "./components/PaymentCompletion/PaymentCompletion.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";
// separate import because the component is in a folder of the same name
import ServicesPage from "./components/ServicesPage/ServicesPage.jsx";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";

import FAQPage from "./pages/FAQPage/FAQPage.jsx";
import MembershipPage from "./components/MembershipPage.jsx";
import NewProfile from "./components/ProfilePage/Profile.jsx";
import EditProfile from "./components/ProfilePage/EditProfile.jsx";
import OtpVerificationPage from "./pages/OtpVerification/OtpVerificationPage.jsx";
import LoginSignupGaurd from "./Auth/LoginSignupGaurd.jsx";
import { BookDashboardProvider } from "./context/book-dashboard-context.jsx";
import Reviewer from "./roles/Reviewer/Reviewer.jsx";
import "./main.css";
import Creator from "./roles/Creator/Creator.jsx";
import Admin from "./roles/Admin/Admin.jsx";

function App() {
  return (
    <div>
      <ToastContainer />
      <Analytics />
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  const shouldRenderNavbar =
    !location.pathname.startsWith("/reviewer") &&
    !location.pathname.startsWith("/creator");

  return (
    <div>
      {/* ToastContainer is placed outside Router to avoid unnecessary re-renders */}
      {shouldRenderNavbar && <Navbar />}
      <ScrollToTop /> {/* makes any page scroll to top when loaded */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/reviewer/*" element={<Reviewer />} />
        <Route path="/creator/*" element={<Creator />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route
          path="/login"
          element={
            <LoginSignupGaurd>
              <Login />
            </LoginSignupGaurd>
          }
        />
        <Route
          path="/signup"
          element={
            <LoginSignupGaurd>
              <Login />
            </LoginSignupGaurd>
          }
        />
        <Route path="/profile" element={<NewProfile />} />
        {/* TODO: login page not behaving as expected */}
        <Route
          path="/membership-auth"
          element={
            <ProtectedRoutes>
              {/* <MembershipProfile /> */}
            </ProtectedRoutes>
          }
        />
        {/* These are the pages that were built earlier by Sachin */}
        <Route path="/query" element={<SubmitQueryProfile />} />
        <Route path="/make-query" element={<SubmitQueryProfile />} />
        <Route path="/expanded-query" element={<SubmitQueryProfile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/edit-education" element={<EducationDetailsEdit />} />
        <Route path="/edit-password" element={<EditProfile />} />
        {/* doubt */}
        {/* used */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/all-subjects" element={<UserDashboard />} />
        <Route path="/my-subjects" element={<UserDashboard />} />
        {/* till here */}
        <Route
          path="/book-dashboard"
          element={
            <BookDashboardProvider>
              <BookDashboard />
            </BookDashboardProvider>
          }
        />
        <Route path="/otp-verification" element={<OtpVerificationPage />} />
        <Route path="/verification-detail" element={<Login />} />
        <Route path="/careerJob-page" element={<CareerJob />} />
        {/* doubt */}
        <Route path="/career" element={<CareerBlog />} />
        <Route path="/book-dashboard" element={<BookDashboard />} />
        <Route path="/otp-verification" element={<Login />} />
        {/* <Route path="/resolve-query" element={<ResolveQuery />} /> */}
        <Route path="/all-query" element={<AllQuery />} />
        <Route path="/verification-detail" element={<Login />} />
        <Route path="/submit-query" element={<SubmitQuery />} />/
        <Route path="/review" element={<Review />} />
        <Route path="/myorders" element={<Myorders />}></Route>
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/payment-completion" element={<PaymentCompletion />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/reset-password" element={<Login />} />
        <Route path="/new-password-page" element={<Login />} />
        {/* TODO  */}
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {shouldRenderNavbar && <Footer />}
    </div>
  );
}

export default App;
