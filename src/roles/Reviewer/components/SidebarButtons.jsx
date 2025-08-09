import DashBoardIcon from "../../components/icons/sidebar-icons/DashBoardIcon";
import SidebarNotificationIcon from "../../components/icons/sidebar-icons/SidebarNotificationIcon";
import PageIcon from "../../components/icons/sidebar-icons/PageIcon";
import Line from "../../components/Line";
import SidebarLink from "../../components/sidebar/SidebarLink";

export default function SidebarButtons() {
  return (
    <div className="flex flex-col gap-[15px]">
      <p className="text-[12px]">Management</p>
      <div className="flex flex-col gap-[5px] border-b-[1px] border-light-border dark:border-dark-border pb-[20px]">
        <SidebarLink to="dashboard">
          <DashBoardIcon size={21} />
          <p className="">Dashboard</p>
        </SidebarLink>

        <SidebarLink to="notification">
          <SidebarNotificationIcon size={21} />
          <p>Notification</p>
        </SidebarLink>
      </div>

      <p className="text-[12px]">Review Answers</p>

      <div className="flex flex-col gap-[5px]">
        <SidebarLink to="new_qna">
          <PageIcon size={21} />
          <p>New Q&A</p>
        </SidebarLink>

        <SidebarLink to="reviewed_qna">
          <PageIcon size={21} />
          <p>Reviewed Q&A</p>
        </SidebarLink>
      </div>
    </div>
  );
}
