import React, {useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateTwitterResults, clearTwitterResults } from '../actions/twitterresults';
import TwitterChart from './TwitterChart';
import TwitterPostings from './TwitterPostings';

const TwitterResults = ({ company, clearTwitterResults, updateTwitterResults, twitteresults:
   { count, negative, neutral, positive, subjectivityAvg, tweets, loading}}) => {

   useEffect(() => {
      clearTwitterResults()
      updateTwitterResults(company)
   }, [company])


   return (
      <div className='center-container'>
         {!loading && negative != null && neutral != null && positive != null ?
         (
            <TwitterChart count={count} negative={negative} neutral={neutral} positive={positive}/>
         ) :
         (<div></div>)}
         {!loading && tweets != null ? (<TwitterPostings tweets={tweets}/>) : (<div></div>)}
      </div>
   )
}

TwitterResults.propTypes = {
   twitteresults: PropTypes.object.isRequired,
   updateTwitterResults: PropTypes.func.isRequired,
   clearTwitterResults: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   twitteresults: state.twitterresults
});

export default connect(mapStateToProps, { updateTwitterResults, clearTwitterResults })(TwitterResults);
