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
        `flex items-center text-[13px] transition-transform hover:scale-[1.07] justify-start gap-[15px] rounded-2xl px-[15px] py-[10px] ml-[-3px] ${
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
    <div className="flex flex-col gap-[15px]">
      <Line />

      <MyLink to="dashboard">
        <DashBoardIcon size={21} />
        <p className="">Dashboard</p>
      </MyLink>

      <MyLink to="new_qna">
        <FileText size={21} />
        <p>New Q&A</p>
      </MyLink>

      <MyLink to="pending">
        <FileWarning size={21} />
        <p>Pending</p>
      </MyLink>

      <MyLink to="reviewed">
        <FilePenLine size={21} />
        <p>Reviewed Q&A</p>
      </MyLink>

      <MyLink to="your_earning">
        <CircleDollarSign size={21} />
        <p>Your Earning</p>
      </MyLink>
    </div>
  );
}
