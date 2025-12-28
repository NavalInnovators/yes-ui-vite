import tokenStorage from "../utils/tokenStorage";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitRoadmapInput, generateRoadmap } from "../api/api";
import { toast } from "react-toastify";

const BookDashboardRoadmapInput = ({ subCode, onRoadmapGenerated, existingPreferences }) => {
  const profileId = tokenStorage.getProfileId();

  const [formData, setFormData] = useState({
    daysToExam: existingPreferences?.daysToExam || "",
    dailyStudyHours: existingPreferences?.dailyStudyHours || "",
    confidence: existingPreferences?.confidence || [0, 0, 0, 0, 0],
  });

  const submitInputMutation = useMutation({
    mutationFn: (data) => submitRoadmapInput(profileId, subCode, data),
    onSuccess: () => {
      toast.success("Input saved! Generating your personalized roadmap...");
      generateMutation.mutate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const generateMutation = useMutation({
    mutationFn: () => generateRoadmap(profileId, subCode),
    onSuccess: (data) => {
      toast.success("Roadmap generated successfully!");
      onRoadmapGenerated?.(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const days = parseInt(formData.daysToExam);
    const hours = parseFloat(formData.dailyStudyHours);

    if (!days || days < 1 || days > 365) {
      toast.error("Days to exam must be between 1 and 365");
      return;
    }

    if (!hours || hours < 0.5 || hours > 20) {
      toast.error("Daily study hours must be between 0.5 and 20");
      return;
    }

    // Check if all confidence levels are selected
    if (formData.confidence.some(level => level === 0)) {
      toast.error("Please rate your confidence for all units");
      return;
    }

    const payload = {
      profileId,
      subCode,
      daysToExam: days,
      dailyStudyHours: hours,
      confidence: formData.confidence,
    };

    submitInputMutation.mutate(payload);
  };

  const handleConfidenceChange = (index, value) => {
    const newConfidence = [...formData.confidence];
    newConfidence[index] = parseInt(value);
    setFormData({ ...formData, confidence: newConfidence });
  };

  const getConfidenceColor = (level) => {
    if (level <= 2) return "bg-red-500";
    if (level <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getConfidenceLabel = (level) => {
    const labels = ["Not Set", "Very Low", "Low", "Medium", "High", "Very High"];
    return labels[level] || "Not Set";
  };

  const isLoading =
    submitInputMutation.isPending || generateMutation.isPending;

  return (
    <div className="w-full">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Create Your Study Roadmap
          </h2>
          <p className="text-sm text-gray-600">
            Get a personalized study plan based on your exam timeline and preparation level
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Days and Hours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Days Until Exam
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                min="1"
                max="365"
                value={formData.daysToExam}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    daysToExam: e.target.value,
                  })
                }
                placeholder="e.g., 30"
                required
              />
              <span className="text-xs text-gray-500 mt-1 block">
                How many days do you have?
              </span>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Daily Study Hours
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                min="0.5"
                max="20"
                step="0.5"
                value={formData.dailyStudyHours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dailyStudyHours: e.target.value,
                  })
                }
                placeholder="e.g., 2"
                required
              />
              <span className="text-xs text-gray-500 mt-1 block">
                Hours you can study per day
              </span>
            </div>
          </div>

          {/* Confidence Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Your Confidence Level
              </label>
              <p className="text-xs text-gray-600">
                Tap to rate your confidence for each unit
              </p>
            </div>

            <div className="space-y-4">
              {formData.confidence.map((level, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      Unit {index + 1}
                    </span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      level === 0 ? "bg-gray-100 text-gray-600" :
                      level <= 2 ? "bg-red-100 text-red-700" : 
                      level <= 3 ? "bg-yellow-100 text-yellow-700" : 
                      "bg-green-100 text-green-700"
                    }`}>
                      {getConfidenceLabel(level)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((mark) => (
                      <button
                        key={mark}
                        type="button"
                        onClick={() => handleConfidenceChange(index, mark)}
                        className={`h-10 rounded-lg text-sm font-bold transition-all ${
                          level === mark
                            ? `${getConfidenceColor(mark)} text-white shadow-md scale-105`
                            : level > mark && level !== 0
                            ? `${getConfidenceColor(level)} text-white opacity-50`
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300 active:scale-95"
                        }`}
                      >
                        {mark}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Generating Your Roadmap...
              </>
            ) : (
              <>
                Generate Roadmap
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookDashboardRoadmapInput;
