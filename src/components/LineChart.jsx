import Chart from "react-apexcharts";

const LineChart = (props) => {
  const series = [
    {
      name: "Guests",
      data: props.guestSeries,
    },
  ];
  const guestOption = {
    stroke: {
      curve: "smooth",
      width: 2,
    },
  };
  return (
    <Chart type="line" series={series} options={guestOption} width={348} />
  );
};
export default LineChart;
