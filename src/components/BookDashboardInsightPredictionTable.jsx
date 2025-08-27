

import { getAnalyticData } from "../api/api";
import React, { useEffect, useState } from "react";

function BookDashboardInsightPredictionTable({ useUnitTitle, useTopicFrequency, selectedUnit }) {
  const [topics, setTopics] = useState([]);
  const [unitTitle, setUnitTitle] = useState("");

  useEffect(() => {
    setUnitTitle(useUnitTitle);
    setTopics(useTopicFrequency || []);
  }, [useUnitTitle, useTopicFrequency]);

  return (
    <div className="space-y-3 max-w-4xl">
      {/* <h2 className="text-lg font-semibold text-gray-800 truncate">{unitTitle}</h2> */}

      <div className="rounded-lg border border-black shadow-sm">
        <table className="w-full text-sm border-collapse  table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className=" rounded-lg px-3 py-2 text-center  text-gray-900 border-r border-gray-200">
                Topic Name
              </th>
              <th className="px-3 py-2 text-center  font-semibold text-gray-900 border-r border-gray-200">
                Descriptive
              </th>
              <th className="px-3 py-2 text-center  font-semibold text-gray-900 border-r border-gray-200">
                Classification
              </th>
              <th className=" rounded-lg px-3 py-2 text-center  font-semibold text-gray-900">
                Comparison
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-900">
            {topics.map((topic, idx) => {
              const theory = topic.questiontypedata?.theory || {};
              return (
                <tr key={idx} className="hover:bg-blue-50 transition-colors duration-150 group">
                  <td className="px-3 py-2 text-left border-r border-gray-900 break-words max-w-[150px]">
                    <div className="px-3 font-medium text-gray-900  max-w-xs" title={topic.topic}>
                      {topic.topic}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center border-r border-black">
                    {theory.descriptive?.toFixed(1) ?? "0.0"}%
                  </td>
                  <td className="px-3 py-2 text-center border-r border-black">
                    {theory.classification?.toFixed(1) ?? "0.0"}%
                  </td>
                  <td className="px-3 py-2 text-center">
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
