import axios from 'axios';

import {
   UPDATE_STOCK_DATA,
   CLEAR_STOCKS
} from './types';


export const updateStockData = (company_ticker, frequency) => async dispatch => {

   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   const body = JSON.stringify({company_ticker: company_ticker, frequency: frequency});

   try {
      const res = await axios.post('/stockprices', body, config);
      dispatch({
         type: UPDATE_STOCK_DATA,
         payload: res.data.data
      });
   } catch(err) {
      console.log(err)
   }
}

export const clearStocks = () => dispatch => {
   dispatch({type: CLEAR_STOCKS});
}
