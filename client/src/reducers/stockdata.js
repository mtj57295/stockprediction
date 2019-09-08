import {
   UPDATE_STOCK_DATA,
   CLEAR_STOCKS
} from '../actions/types';

const initialState = {
   x: null,
   y: null,
   line: null,
   loading: true,
   company_ticker: '',
   name: ''
}

export default function(state = initialState, action) {
   const { type, payload } = action;
   switch(type) {
      case UPDATE_STOCK_DATA:
         return {
            ...state,
            loadingArtists: false,
            x: payload.predictionData.x,
            y: payload.predictionData.y,
            line: payload.predictionData.line,
            loading: false,
            company_ticker: payload.company_ticker,
            name: payload.name
         }
      case CLEAR_STOCKS:
         return {
            ...state,
            x: null,
            y: null,
            line: null,
            loading: false,
            company_ticker: '',
            name: ''
         }
      default:
         return state;
   }
}
