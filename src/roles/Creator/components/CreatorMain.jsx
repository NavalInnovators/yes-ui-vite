import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import NewQnA from "../pages/NewQnA";
import Pending from "../pages/Pending";
import Reviewed from "../pages/Reviewed";
import YourEarning from "../pages/YourEarning";
import SubmitAnswer from "../pages/SubmitAnswer";
import { useContext } from "react";
import WindowWidthContext from "../context/WindowWidthContext";

export default function CreatorMain() {
  const windowWidth = useContext(WindowWidthContext);
  const is600px = windowWidth < 600;
  const padding = is600px ? "p-[17px]" : "p-[20px]";

  return (
    <div className={`flex-1 min-h-[calc(100vh-64px-63px)] overflow-y-auto w-screen ${padding} dark:bg-black`}>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="new_qna" element={<NewQnA />}>
            <Route path="submit-answer/:id" element={<SubmitAnswer />} />
          </Route>
          <Route path="pending" element={<Pending />} />
          <Route path="reviewed" element={<Reviewed />} />
          <Route path="your_earning" element={<YourEarning />} />
        </Routes>
      </div>
    </div>
  );
}
