import { NavLink } from "react-router-dom";
import {
  CircleDollarSign,
  FilePenLine,
  FileText,
  FileWarning,
} from "lucide-react";

import DashBoardIcon from "../../../components/icons/sidebar-icons/DashBoardIcon";
import Line from "../../../components/Line";

function MyLink({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center transition-transform hover:scale-[1.07] justify-start gap-[20px] rounded-2xl px-[15px] py-[10px] ml-[-3px] ${
          isActive
            ? "bg-gray-100 text-black dark:text-white dark:bg-dark-highlight"
            : "text-gray-500 dark:text-dark-text-muted"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function SidebarButtons() {
  return (
    <div className="flex flex-col gap-[20px]">
      <Line />

      <MyLink to="dashboard">
        <DashBoardIcon size={28} />
        <p className="">Dashboard</p>
      </MyLink>

      <MyLink to="new_qna">
        <FileText />
        <p>New Q&A</p>
      </MyLink>

      <MyLink to="pending">
        <FileWarning />
        <p>Pending</p>
      </MyLink>

      <MyLink to="reviewed">
        <FilePenLine />
        <p>Reviewed Q&A</p>
      </MyLink>

      <MyLink to="your_earning">
        <CircleDollarSign />
        <p>Your Earning</p>
      </MyLink>
    </div>
  );
}
