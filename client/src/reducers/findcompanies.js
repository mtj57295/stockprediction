import {
   FIND_COMPANIES,
   CLEAR_COMPANIES
} from '../actions/types';

const initialState = {
   companyName: null,
   companyTicker: null,
   loadingCompanies: true
}

export default function(state = initialState, action) {
   const { type, payload } = action;
   switch(type) {
      case FIND_COMPANIES:
         return {
            ...state,
            companyName: payload.name,
            companyTicker: payload.company_ticker,
            loadingCompanies: false
         }
      case CLEAR_COMPANIES:
         return {
            ...state,
            companyName: null,
            companyTicker: null,
            loadingCompanies: true
         }
      default:
         return state;
   }
}
