import axios from 'axios';

import {
   UPDATE_TWITTER_RESULTS,
   CLEAR_TWITTER_RESULTS
} from './types';

export const updateTwitterResults = (company) => async dispatch => {

   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   const body = JSON.stringify({company: company});

   try {
      const res = await axios.post('/tweets', body, config);
      dispatch({
         type: UPDATE_TWITTER_RESULTS,
         payload: res.data.data
      });
   } catch(err) {
      console.log(err)
   }
}

export const clearTwitterResults = () => dispatch => {
   dispatch({type: CLEAR_TWITTER_RESULTS});
}
