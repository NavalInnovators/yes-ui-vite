import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, Tooltip, Title, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(Tooltip, Title, Legend, CategoryScale, LinearScale, BarElement, ChartDataLabels);

function BookDashboardBarGraph({ useTopicFrequency, selectedUnit }) {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!useTopicFrequency || useTopicFrequency.length === 0) {
      setLoading(true);
      return;
    }
    const labels = useTopicFrequency.map((t) => t.topic);
    const data = useTopicFrequency.map((t) => Number(t.count_percentage.toFixed(2)));

    const colors = [
      "#FF6384", "#FFCE56", "#36A2EB", "#4BC0C0", "#9966FF",
      "#FF9F40", "#FFB6C1", "#8A2BE2", "#7FFF00", "#D2691E",
      "#00BFFF", "#FF1493", "#20B2AA", "#FF6347", "#90EE90",
    ];

    setChartData({
      labels,
      datasets: [
        {
          label: "Topic Repeat %",
          data,
          backgroundColor: colors.slice(0, data.length),
          borderWidth: 1,
          borderColor: "#fff",
        },
      ],
    });
    setLoading(false);
  }, [useTopicFrequency]);

  if (loading || !chartData) {
    return (
      <div className="w-full md:h-110 flex justify-center items-center">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="w-full md:h-110 flex justify-center items-center relative">
     <div className="w-full min-h-[250px] max-h-[350px] overflow-hidden text-center">

        Topic and their repeat %
        <Bar
          data={chartData}
         options={{
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
    datalabels: {
      color: "#000",
      anchor: "end",
      align: "top",
      formatter: (value) => `${value}%`,
      font: {
        weight: "bold",
        size: 10,
      },
    },
  },
  scales: {
    x: {
      ticks: { display: false },
      grid: { drawTicks: false }, 
    },
    y: {
      beginAtZero: true,
    //   max: 100,
    //   title: { display: true, text: "%" },
    offset: true,
    },
  },
}}

        />
      </div>
    </div>
  );
}

export default BookDashboardBarGraph;
