import React, {useEffect} from 'react';
import Chart from 'chart.js'

const PredictedChart = ({x, y}) => {

   useEffect(() => {
      var ctx = document.getElementById('myChart2').getContext('2d');
      var lineChart = new Chart(ctx, {
         type: 'line',
         data: {
            datasets: [{
               label: 'Predicted Model',
               data: y,
               fill: false,
               backgroundColor: '#5ac18e',
               borderColor: '#5ac18e'
            }],

            labels: x
         },

         options: {
            legend: {
               labels: {
                  fontColor: 'rgba(46, 49, 49, 1)',
                  fontSize: 20
               }
            },
            scales: {
               xAxes: [{
                   ticks: { fontSize: 18, fontColor: 'rgba(46, 49, 49, 1)' },
                   type: 'time',
                   time: { displayFormats: { week: '11' }}
              }],
              yAxes: [{
                 ticks: { fontSize: 18, fontColor: 'rgba(46, 49, 49, 1)'}
              }]
           }
        }
      });

   }, [0])


   return (
      <div className='StockChart' style={{height: '50vh', width: '1000px'}} >
         <canvas id="myChart2"></canvas>
      </div>
   )
}

export default PredictedChart;
