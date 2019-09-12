import React, {useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateCompanyNews, clearCompanyNews } from '../actions/companynews';
import TwitterPostings from './TwitterPostings';

const CompanyNews = ({ company, updateCompanyNews, clearCompanyNews,
            companynews: { loading, tweets }}) => {

   useEffect(() => {
      clearCompanyNews()
      updateCompanyNews(company)
   }, [company])

   return (
      <div className='center-container'>
         {!loading && tweets != null ? (<TwitterPostings tweets={tweets} type='news'/>) : (<div></div>)}
      </div>
   )
}

CompanyNews.propTypes = {
   companynews: PropTypes.object.isRequired,
   updateCompanyNews: PropTypes.func.isRequired,
   clearCompanyNews: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   companynews: state.companynews
});

export default connect(mapStateToProps, { updateCompanyNews, clearCompanyNews })(CompanyNews);
