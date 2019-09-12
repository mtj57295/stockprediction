import { combineReducers } from 'redux';
import stockdata from './stockdata';
import predictprices from './predictprices';
import findcompanies from './findcompanies';
import twitterresults from './twitterresults';
import companynews from './companynews';

export default combineReducers({
   stockdata,
   findcompanies,
   predictprices,
   twitterresults,
   companynews
});
