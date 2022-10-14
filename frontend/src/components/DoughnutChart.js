import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const DoughnutChart = ({ chartData }) => {
  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
