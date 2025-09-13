import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(Tooltip, Title, ArcElement, Legend, ChartDataLabels);

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"]; // Descriptive, Classification, Comparison
const LABELS = ["Descriptive", "Classification", "Comparison"];

export default function BookDashboardLeftPieChart({
  selectedUnit,
  useQuestionTypeData,
}) {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!useQuestionTypeData || !useQuestionTypeData.theory) {
      setLoading(true);
      return;
    }
    const theory = useQuestionTypeData.theory;
    const data = [
      theory.descriptive || 0,
      theory.classification || 0,
      theory.comparison || 0,
    ];

    setChartData({
      labels: LABELS,
      datasets: [
        {
          data,
          backgroundColor: COLORS,
        },
      ],
    });
    setLoading(false);
  }, [useQuestionTypeData]);

  const options = {
    plugins: {
      datalabels: {
        color: "black",
        formatter: (value) => (value > 0 ? `${value.toFixed(1)}%` : ""),
        anchor: "center",
        align: "center",
      },
      legend: { display: false },
    },
    maintainAspectRatio: false,
  };
  if (loading || !chartData) {
    return <div className="text-sm text-gray-500">Loading data...</div>;
  }
  return (
    <div className="flex flex-col items-center gap-4 bg-gray-100">
      <h3 className="text-center font-medium pt-3 text-base">
        {" "}
        Type of Questions Asked{" "}
      </h3>
      <div className="relative w-full h-[232px] items-center" id="pie">
        {/* Chart */}
        <Pie key={selectedUnit} data={chartData} options={options} />

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
