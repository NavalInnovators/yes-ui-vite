

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getAnalyticData } from "../api/api"; // adjust path as needed

Chart.register(Tooltip, Title, ArcElement, Legend, ChartDataLabels);

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"]; // Descriptive, Classification, Comparison
const LABELS = ["Descriptive", "Classification", "Comparison"];

export default function BookDashboardLeftPieChart({ subcode, selectedUnit }) {
  const [chartData, setChartData] = useState(null);
  const [unitTitle, setUnitTitle] = useState("");

  useEffect(() => {
    if (!subcode) return;

    getAnalyticData(subcode)
       .then((response) => {
        const unit = response.data.find(
          (unit) => unit.unit === Number(selectedUnit)
        );

        if (!unit) {
          console.warn("Selected unit not found");
          return;
        }// first unit only
        if (!unit || !unit.questiontypedata?.theory) return;

        const theory = unit.questiontypedata.theory;

        const data = [
          theory.descriptive || 0,
          theory.classification || 0,
          theory.comparison || 0,
        ];

        setUnitTitle(unit.unitTitle);

        setChartData({
          labels: LABELS,
          datasets: [
            {
              data,
              backgroundColor: COLORS,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching analytics data:", error.message);
        if (error.response) {
          console.error("Status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
      });
  }, [subcode, selectedUnit]);

  const options = {
    plugins: {
       
      datalabels: {
        color: "black",
        formatter: (value) => `${value.toFixed(1)}%`,
        anchor: "center",
        align: "center",
      },
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };

  if (!chartData) return <div className="text-sm text-gray-500">Loading chart...</div>;

return (
  <div className="flex flex-col items-center gap-4 bg-gray-100">
    <h3 className="text-center font-medium text-base">{unitTitle}</h3>

    <div className="relative w-full h-[232px] items-center">
      {/* Chart */}
      <Pie key={selectedUnit} data={chartData} options={options} />

      {/* Legend absolutely positioned to bottom-left */}

      <div className="absolute bottom-2 left-2 flex flex-col gap-2 text-sm bg-gray-100 px-2 py-1 rounded">
        {LABELS.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: COLORS[i] }}
            ></span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      
    </div>

    
  </div>
);

  


}



