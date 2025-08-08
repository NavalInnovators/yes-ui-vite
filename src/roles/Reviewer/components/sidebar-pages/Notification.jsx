import { useContext, useEffect, useState } from "react";
import { motion } from "motion/react";

import WindowWidthContext from "../../context/WindowWidthContext";

const NOTIFICATIONS_URL = "http://localhost:3001/notifications";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const windowWidth = useContext(WindowWidthContext);
  const isSmallScreen = windowWidth < 1020;
  const isMobile = windowWidth < 700;
  const is600px = windowWidth < 600;

  // Responsive padding like ReviewerAnalyticsMobile
  const padding = is600px ? "px-[17px] py-[17px]" : "px-[20px] py-[20px]";

  // Responsive height calculation
  const welcomeBarHeight = isMobile ? 45 : 63;
  const notificationHeight = `h-[calc(100vh-63px-64px-${welcomeBarHeight}px)]`;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await fetch(NOTIFICATIONS_URL);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (!notifications) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ x: "-1%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      className={`${padding} overflow-x-hidden ${notificationHeight} dark:bg-dark-card flex flex-col border dark:border-dark-border border-gray-300 rounded-[10px]`}
    >
      <h1 className="text-[18px] dark:text-white font-semibold border-b-[1px] border-light-border dark:border-dark-border pb-[15px]">
        Notifications
      </h1>

      {!isSmallScreen && (
        <div className="flex mt-[30px] gap-[10px] dark:text-dark-text-muted justify-between pr-[10px] items-center font-light text-xs text-light-text border-b border-[#611fc5] pb-[20px]">
          <div className="flex-4">Name</div>
          <div className="flex flex-1 justify-center">Date</div>
          <div className="flex flex-1 justify-center">Actions</div>
        </div>
      )}

      <div className="flex flex-col overflow-y-auto custom-scrollbar text-sm">
        {/* Notification Title */}
        {notifications.map((notification, i) => (
          <div
            key={notification.id}
            className={`${
              isMobile ? "flex-col items-start" : "flex items-center"
            } py-[15px] dark:text-white gap-[10px] ${
              i === notifications.length - 1
                ? ""
                : "border-b border-light-border dark:border-dark-border"
            }`}
          >
            <div className="font-light flex-4 mt-[1px]">
              {notification.title}
            </div>
            {isMobile ? (
              <div className="flex justify-between mt-2 gap-2 items-center">
                <div className="font-light bg-[#f0f0f0] dark:bg-dark-highlight text-[12px] text-gray-600 dark:text-dark-text-muted px-[10px] py-[3px] rounded-[5px] w-fit">
                  {notification.date}
                </div>
                <button className="dark:bg-dark-highlight text-sm dark:hover:bg-dark-more-highlighted dark:border-dark-border py-[4px] w-[106px] rounded-[6px] transition bg-light-hover border border-light-hover hover:bg-transparent cursor-pointer">
                  Mark as read
                </button>
              </div>
            ) : (
              <>
                <div className="font-light flex flex-1 justify-center mt-[1px]">
                  <span className="bg-[#f0f0f0] dark:bg-dark-highlight text-[12px] text-gray-500 dark:text-dark-text-muted px-[10px] py-[3px] rounded-[5px] w-fit">
                    {notification.date}
                  </span>
                </div>
                <div className="flex flex-1 justify-center mt-[1px]">
                  <button className="dark:bg-dark-highlight text-sm dark:hover:bg-dark-more-highlighted dark:border-dark-border py-[4px] w-[106px] rounded-[6px] transition bg-light-hover border border-light-hover hover:bg-transparent cursor-pointer">
                    Mark as read
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
