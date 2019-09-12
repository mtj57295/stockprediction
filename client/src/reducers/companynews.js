import {
   UPDATE_COMPANY_NEWS,
   CLEAR_COMPANY_NEWS
} from '../actions/types';

const initialState = {
   tweets: null,
   loading: true
}

export default function(state = initialState, action) {
   const { type, payload } = action;
   switch(type) {
      case UPDATE_COMPANY_NEWS:
         return {
            ...state,
            tweets: payload,
            loading: false
         }
      case CLEAR_COMPANY_NEWS:
         return {
            ...state,
            tweets: null,
            loading: true
         }
      default:
         return state;
   }
}
