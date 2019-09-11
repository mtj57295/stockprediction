import React, {useEffect} from 'react';
import Chart from 'chart.js'

const TwitterChart = ({count, negative, neutral, positive}) => {
   useEffect(() => {
      var ctx = document.getElementById('twitterChart').getContext('2d');
      var myPieChart = new Chart(ctx, {
         type: 'pie',
			data: {
				datasets: [{
					data: [
						negative, neutral, positive
					],
					backgroundColor: [
						'#ff4040',
						'#ffa500',
                  '#5ac18e'
					],
					label: 'Polarity'
				}],
				labels: [
					'Negative Tweets',
					'Neutral Tweets',
					'Positive Tweets'
				]
			},
			options: {
				responsive: true
			}

      });

   }, [0])

   return (
      <div style={{marginTop: '5%', height: '100%', width: '100%'}} className='StockChart'>
         <canvas id="twitterChart"></canvas>
      </div>
   )
}

export default TwitterChart;
