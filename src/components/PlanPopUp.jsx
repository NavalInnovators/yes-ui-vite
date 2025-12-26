import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, X, Check, Zap, Star, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import {
    trackPopupOpen,
    trackPopupClosed,
    schedulePopupAbandonment,
    cancelPopupAbandonment,
    getISTISOString,
} from "../utils/analytics";

function PlanPopUp({ onClose, course, requiredPlan, currentPlan, targetUnit }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const popupId = useMemo(
        () => `plan_popup_${course?.id ?? "unknown"}`,
        [course?.id],
    );
    const openedAtRef = useRef({ date: null, ist: null });
    const dwellStateRef = useRef({
        startedAtDate: null,
        startedAtIST: null,
        closed: false,
        cancelOnCleanup: true,
    });

    const emitPopupClosed = (
        reason,
        outcome = "closed",
        cancelTimer = true,
    ) => {
        if (
            dwellStateRef.current.closed ||
            !dwellStateRef.current.startedAtDate
        ) {
            return;
        }

        const closedAtDate = new Date();
        const closedAtIST = getISTISOString(closedAtDate);
        const durationMs =
            closedAtDate.getTime() -
            dwellStateRef.current.startedAtDate.getTime();

        trackPopupClosed({
            subjectId: course?.id ?? "unknown",
            courseName: course?.name ?? "Unknown Course",
            openedAt: dwellStateRef.current.startedAtIST,
            closedAt: closedAtIST,
            closeReason: reason,
            durationMs,
            outcome,
        });

        dwellStateRef.current.closed = true;
        dwellStateRef.current.cancelOnCleanup = cancelTimer;
    };

    useEffect(() => {
        const openedAtDate = new Date();
        const openedAtIST = getISTISOString(openedAtDate);
        openedAtRef.current = {
            date: openedAtDate,
            ist: openedAtIST,
        };
        dwellStateRef.current = {
            startedAtDate: openedAtDate,
            startedAtIST: openedAtIST,
            closed: false,
            cancelOnCleanup: true,
        };

        trackPopupOpen({
            subjectId: course?.id ?? "unknown",
            courseName: course?.name ?? "Unknown Course",
            requiredPlan: requiredPlan ?? "pro",
            openedAt: openedAtIST,
        });

        return () => {
            if (course?.id && dwellStateRef.current.cancelOnCleanup) {
                cancelPopupAbandonment(course.id);
            }
            if (
                !dwellStateRef.current.closed &&
                dwellStateRef.current.startedAtDate
            ) {
                emitPopupClosed("unmount", "unmount");
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popupId, course?.id, course?.name, requiredPlan, targetUnit]);

    const handleSkip = () => {
        cancelPopupAbandonment(course?.id);
        emitPopupClosed("skip", "skipped");
        onClose();
    };

    const handleClose = () => {
        cancelPopupAbandonment(course?.id);
        emitPopupClosed("close_button", "dismissed");
        onClose();
    };

    const handlePlanSelect = (plan) => {
        if (course) {
            const addedAt = getISTISOString();
            addToCart(course, plan, {
                source: "popup",
                metadata: {
                    required_plan: requiredPlan ?? "pro",
                },
            });

            schedulePopupAbandonment({
                subjectId: course.id,
                courseName: course.name,
                addedAt,
            });
        }
        
        emitPopupClosed("plan_selected", "added_to_cart", false);
        onClose();
        navigate("/mycart");
    };

    return (
        <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[10000] p-4"
            role="dialog" 
            aria-modal="true" 
            aria-label="Choose plan"
        >
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-xl">
                <div className="relative px-6 py-4" style={{
                    background: 'linear-gradient(270deg,#feac2f 0%,#9b32ad 33.48%,#381ab2 71.46%,#17082c 140.19%)'
                }}>
                    <button 
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                        aria-label="Close"
                    >
                        <X size={20} className="text-white" />
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg">
                            <Crown size={20} className="text-yellow-300" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white">Upgrade to Premium</h2>
                            <p className="text-white/80 text-sm">Choose a plan to unlock all features</p>
                        </div>
                    </div>
                </div>


                <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Basic Plan */}
                        <div className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-1.5 bg-blue-50 rounded">
                                    <Check size={16} className="text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Basic Plan</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold text-gray-900">₹110</span>
                                        <span className="text-sm text-gray-500">/year</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">Everything in Free Plan</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">Unlimited Summarizer</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">Unlimited Rephraser</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">All 5 Unit Notes</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">All 5 Unit Insights</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => handlePlanSelect("BASIC")}
                                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg cursor-pointer"
                            >
                                Choose Basic
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="relative border border-purple-200 rounded-lg p-4 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md">

                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                <div className="bg-purple-600 text-white px-3 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                                    <Sparkles size={10} />
                                    Popular
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3 mb-3 mt-1">
                                <div className="p-1.5 bg-purple-50 rounded">
                                    <Zap size={16} className="text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Pro Plan</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold text-gray-900">₹150</span>
                                        <span className="text-sm text-gray-500">/year</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">Everything in Basic Plan</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">AI-powered Chatbot</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">Personalized Roadmap</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Check size={14} className="text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700">Priority Support</span>
                                </div>
                            </div>

                            <button 
                                onClick={() => handlePlanSelect("PRO")}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg cursor-pointer"
                            >
                                Choose Pro
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 px-6 py-3 bg-gray-50">
                    <div className="flex justify-center">
                        <button 
                            onClick={handleSkip}
                            className="text-gray-500 hover:text-gray-700 text-sm underline transition-colors cursor-pointer"
                        >
                            Continue with Free Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanPopUp;