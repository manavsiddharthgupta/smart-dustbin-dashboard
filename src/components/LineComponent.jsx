import LineChart from "./LineChart";
const LineComponent = (props) => {
  // console.log(props.coverage);
  return (
    <div className="lineChart">
      <h1>{props.title}</h1>
      <LineChart
        guestSeries={props.guestSeries}
        ifVo={props.ifVo}
        coverage={props.coverage}
      />
    </div>
  );
};
export default LineComponent;
