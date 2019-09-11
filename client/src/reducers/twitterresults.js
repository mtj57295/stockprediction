
import {
   UPDATE_TWITTER_RESULTS,
   CLEAR_TWITTER_RESULTS
} from '../actions/types';

const initialState = {
   count: 0,
   negative: null,
   neutral: null,
   positive: null,
   subjectivityAvg: null,
   tweets: null,
   loading: true
}

export default function(state = initialState, action) {
   const { type, payload } = action;
   switch(type) {
      case UPDATE_TWITTER_RESULTS:
         return {
            ...state,
            negative: payload.negative,
            neutral: payload.neutral,
            positive: payload.positive,
            subjectivityAvg: payload.subjectivityAvg,
            tweets: payload.tweets,
            loading: false
         }
      case CLEAR_TWITTER_RESULTS:
         return {
            ...state,
            x: null,
            y: null,
            loading: true
         }
      default:
         return state;
   }
}
