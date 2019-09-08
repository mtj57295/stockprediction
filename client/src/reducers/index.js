import { combineReducers } from 'redux';
import stockdata from './stockdata';
import predictprices from './predictprices';
import findcompanies from './findcompanies';

export default combineReducers({
   stockdata,
   findcompanies,
   predictprices,
});
