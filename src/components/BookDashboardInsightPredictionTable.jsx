import { getAnalyticData } from "../api/api";
import React, { useEffect, useState } from "react";

function BookDashboardInsightPredictionTable({ subcode, selectedUnit }) {
  const [topics, setTopics] = useState([]);
  const [unitTitle, setUnitTitle] = useState("");

  useEffect(() => {
    if (!subcode) {
      console.warn("No subcode provided");
      return;
    }

    getAnalyticData(subcode)
      .then((response) => {
        const unit = response.data.find(
          (unit) => unit.unit === selectedUnit
        );

        if (!unit) {
          console.warn("Selected unit not found");
          return;
        } 
        setUnitTitle(unit.unitTitle);
        setTopics(unit.topicfrequency || []);
      })
      .catch((err) => {
        console.error("Error fetching prediction table data:", err);
      });
  }, [subcode]);

  return (
    <div className="space-y-3 max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-800 truncate">{unitTitle}</h2>
      
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm border-collapse bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-900 border-r border-gray-200 w-2/5">
                Topic Name
              </th>
              <th className="px-3 py-3 text-center font-medium text-gray-900 border-r border-gray-200 w-1/5">
                Descriptive
              </th>
              <th className="px-3 py-3 text-center font-medium text-gray-900 border-r border-gray-200 w-1/5">
                Classification
              </th>
              <th className="px-3 py-3 text-center font-medium text-gray-900 w-1/5">
                Comparison
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {topics.map((topic, idx) => {
              const theory = topic.questiontypedata?.theory || {};
              return (
                <tr 
                  key={idx} 
                  className="hover:bg-blue-50 transition-colors duration-150 group"
                >
                  <td className="px-4 py-3 text-left border-r border-gray-100 group-hover:border-blue-200">
                    <div className="font-medium text-gray-900 truncate max-w-xs" title={topic.topic}>
                      {topic.topic}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center border-r border-gray-100 group-hover:border-blue-200">
                    {theory.descriptive?.toFixed(1) ?? "0.0"}%
                  </td>
                  <td className="px-3 py-3 text-center border-r border-gray-100 group-hover:border-blue-200">
                    {theory.classification?.toFixed(1) ?? "0.0"}%
                  </td>
                  <td className="px-3 py-3 text-center">
                    {theory.comparison?.toFixed(1) ?? "0.0"}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {topics.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No topic data available</p>
        </div>
      )}
    </div>
  );
}

export default BookDashboardInsightPredictionTable;
