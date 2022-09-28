// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart(props) {

  const options = {
    responsive: true,
    scales:{xAxis: {title: {text: props.xAxisLabel,display:true}}, yAxis: {title:{text:props.yAxisLabel,display:true}}},
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: props.chartTitle,
      },
  
    },
  };

const labels = props.xAxisValues;

const data = {
  labels,
  datasets: props.dataSets
};
  return (
    <div className="App">
      <Line options={options} data={data} />
    </div>
  );
}


