import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(Tooltip, Title, ArcElement, Legend, ChartDataLabels);
function BookDashboardLeftPieChart() {
  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
      },
    ],
  });

  useEffect(() => {
    const fetchData = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          const data = [];

          const colors = [
            "#FF6384",
            "#FFCE56",
            "#36A2EB",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#FFB6C1",
            "#8A2BE2",
            "#7FFF00",
            "#D2691E",
            "#00BFFF",
            "#FF1493",
          ];

          const backgroundColor = colors.slice(0, res.length);

          for (var i of res) {
            data.push(i.id);
          }

          setChartData({
            datasets: [
              {
                data: data,
                backgroundColor: backgroundColor,
              },
            ],
          });
        })
        .catch((e) => {
          console.error("error", e);
        });
    };
    fetchData();
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
    },
  };

  return (
    <div
      className="BookDashboardLeftPieChart"
      style={{ width: "auto", height: "auto" }}
    >
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default BookDashboardLeftPieChart;
