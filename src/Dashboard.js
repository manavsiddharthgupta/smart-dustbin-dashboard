import "./dashboard.css";
import React, { useState, useEffect } from "react";
import GaugeComponent from "./components/GaugeComponent";
import DustbinUsed from "./components/DustbinUsed";
import LineComponent from "./components/LineComponent";
import Map from "./components/Map";
import { data } from "./data/data";
import CoverageComponent from "./components/CoverageComponent";
// import OneSignal from "react-onesignal";

const Dashboard = () => {
  const [selectCoverage, setCoverage] = useState("latest");
  const [coverName, setCoverName] = useState("Latest");
  const [latestData, setLatestData] = useState(data);
  const [initialFetch, setinitial] = useState(false);
  const [testData, setTestData] = useState({ v0: 0, v1: 0 });
  const [historyData, setHistoryData] = useState([]);
  const [lastweekDay, setlastWeek] = useState([]);

  // console.log(latestData);
  // function time_convert(num) {
  //   const hours = Math.floor(num / 60);
  //   const minutes = num % 60;
  //   return `${hours}:${minutes}`;
  // }

  useEffect(() => {
    const fetchingLatestData = () => {
      fetch(
        "https://blynk.cloud/external/api/get?token=wZBLqyQ8SCYbgOtpHTyKG7PL47ikTP2z&v0&v1&v2"
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          // console.log(res);
          if (
            latestData.latest.v0 !== res.v0 ||
            latestData.latest.v1 !== res.v1
          ) {
            setLatestData({
              ...data,
              latest: {
                v0: res["v0"],
                v1: res["v1"],
                guestSeries_1: [0, 0, 0],
                guestSeries_2: [0, 0, 0],
              },
            });
          }
        });
    };

    let intId = setInterval(() => {
      fetchingLatestData();
    }, 2000);

    return () => {
      clearInterval(intId);
    };
  }, [latestData]);

  useEffect(() => {
    const postStatusData = () => {
      console.log("post");
      const date = new Date();
      const body = {
        time: date,
        data: { v0: latestData.latest.v0, v1: latestData.latest.v1 },
      };
      console.log(body);
      fetch("https://iotdustbin-96cb7-default-rtdb.firebaseio.com/data.json", {
        method: "POST",
        body: JSON.stringify({
          ...body,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (
      latestData.latest.v0 !== testData.v0 ||
      latestData.latest.v1 !== testData.v1
    ) {
      console.log("inner");
      setTestData(() => {
        return {
          v0: latestData.latest.v0,
          v1: latestData.latest.v1,
        };
      });
      setinitial(true);

      if (initialFetch) {
        postStatusData();
      }
    }
  }, [latestData, initialFetch, testData]);

  useEffect(() => {
    console.log("fetch hist");
    const fetchHistoryData = () => {
      fetch("https://iotdustbin-96cb7-default-rtdb.firebaseio.com/data.json")
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const hist = [];
          for (const each in res) {
            hist.push(res[each]);
          }
          setHistoryData(hist);
        });
    };
    fetchHistoryData();
  }, [testData]);

  useEffect(() => {
    console.log("transform");
    const transform = () => {
      // let lasthr = [];
      // for (const iterator of historyData) {
      //   let d = new Date(iterator.time);
      //   const curr = new Date();
      //   if (
      //     curr.getMinutes() - d.getMinutes() <= 60 &&
      //     curr.getDate() === d.getDate() &&
      //     curr.getMonth() === d.getMonth()
      //   ) {
      //     lasthr.push(d.getMinutes());
      //   }
      // }
      // setLasthrData(lasthr);
      // console.log(historyData);
      // const last_Hour = new Date();
      // last_Hour.setHours(last_Hour.getHours() - 1);
      // // console.log(last_Hour);
      // const last_day = new Date();
      // last_day.setDate(last_day.getDate() - 1);

      // const last_week = new Date();
      // last_week.setDate(last_week.getDate() - 7);

      // const filtered_lasthr = historyData.filter((each) => {
      //   return new Date(each.time) >= last_Hour;
      // });
      // const filtered_lastday = historyData.filter((each) => {
      //   return new Date(each.time) >= last_day;
      // });
      // const filtered_week = historyData.filter((each) => {
      //   return new Date(each.time) >= last_week;
      // });
      // // console.log(filtered_lasthr, filtered_lastday);
      // const lasthrData = {
      //   v0: [],
      //   v1: [],
      //   dates: [],
      // };
      // filtered_lasthr.forEach((each) => {
      //   lasthrData.v0.push(each.data.v0);
      //   lasthrData.v1.push(each.data.v1);
      //   lasthrData.dates.push(new Date(each.time));
      // });
      // // console.log(lasthrData);
      // setLasthrData(lasthrData);
      // const lastDayData = {
      //   v0: [],
      //   v1: [],
      //   dates: [],
      // };
      // filtered_lastday.forEach((each) => {
      //   lastDayData.v0.push(each.data.v0);
      //   lastDayData.v1.push(each.data.v1);
      //   lastDayData.dates.push(new Date(each.time));
      // });
      // setLastDayData(lastDayData);

      const lastWeekData = {
        v0: [],
        v1: [],
        dates: [],
      };
      historyData.forEach((each) => {
        lastWeekData.v0.push(each.data.v0);
        lastWeekData.v1.push(each.data.v1);
        lastWeekData.dates.push(new Date(each.time));
      });
      setlastWeek(lastWeekData);
    };
    transform();
  }, [historyData]);

  useEffect(() => {
    if (latestData.latest.v0 >= 90) {
      console.log("hello");
      fetch(
        "https://iot-dasdboard-backend-manavsiddharthgupta.vercel.app/send-text"
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
    }
  }, [latestData]);

  const allCov = [
    "Latest",
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
    let coverageName = "";
    console.log();
    if (innerhtml === "Latest") {
      coverageName = innerhtml.toLowerCase();
    } else {
      const tempcov = innerhtml.split(" ");
      coverageName = `${tempcov[0].toLowerCase()}_${tempcov[1]}`;
    }

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
              v0={latestData.latest?.v0}
            />
            <DustbinUsed numOftimeUsed={latestData.latest?.v1} />
          </div>
          <div className="outer_2">
            <LineComponent
              title="Dustbin Status"
              guestSeries={lastweekDay}
              ifVo={false}
              coverage={selectCoverage}
            />
            <LineComponent
              title="Number of times used"
              guestSeries={lastweekDay}
              ifVo={true}
              coverage={selectCoverage}
            />
          </div>
        </div>
        <Map />
      </div>
    </div>
  );
};
export default Dashboard;
// latestData[selectCoverage]?.guestSeries_2
