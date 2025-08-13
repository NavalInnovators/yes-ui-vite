import { NavLink } from "react-router-dom";

export default function SidebarLink({ children, to }) {
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
