import React, { useState } from "react";
import "./AlertModal.css";

export default function AlertModal({ isOpenDefault = true, title, message, variant = "green" }) {
    const [isVisible, setIsVisible] = useState(isOpenDefault);

    if (!isVisible) return null;

    const close = () => setIsVisible(false);

    const icons = {
        green: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        blue: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        red: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    };

    return (
        <div className="alert-modal-overlay" onClick={close}>
            <div className="alert-modal-content" onClick={(e) => e.stopPropagation()}>

                {/* 1. The Cross (Close) Button */}
                <button className="close-x-button" onClick={close} aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="alert-modal-inner">
                    <div className={`alert-modal-icon-wrapper ${variant}`}>
                        <svg className={`alert-modal-icon ${variant}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons[variant]} />
                        </svg>
                    </div>

                    <h3 className="alert-modal-title">{title}</h3>
                    <p className="alert-modal-message">{message}</p>

                    {/* 2. The Main Action Button */}
                    <button onClick={close} className="gradient-border-button full-width">
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}