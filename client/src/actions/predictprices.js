import axios from 'axios';

import {
   PREDICT_PRICES,
   CLEAR_PRICES
} from './types';


export const predictPrices = (startDate, endDate) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   const body = JSON.stringify({startDate: startDate, endDate: endDate});
   try {
      const res = await axios.post('/predictprices', body, config);
      dispatch({
         type: PREDICT_PRICES,
         payload: res.data.data
      });
   } catch(err) {
      console.log(err)
   }
}

export const clearPrices = () => async dispatch => {
   dispatch({
      type: CLEAR_PRICES
   })
}
