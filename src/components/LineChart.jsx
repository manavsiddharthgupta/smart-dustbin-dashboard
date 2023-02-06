import Chart from "react-apexcharts";
import moment from "moment";

const LineChart = (props) => {
  const seriesData = [];
  let guestData = "";
  if (props.ifVo) {
    guestData = props.guestSeries.v1;
  } else {
    guestData = props.guestSeries.v0;
  }
  // console.log(props.guestSeries.dates);
  props.guestSeries.dates?.forEach((element, i) => {
    seriesData.push({
      x: element,
      y: guestData[i],
    });
  });
  // console.log(seriesData);
  const series = [
    {
      name: "Guests",
      data: seriesData,
    },
  ];
  let min = "";
  let max = "";
  let formatSpecifier = "";
  // console.log(props.coverage);

  if (props.coverage === "latest") {
    min = new Date().getTime();
    max = new Date().getTime();
    formatSpecifier = "H:m";
  } else if (props.coverage === "one_Week") {
    const last_week = new Date();
    last_week.setDate(last_week.getDate() - 7);
    min = last_week.getTime();
    max = new Date().getTime();
    formatSpecifier = "ddd";
  } else if (props.coverage === "last_Hour") {
    const last_Hour = new Date();
    last_Hour.setHours(last_Hour.getHours() - 1);
    min = last_Hour.getTime();
    max = new Date().getTime();
    formatSpecifier = "H:m";
  } else if (props.coverage === "one_Months") {
    const last_date = new Date();
    last_date.setDate(last_date.getDate() - 30);
    min = last_date.getTime();
    max = new Date().getTime();
    formatSpecifier = "DD MMM";
  } else if (props.coverage === "one_Day") {
    const last_Hour = new Date();
    last_Hour.setHours(last_Hour.getHours() - 24);
    min = last_Hour.getTime();
    max = new Date().getTime();
    formatSpecifier = "H:m";
  } else if (props.coverage === "three_Months") {
    const last_date = new Date();
    last_date.setDate(last_date.getDate() - 90);
    min = last_date.getTime();
    max = new Date().getTime();
    formatSpecifier = "MMM yy";
  } else if (props.coverage === "six_Hour") {
    const last_Hour = new Date();
    last_Hour.setHours(last_Hour.getHours() - 6);
    min = last_Hour.getTime();
    max = new Date().getTime();
    formatSpecifier = "H:m";
  }

  const guestOption = {
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 5,
      min: min,
      max: max,
      labels: {
        formatter: function (val) {
          return moment(new Date(val)).format(formatSpecifier);
        },
      },
    },
  };
  return (
    <Chart type="line" series={series} options={guestOption} width={348} />
  );
};
export default LineChart;
