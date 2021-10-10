import React, { useEffect, useState } from "react";
import "./LineChart.css";

import { Line } from "react-chartjs-2";

const LineChart = () => {
  const [data, setData]=useState([]);
  useEffect(()=>{
    setData({
      labels: ["2015", "2016", "2017", "2018", "2019", "2020","2021"],
      datasets: [
        {
          label: "Customer",
          data: [4200, 3800, 412, 680, 830, 1300,4200],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          position:"center"
        }
      ]
  });
  },[])

    return (
      <div>
        <h1 className='title'>Line Chart</h1>
        <div className="chart-div">
          <Line data={data} />
        </div>
      </div>
      );
}

export default LineChart