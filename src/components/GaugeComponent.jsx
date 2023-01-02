import ChartGauge from "./ChartGauge";
let GaugeComponent = (props) => {
  return (
    <div className={props.className}>
      <h1>
        Dustbin status <p>(V0)</p>
      </h1>
      <ChartGauge v0={props.v0} />
    </div>
  );
};
export default GaugeComponent;
