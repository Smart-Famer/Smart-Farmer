import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export function BarChart(props) {
    const options = {
        scales:{xAxis: {title: {text: props.xAxisLabel,display:true}}, yAxis: {title:{text:props.yAxisLabel,display:true}}},
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
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
        datasets: props.dataSets,
      };

  return <Bar options={options} data={data} />;
}
