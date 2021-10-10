import React from 'react';
import {Bar} from 'react-chartjs-2';
import { chartColors } from '../PieChart/PieChartColors';
import { BarChartData } from './BarChartData';


const BarChart = () => {
    const customLabels=BarChartData.map((data)=>`${data.month}`)
    const resData=BarChartData.map((cusValue)=>cusValue.customer);
    const state = {
        labels:customLabels,
        datasets: [
          {
            label: 'Customer',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: resData,
            backgroundColor: chartColors,
            hoverBackgroundColor: chartColors
          }
        ]
      }

      return(
        <div className="w-100 h-100">
          <h1 className='title'>Bar Chart</h1>
        <Bar data={state}
                    options={{
                        title:{
                        display:true,
                        text:'Average Rainfall per month',
                        fontSize:20
                        },
                        legend:{
                        display:true,
                        position:'right'
                        }
                    }}
        />
      </div>
      )
}

export default BarChart