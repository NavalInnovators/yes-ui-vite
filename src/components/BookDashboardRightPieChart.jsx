import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(Tooltip, Title, ArcElement, Legend, ChartDataLabels);

function BookDashboardRightPieChart({ useTopicFrequency, selectedUnit }) {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // const [chartData, setChartData] = useState({
  //   datasets: [
  //     {
  //       data: [],
  //       backgroundColor: [],
  //     },
  //   ],
  //   labels: [],
  // });

  // if (!useTopicFrequency || useTopicFrequency.length === 0) {
  //   return <div className="text-sm text-gray-500">Loading topic frequency data...</div>;
  // }

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!useTopicFrequency || useTopicFrequency.length === 0) {
      setLoading(true);
      return;
    }
    const labels = useTopicFrequency.map((t) => {
      // Keep full labels for proper wrapping
      return t.topic;
    });
    const data = useTopicFrequency.map((t) =>
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
      <div className="w-full h-full overflow-hidden text-center ">
        Topic and their repeat %
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
                displayColors: true,
                callbacks: {

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
                offset: function (context) {
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