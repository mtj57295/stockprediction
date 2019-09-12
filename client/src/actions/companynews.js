import axios from 'axios';

import {
   UPDATE_COMPANY_NEWS,
   CLEAR_COMPANY_NEWS
} from './types';


export const updateCompanyNews = (company) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   const body = JSON.stringify({company: company});

   try {
      const res = await axios.post('/companynews', body, config);
      dispatch({
         type: UPDATE_COMPANY_NEWS,
         payload: res.data.data
      });
   } catch(err) {
      console.log(err)
   }
}

export const clearCompanyNews = () => async dispatch => {
   dispatch({
      type: CLEAR_COMPANY_NEWS
   })
}
