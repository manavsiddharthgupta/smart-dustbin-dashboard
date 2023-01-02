import "./dashboard.css";
import React, { useState } from "react";
import GaugeComponent from "./components/GaugeComponent";
import DustbinUsed from "./components/DustbinUsed";
import LineComponent from "./components/LineComponent";
import Map from "./components/Map";
import { data, FetchFun } from "./data/data";
import CoverageComponent from "./components/CoverageComponent";
const Dashboard = () => {
  const [selectCoverage, setCoverage] = useState("last_Hour");
  const [coverName, setCoverName] = useState("Last Hour");
  FetchFun();
  const allCov = [
    "Last Hour",
    "Six Hour",
    "One Day",
    "One Week",
    "One Months",
    "Three Months",
  ];

  const onSetCoverage = (event) => {
    console.log(event.target.innerHTML);
    const innerhtml = event.target.innerHTML;
    const tempcov = innerhtml.split(" ");
    const coverageName = `${tempcov[0].toLowerCase()}_${tempcov[1]}`;
    console.log(coverageName);
    setCoverage(coverageName);
    setCoverName(innerhtml);
  };
  const activeClassname = (each) => {
    if (each === coverName) {
      return "active";
    }
    return "";
  };

  return (
    <div className="box">
      <ul>
        {allCov.map((each) => {
          return (
            <CoverageComponent
              className={activeClassname(each)}
              key={each}
              onClick={onSetCoverage}
            >
              {each}
            </CoverageComponent>
          );
        })}
      </ul>
      <div className="outerChart">
        <div className="allCharts">
          <div className="outer_1">
            <GaugeComponent
              className="gaugecharts"
              v0={data[selectCoverage]?.v0}
            />
            <DustbinUsed numOftimeUsed={data[selectCoverage]?.v1} />
          </div>
          <div className="outer_2">
            <LineComponent
              title="Dustbin Status"
              guestSeries={data[selectCoverage]?.guestSeries_1}
            />
            <LineComponent
              title="Number of times used"
              guestSeries={data[selectCoverage]?.guestSeries_2}
            />
          </div>
        </div>
        <Map />
      </div>
    </div>
  );
};
export default Dashboard;
