import { Outlet } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import WelcomeBar from "./components/WelcomeBar";
import SideBar from "./components/sidebar/SideBar";
import { useState } from "react";

export default function HomeLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="select-none" id="needs-dark-mode">
      <NavigationBar />
      <WelcomeBar />

      <div className="flex">
        {isSidebarOpen && <SideBar />}

        <div className="p-[20px] w-full dark:bg-black">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
