import { useEffect, useState } from "react";

import Line from "../../../components/Line";

const NOTIFICATIONS_URL = "http://localhost:3001/notifications";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="h-[calc(100vh-74px-77.5px-40px)] flex flex-col border border-gray-300 p-[30px] rounded-[10px]">
      <h1 className="text-[20px]">Notifications</h1>

      <Line />

      <div className="flex mt-[40px] justify-between items-center pr-[15px] font-light text-[14px] text-light-text border-b border-[#611fc5] pb-[20px]">
        <div className="flex-4">Name</div>
        <div className="flex flex-1 justify-center">Date</div>
        <div className="flex flex-1 justify-center">Actions</div>
      </div>

      <div className="flex flex-col overflow-y-auto custom-scrollbar">
        {/* Notification Title */}
        {notifications.map((notification, i) => (
          <div
            className={`flex items-center py-[20px] ${
              i === notifications.length - 1
                ? ""
                : "border-b border-light-border"
            }`}
            key={notification.id}
          >
            <div className="font-light flex-4 mt-[1px]">
              {notification.title}
            </div>
            <div className="font-light flex flex-1 justify-center mt-[1px]">
              {notification.date}
            </div>
            <div className="flex flex-1 justify-center mt-[1px]">
              <button className="py-[4px] px-[15px] rounded-[6px] transition bg-light-hover border-2 border-light-hover hover:bg-transparent cursor-pointer">
                Mark as read
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
