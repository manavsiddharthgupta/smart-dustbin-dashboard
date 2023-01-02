import Chart from "react-apexcharts";
const ChartGauge = (props) => {
  const data = {
    series: [props.v0],
    options: {
      chart: {
        type: "radialBar",
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -110,
          endAngle: 110,
          track: {
            background: "#e7e7e7",
            strokeWidth: "100%",
            margin: 18, // margin is in pixels
          },
          dataLabels: {
            name: {
              show: true,
              offsetY: -40,
            },
            value: {
              color: "#6f6e72",
              offsetY: -2,
              fontSize: "50px",
              fontWeight: 500,
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.2,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: [""],
    },
  };
  return (
    <Chart
      options={data.options}
      series={data.series}
      type="radialBar"
      height={350}
    />
  );
};
export default ChartGauge;
