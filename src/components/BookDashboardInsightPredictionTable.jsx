import React from "react";

function BookDashboardInsightPredictionTable() {
  const data = [
    {
      topic: "Topic 1",
      probability: "85%",
      date: "10 July 2024",
      confidence: "High",
    },
    {
      topic: "Topic 2",
      probability: "75%",
      date: "12 July 2024",
      confidence: "Medium",
    },
    {
      topic: "Topic 3",
      probability: "75%",
      date: "12 July 2024",
      confidence: "Medium",
    },
    {
      topic: "Topic 4",
      probability: "75%",
      date: "12 July 2024",
      confidence: "Medium",
    },
    {
      topic: "Topic 5",
      probability: "75%",
      date: "12 July 2024",
      confidence: "Medium",
    },
    {
      topic: "Topic 6",
      probability: "75%",
      date: "12 July 2024",
      confidence: "Medium",
    },
    {
      topic: "Topic 7",
      probability: "75%",
      date: "12 July 2024",
      confidence: "Medium",
    },
  ];

  return (
    <table className="min-w-full table-auto text-sm text-left text-gray-800 border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-center border border-gray-300">Topic Name</th>
          <th className="px-4 py-2  text-center border border-gray-300">Theory</th>
          <th className="px-4 py-2  text-center border border-gray-300">Numerical</th>
          <th className="px-4 py-2   text-center border border-gray-300">Coding</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            <td className="px-4 py-2 text-center border border-gray-300">{item.topic}</td>
            <td className="px-4 py-2 text-center border border-gray-300">{item.probability}</td>
            <td className="px-4 py-2 text-center border border-gray-300">{item.date}</td>
            <td className="px-4 py-2 text-center border border-gray-300">{item.confidence}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookDashboardInsightPredictionTable;
