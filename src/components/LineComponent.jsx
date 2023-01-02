import LineChart from "./LineChart";
const LineComponent = (props) => {
  return (
    <div className="lineChart">
      <h1>{props.title}</h1>
      <LineChart guestSeries={props.guestSeries} />
    </div>
  );
};
export default LineComponent;
