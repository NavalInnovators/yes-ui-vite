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

        <SidebarLink to="query_management">
          <PageIcon size={21} />
          <p>Query Management</p>
        </SidebarLink>

        <SidebarLink to="forms_management">
          <PageIcon size={21} />
          <p>Forms Management</p>
        </SidebarLink>
      </div>
    </div>
  );
}