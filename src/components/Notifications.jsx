import "./Notifications.css";
import { BackArrow } from "../assets";
import React from 'react';
import { useNavigate } from "react-router-dom";

const notificationsData = [
    {
        id: 1,
        message: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper',
        date: 'Nov 20, 2023',
    },
    {
        id: 2,
        message: 'Laoreet dolore magna aliquam erat',
        date: 'Nov 20, 2023',
    },
    {
        id: 3,
        message: 'Minim veniam, quis nostrud exerci tation ullamcorper',
        date: 'Nov 20, 2023',
    },
    {
        id: 4,
        message: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper',
        date: 'Nov 20, 2023',
    },
    {
        id: 5,
        message: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper',
        date: 'Nov 20, 2023',
    },
    {
        id: 6,
        message: 'Laoreet dolore magna aliquam erat',
        date: 'Nov 20, 2023',
    },
    {
        id: 7,
        message: 'Minim veniam, quis nostrud exerci tation ullamcorper',
        date: 'Nov 20, 2023',
    },
    {
        id: 8,
        message: 'Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper',
        date: 'Nov 20, 2023',
    },
];

const Notifications = () => {
    const navigate = useNavigate();
    return (
        <div className="notifications-container">
            <div className="gradient-strip">

                <div className="gradient-strip-heading-left">
                    <div className="back-arrow">
                        <img onClick={() => navigate(-1)} src={BackArrow} alt="BackArrow" />
                    </div>
                    Notifications
                </div>
            </div>
            <div className="notification-page-content">
                <div className="notification-page-list">
                    {notificationsData.map((notification) => (
                        <div key={notification.id} className="notification-page-item">
                            <div className="notification-page-message font-notification">{notification.message}</div>
                            <div className="notification-page-date font-paragraph-grey">{notification.date}</div>
                            <hr className="notification-page-hr"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Notifications;