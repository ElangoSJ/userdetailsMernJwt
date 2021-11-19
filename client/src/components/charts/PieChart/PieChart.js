import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import "./PieChart.css";
import { chartColors } from "./PieChartColors";
import { pieChartData } from "./PieChartData";

const Chart = () => {
  const pieOptions = {
                  legend: {
                    display: false,
                    position: "center",
                    legendCallback: function(chart) {
                      return [
                        
                      ];
                    }
                  },
                  elements: {
                    arc: {
                      borderWidth: 1
                    }
                  }
                };

  const coustomLabels = pieChartData.map((data)=>`${data.month}, ${data.store} Customers`)
  const dataValue = pieChartData.map((data)=>[`${data.customer}`]);
  const [data, setData] = useState({
        maintainAspectRatio: false,
        responsive: false,
        labels: coustomLabels,
        datasets: [
            {
                data: dataValue,
                backgroundColor: chartColors,
                hoverBackgroundColor: chartColors
            }
        ]
  });

    return (
      <div>
        <h1 className='title'>Pie Chart</h1>
        <div className="chart-div w-50 h-50">
          <div className="position-relative">
            <div className="pieContainer">
                <Pie data={data} options={pieOptions} />
            </div>
         </div>
        </div>
      </div>
      
    );
}

export default Chart