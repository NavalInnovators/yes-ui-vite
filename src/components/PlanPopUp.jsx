import React from "react";
import { useNavigate } from "react-router-dom";
import "./PlanPopup.css";

function PlanPopup({ onClose }) {
    const navigate = useNavigate();

    return (
        <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Choose plan">
            <div className="popup-box">
                {/* Header: title + close button (kept outside the scroll area so it's always visible) */}
                <div className="popup-header">
                    {/* Accessible close button */}
                    
                    <div className="popup-title-center">
                        <h2 className="popup-title">Unlock Your Full Potential</h2>
                    </div>
                    <button
                        className="popup-close"
                        onClick={onClose}
                        aria-label="Close plan popup"
                        title="Close"
                    >
                        ✕
                    </button>

                </div>

                {/* Scrollable content area */}
                <div className="popup-content">
                    <p className="subtitle">Choose the Perfect Plan for Success</p>

                    <div className="plans-wrapper">
                        {/* Basic Plan */}
                        <div className="plan-card basic" role="group" aria-labelledby="basic-title">
                            <h3 id="basic-title"> <b>Basic Plan </b></h3>
                            <p className="price">₹110/year</p>

                            <b>Buy 5+ Courses get 25% off</b>
                            <ul>
                                <li>🎓 Everything in Free Plan+</li>
                                <li>🎓 Unlimited Summarizer</li>
                                <li>🎓 Unlimited Rephraser</li>
                                <li>🎓 All 5 Unit Notes</li>
                                <li>🎓 All 5 Unit Insights</li>
                            </ul>
                            <button
                                className="btn-basic"
                                onClick={() => navigate("/cart?plan=basic")}
                            >
                                Proceed with Basic
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="plan-card pro" role="group" aria-labelledby="pro-title">
                            <h3 id="pro-title">
                                Pro Plan <span className="badge">Best Value!</span>
                            </h3>
                            <p className="price">₹150/year</p>
                            <b>Buy 5+ Courses get 30% off</b>
                            <ul>
                                <li>⚡ Everything in Basic+</li>
                                <li>⚡ AI-powered Chatbot (Notes)</li>
                                <li>⚡ Personalized Roadmap</li>
                            </ul>
                            <div className="alert">🚀 Don’t Miss Out! Upgrade now for exclusive tools!</div>
                            <button
                                className="btn-pro"
                                onClick={() => navigate("/cart?plan=pro")}
                            >
                                Go Pro & Maximize Savings!
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer: kept outside scroll area so it's always reachable on mobile */}
                <div className="popup-footer">
                    <p className="free-link" onClick={onClose} role="button" tabIndex={0}>
                        Start with Free Plan
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PlanPopup;
