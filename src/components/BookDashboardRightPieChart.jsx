

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getAnalyticData } from "../api/api";

Chart.register(Tooltip, Title, ArcElement, Legend, ChartDataLabels);

function BookDashboardRightPieChart({ subcode, selectedUnit }) {
  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
    labels: [],
  });

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!subcode) return;

    getAnalyticData(subcode)
      .then((response) => {
        const unitData = response.data.find(
          (unit) => unit.unit === Number(selectedUnit)
        );

        if (!unitData) {
          console.warn("Selected unit not found");
          return;
        }

        const labels = unitData.topicfrequency.map((t) => {
          // Keep full labels for proper wrapping
          return t.topic;
        });
        const data = unitData.topicfrequency.map((t) =>
          Number(t.count_percentage.toFixed(2))
        );

        const colors = [
          "#FF6384", "#FFCE56", "#36A2EB", "#4BC0C0", "#9966FF",
          "#FF9F40", "#FFB6C1", "#8A2BE2", "#7FFF00", "#D2691E",
          "#00BFFF", "#FF1493", "#20B2AA", "#FF6347", "#90EE90",
        ];

        setChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: colors.slice(0, data.length),
              borderWidth: 1,
              borderColor: '#fff',
            },
          ],
        });
      })
      .catch((err) => {
        console.error("Error loading pie chart:", err);
      });
  }, [subcode, selectedUnit]);

  return (
    <div className="w-full h-80 md:h-96 flex justify-center items-center relative">
      <div className="w-full h-full max-w-full max-h-full">
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              },
            },
            plugins: {
              legend: {
                display: false,
                
                
                
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || '';
                    const value = context.parsed;
                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${label}: ${percentage}%`;
                  },
                },
              },
              datalabels: {
                display: true, // Show labels on all slices
                color: '#000',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 3,
                padding: 2,
                formatter: (value, ctx) => {
                  const sum = ctx.chart.data.datasets[0].data.reduce(
                    (a, b) => a + b,
                    0
                  );
                  const percentage = ((value / sum) * 100).toFixed(1);
                  // Only show percentage if slice is large enough to be readable
                  const percentageNum = parseFloat(percentage);
                  return percentageNum >= 3 ? `${percentage}%` : '';
                },
                anchor: 'center',
                align: 'center',
                font: {
                  size: windowWidth < 768 ? 10 : 11,
                  weight: 'bold',
                },
                // Position labels better for small slices
                offset: function(context) {
                  const value = context.parsed;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = (value / total) * 100;
                  return percentage < 5 ? 15 : 0; // Move small slice labels outward
                },
              },
            },
            elements: {
              arc: {
                borderWidth: 2,
                borderColor: '#fff',
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default BookDashboardRightPieChart;