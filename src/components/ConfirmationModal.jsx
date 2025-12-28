import React from "react";
import "./ConfirmationModal.css";

/**
 * Reusable Confirmation Modal Component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal should close
 * @param {function} props.onConfirm - Function to call when user confirms
 * @param {string} props.title - Modal title
 * @param {string} props.message - Modal message/description
 * @param {string} props.confirmText - Text for confirm button (default: "Confirm")
 * @param {string} props.cancelText - Text for cancel button (default: "Cancel")
 * @param {string} props.variant - Color variant: 'blue' | 'red' | 'green' (default: 'blue')
 * @param {string} props.icon - Icon type: 'info' | 'warning' | 'success' (default: 'info')
 */
export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "blue",
    icon = "info",
}) {
    if (!isOpen) return null;

    // Icon SVG paths
    const icons = {
        info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
        success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    };

    const currentIcon = icons[icon] || icons.info;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div
            className="confirmation-modal-overlay"
            onClick={onClose}
        >
            <div
                className="confirmation-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="confirmation-modal-inner">
                    <div className={`confirmation-modal-icon-wrapper ${variant}`}>
                        <svg
                            className={`confirmation-modal-icon ${variant}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={currentIcon}
                            />
                        </svg>
                    </div>
                    <h3 className="confirmation-modal-title">
                        {title}
                    </h3>
                    <p className="confirmation-modal-message">
                        {message}
                    </p>
                    <div className="confirmation-modal-buttons">
                        <button
                            onClick={handleConfirm}
                            className="gradient-border-button"
                        >
                            {confirmText}
                        </button>
                        <button
                            onClick={onClose}
                            className="cancel-button"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
