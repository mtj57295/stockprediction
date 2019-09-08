import axios from 'axios';

import {
   FIND_COMPANIES,
   CLEAR_COMPANIES
} from './types';


export const findCompanies = (company) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   const body = JSON.stringify({company: company});

   try {
      const res = await axios.post('/findCompanies', body, config);
      dispatch({
         type: FIND_COMPANIES,
         payload: res.data.data
      });
   } catch(err) {
      console.log(err)
   }
}

export const clearCompanies = () => async dispatch => {
   dispatch({
      type: CLEAR_COMPANIES
   })
}
