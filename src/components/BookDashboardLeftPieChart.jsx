

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
          (unit) => unit.unit === selectedUnit
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
  }, [subcode]);

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
  <div className="flex flex-col items-center gap-4">
    <h3 className="text-center font-medium text-base">{unitTitle}</h3>

    {/* Wrap chart + legend in one box to keep them together */}
    <div className="flex flex-col items-center relative">
      {/* Chart centered */}
      <div className="w-[232px] h-[232px]">
        <Pie data={chartData} options={options} />
      </div>

      {/* Legend directly below, aligned left to chart */}
      <div className="flex gap-4 mt-1 self-start text-sm">
        {LABELS.map((label, i) => (
          <div key={i} className="flex items-center gap-1">
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



