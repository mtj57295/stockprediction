import React, {useEffect} from 'react';
import Chart from 'chart.js'

const StockChart = ({x, y, l}) => {

   useEffect(() => {
      var ctx = document.getElementById('myChart').getContext('2d');
      var mixedChart = new Chart(ctx, {
         type: 'bar',
         data: {
            datasets: [{
               label: 'SVM Model',
               data: l,
               type: 'line',
               fill: false,
               backgroundColor: '#51d0de',
               borderColor: '#51d0de'
            },{
               label: 'Stock Data',
               data: y,
               backgroundColor: '#E27D60',
               borderColor: '#E27D60'
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
      <div className='StockChart'>
         <canvas id="myChart"></canvas>
      </div>
   )
}

export default StockChart;
