import { combineReducers } from 'redux';
import stockdata from './stockdata';
import predictprices from './predictprices';
import findcompanies from './findcompanies';
import twitterresults from './twitterresults';

export default combineReducers({
   stockdata,
   findcompanies,
   predictprices,
   twitterresults
});
