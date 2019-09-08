
import {
   PREDICT_PRICES,
   CLEAR_PRICES
} from '../actions/types';

const initialState = {
   x: null,
   y: null,
   loading: true
}

export default function(state = initialState, action) {
   const { type, payload } = action;
   switch(type) {
      case PREDICT_PRICES:
         return {
            ...state,
            x: payload.dates,
            y: payload.prices,
            loading: false
         }
      case CLEAR_PRICES:
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
