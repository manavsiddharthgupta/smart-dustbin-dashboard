import { useEffect } from "react";
export const FetchFun = () => {
  useEffect(() => {
    const fetchingData = () => {
      fetch(
        "https://blynk.cloud/external/api/get?token=3U1MHghO2Gu1zcHQ9WePzXZvHRq7s4zH&v0&v1&v2"
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
    };
    fetchingData();
  }, []);
};
export const data = {
  latest: {
    v0: 0,
    v1: 0,
    guestSeries_1: [0, 0],
    guestSeries_2: [0, 0, 0, 0],
  },
  last_Hour: {
    v0: 25,
    v1: 443,
    guestSeries_1: [0, 25],
    guestSeries_2: [1021, 821, 1525, 100],
  },
  six_Hour: {
    v0: 15,
    v1: 123,
    guestSeries_1: [0, 15],
    guestSeries_2: [1011, 81, 25, 100],
  },
  one_Day: {
    v0: 76,
    v1: 43,
    guestSeries_1: [0, 76],
    guestSeries_2: [2112, 821, 1525, 100],
  },
  one_Week: {
    v0: 35,
    v1: 321,
    guestSeries_1: [0, 35, 321],
    guestSeries_2: [1021, 821, 1525, 100],
  },
  one_Months: {
    v0: 20,
    v1: 233,
    guestSeries_1: [20, 25, 233],
    guestSeries_2: [1021, 821, 1525, 100],
  },
  three_Months: {
    v0: 25,
    v1: 23,
    guestSeries_1: [0, 25, 42],
    guestSeries_2: [1021, 821, 1525, 100],
  },
};
