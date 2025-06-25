import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(Tooltip, Title, ArcElement, Legend, ChartDataLabels);

function CustomPieChart() {
  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [10, 20, 30], // Placeholder data
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"], // Placeholder colors
      },
    ],
    labels: ["Red", "Yellow", "Blue"], // Placeholder labels
  });

  useEffect(() => {
    const fetchData = () => {
      // Example fetch for dynamic data
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((data) => data.json())
        .then((res) => {
          const labels = [];
          const data = [];
          const backgroundColor = [
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
          ]; // Use colors similar to your screenshot

          res.forEach((item, index) => {
            labels.push(item.name); // Assign labels dynamically
            data.push(item.id); // Use id or any numerical value
          });

          setChartData({
            datasets: [
              {
                data: data,
                backgroundColor: backgroundColor.slice(0, data.length), // Dynamically pick colors
              },
            ],
            labels: labels,
          });
        })
        .catch((err) => console.error("Error fetching data:", err));
    };

    fetchData();
  }, []);

  return (
    <div style={{ margin: "auto" }}>
      <Pie
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: "right", // Display legend to the right
              labels: {
                font: {
                  size: 14, // Adjust font size
                },
              },
            },
            title: {
              display: true,
              font: {
                size: 16,
              },
            },
            datalabels: {
              color: "#000", // Label color
              formatter: (value, ctx) => {
                const sum = ctx.chart.data.datasets[0].data.reduce(
                  (a, b) => a + b,
                  0
                );
                const percentage = ((value / sum) * 100).toFixed(2) + "%";
                return percentage; // Show percentage
              },
              anchor: "end", // Position outside the chart
              align: "end", // Align outside the slices
              offset: 10, // Space between the slice and label
              font: {
                size: 12, // Adjust font size
              },
            },
          },
        }}
      />
    </div>
  );
}

export default CustomPieChart;
