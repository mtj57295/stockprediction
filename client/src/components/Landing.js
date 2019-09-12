import React, {useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { findCompanies, clearCompanies } from '../actions/findcompanies';
import StockChart from './StockChart';
import StockResults from './StockResults';
import TwitterResults from './TwitterResults';
import CompanyNews from './CompanyNews';

const Landing = ({findCompanies, findcompanies: {companyTicker, loadingCompanies}}) => {

   const [ formData, setFormData ] = useState({
      company: 'IBM',
      prediction: ''
   })
   const { company } = formData

   const [ tabs, setTabs ] = useState({
      stocks: 'block',
      twitter: 'none',
      news: 'none',
   })
   const { stocks, twitter, news } = tabs

   const [ company2, setCompany2 ] = useState('')

   const onChange = e => {
      setFormData({...formData, [e.target.name]: e.target.value});
   }

   const onSubmit = e => {
      e.preventDefault();
      clearCompanies();
      setCompany2(company)
      findCompanies(company)
   }

   const changeTab = (tab) => {
      if (tab === 'stocks')
         setTabs({stocks: 'block'})
      else if(tab === 'twitter')
         setTabs({twitter: 'block'})
      else
         setTabs({news: 'block'})
   }

   return (
      <div className='center-container'>
         <h1>Stock Prediction and Analysis</h1>
            <form>
              <input
                 type="text"
                 name="company"
                 value={company}
                 onChange={e => onChange(e)}
                 placeholder="Search.."
                 required />
              <button
                 className="button"
                 style={{verticalAlign:'middle'}}
                 onClick={e => onSubmit(e)}
                 ><span>Submit</span></button>
            </form>
         <div style={{fontSize: '15px', margin: '2%'}}><a href='https://money.cnn.com/data/dow30/' target="_blank">Only DOW 30 Companies</a></div>
         {!loadingCompanies && companyTicker != '' ? (
            <div>
               <div className="tab">
                 <button className="tablinks" onClick={() => changeTab('stocks')}>Stock Analysis</button>
                 <button className="tablinks" onClick={() => changeTab('twitter')}>Twitter Feed</button>
                 <button className="tablinks" onClick={() => changeTab('news')}>Company News</button>
               </div>
               <div style={{ display: stocks }} id="stocks" className="tabcontent">
                  <StockResults companyTicker={companyTicker}/>
               </div>
               <div style={{ display: twitter }} id="twitter" className="tabcontent">
                  <TwitterResults company={company2}/>
               </div>
               <div style={{ display: news }} id="news" className="tabcontent">
                  <CompanyNews company={companyTicker}/>
               </div>
            </div>
         ) : (<div></div>)}
      </div>
   )
}

Landing.propTypes = {
   findCompanies: PropTypes.func.isRequired,
   findcompanies: PropTypes.object.isRequired,
   clearCompanies: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
   findcompanies: state.findcompanies
});

export default connect(mapStateToProps, { findCompanies, clearCompanies })(Landing);
