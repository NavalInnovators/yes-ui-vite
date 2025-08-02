

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(Tooltip, Title, ArcElement, Legend, ChartDataLabels);

function BookDashboardLeftPieChart() {
  const [chartData, setChartData] = useState({
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
      },
    ],
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => {
        const labels = users.map((user) => user.name);
        const data = users.map((user) => user.id);

        const colors = [
          "#FF6384", "#FFCE56", "#36A2EB", "#4BC0C0", "#9966FF",
          "#FF9F40", "#FFB6C1", "#8A2BE2", "#7FFF00", "#D2691E",
          "#00BFFF", "#FF1493"
        ];

        setChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: colors.slice(0, users.length),
            },
          ],
        });
      })
      .catch((e) => console.error("error", e));
  }, []);

  const options = {
    plugins: {
      datalabels: {
        color: "black",
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        anchor: "center",
        align: "center",
      },
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-full items-center md:items-start">
      {/* Chart */}
      <div className="w-[232px] h-[232px] shrink-0 mx-auto md:mx-0">
        <Pie data={chartData} options={options} />
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-2 text-sm w-full max-w-[300px] px-2">
        {chartData.labels.map((label, index) => (
          <div
            key={index}
            className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis"
            title={label}
          >
            <span
              className="inline-block w-3 h-3 rounded-sm shrink-0"
              style={{
                backgroundColor: chartData.datasets[0].backgroundColor[index],
              }}
            ></span>
            <span className="truncate">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookDashboardLeftPieChart;
