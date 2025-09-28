import React from "react";
import { useNavigate } from "react-router-dom";
import "./PlanPopUp.css";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

function PlanPopUp({ onClose, course, requiredPlan, currentPlan }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handlePlanSelect = (plan) => {
        if (course) {
            addToCart(course, plan);
            toast.success(`${course.name} (${plan}) added to cart!`);
        }
        navigate('/mycart');
        onClose();
    };

    return (
        <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Choose plan">

            <div className="popup-box">
                <div className="popup-header-and-close">
                    <div className="popup-header">
                        <div >
                            <h2 className="popup-title">Unlock Your Full Potential</h2>
                        </div>
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
                    <div className="subtitle"> <p>Choose the Perfect Plan for Success</p></div>

                    <div className="plans-wrapper">
                        {/* Basic Plan */}
                        <div className="plan-card basic" role="group" aria-labelledby="basic-title">
                            <h3 id="basic-title" className="card-plan-title"> <b>Basic Plan </b></h3>
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
                                onClick={() => handlePlanSelect("Basic")}
                            >
                                Proceed with Basic
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="plan-card pro" role="group" aria-labelledby="pro-title">
                            <h3 id="pro-title" className="card-plan-title">
                                <b>Pro Plan</b> <span className="badge">Best Value!</span>
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
                                onClick={() => handlePlanSelect("Pro")}
                            >
                                Go Pro & Maximize Savings!
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer: kept outside scroll area so it's always reachable on mobile */}
                <div className="popup-footer">
                    <p className="free-link" onClick={onClose} role="button" tabIndex={0}>
                        Skip for now
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PlanPopUp;
