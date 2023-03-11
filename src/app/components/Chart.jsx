import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";

const labels = ["2018", "2019", "2020", "2021", "2022", "2023"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Số sinh viên",
      backgroundColor: "#3f52bb",
      borderColor: "#4f63d7",
      data: [15500, 15000, 18000, 19000, 24000, 22000, 23000],
      pointStyle: "circle",
      pointRadius: 8,
      pointHoverRadius: 10,
    },
  ],
};

const data2 = {
  labels: ["2019", "2020", "2021", "2022"],
  datasets: [
    {
      label: "Mục Tiêu",
      type: "line",
      borderColor: "#8e5ea2",
      data: [408, 547, 675, 734],
      fill: false,
    },
    {
      label: "Đạt được",
      type: "line",
      borderColor: "#3e95cd",
      data: [333, 421, 783, 700],
      fill: false,
    },
    {
      label: "Mục Tiêu",
      type: "bar",
      backgroundColor: "#017AFF",
      data: [408, 547, 675, 734],
    },
    {
      label: "Đạt được",
      type: "bar",
      backgroundColor: "rgba(0,0,0,0.2)",
      backgroundColorHover: "#3e95cd",
      data: [333, 421, 783, 700],
    },
  ],
};
const LineChart = () => {
  return (
    <>
      <div>
        <div>
          <Bar className="w-full" data={data2} />
          <Bar className="w-full" data={data} />
        </div>
      </div>
    </>
  );
};
export default LineChart;
