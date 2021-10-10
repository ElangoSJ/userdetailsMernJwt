import React from 'react';
import { Scatter } from 'react-chartjs-2';

const data = {
  datasets: [{
    label: ['Scatter Dataset'],
    data: [{id: 'Sales', nested: {value: 1500}}, {id: 'Purchases', nested: {value: 500}}],
    backgroundColor: 'rgb(255, 99, 132)'
  }],
};

const options = {
    parsing: {
        xAxisKey: 'id',
        yAxisKey: 'nested.value'
    }
};

const ScatterChart = () => (
  <>
    <div className='header'>
      <h1 className='title'>Scatter Chart</h1>
         </div>
    <Scatter data={data} options={options} />
  </>
);

export default ScatterChart;