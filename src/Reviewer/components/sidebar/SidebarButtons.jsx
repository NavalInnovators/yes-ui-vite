import { NavLink } from "react-router-dom";
import DashBoardIcon from "../../icons/sidebar-icons/DashBoardIcon";
import SidebarNotificationIcon from "../../icons/sidebar-icons/SidebarNotificationIcon";
import PageIcon from "../../icons/sidebar-icons/PageIcon";
import Line from "../Line";

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

      <p className="text-[14px]">Management</p>
      <div className="flex flex-col gap-[10px]">
        <MyLink to="dashboard">
          <DashBoardIcon size={28} />
          <p className="">Dashboard</p>
        </MyLink>

        <MyLink to="notification">
          <SidebarNotificationIcon size={28} />
          <p>Notification</p>
        </MyLink>
      </div>

      <Line />

      <p className="text-[14px]">Review Answers</p>

      <div className="flex flex-col gap-[10px]">
        <MyLink to="new_qna">
          <PageIcon size={28} />
          <p>New Q&A</p>
        </MyLink>

        <MyLink to="reviewed_qna">
          <PageIcon size={28} />
          <p>Reviewed Q&A</p>
        </MyLink>
      </div>
    </div>
  );
}
