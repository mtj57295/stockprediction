import React, {useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateStockData, clearStocks } from '../actions/stockdata';
import { findCompanies, clearCompanies } from '../actions/findcompanies';
import StockChart from './StockChart';
import PredictStock from './PredictStock';

const Landing = ({clearStocks, clearCompanies, updateStockData, findCompanies, stockdata: { x, y, line, loading, company_ticker, name },
   findcompanies: { companyTicker, loadingCompanies }}) => {

   const [ formData, setFormData ] = useState({
      company: 'apple',
      prediction: ''
   })
   const [ stockDataBlock, setStockDataBlock ] = useState('none')
   const { company, prediction } = formData;

   const onChange = e => {
      setFormData({...formData, [e.target.name]: e.target.value});
   }

   const onSubmit = e => {
      e.preventDefault();
      clearCompanies()
      findCompanies(company)
      clearStocks()
      setStockDataBlock('none')
   }

   useEffect(() => {
      if (!loadingCompanies && companyTicker != null) {
         updateStockData(companyTicker)
         setStockDataBlock('block')
      }
   }, [loadingCompanies])

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
                 class="button"
                 style={{verticalAlign:'middle'}}
                 onClick={e => onSubmit(e)}
                 ><span>Submit</span></button>
            </form>
         <div style={{fontSize: '15px', margin: '2%'}}><a href='https://money.cnn.com/data/dow30/' target="_blank">Only DOW 30 Companies</a></div>

         <div className='flex-container' style={{display:  stockDataBlock }}>
            <h6> Company: { name }</h6>
            <h6> NASDAQ: { company_ticker }</h6>
            {!loading && x != null && y != null && line != null ?
               (
                  <div>
                     <StockChart x={x} y={y} l={line}/>
                     <PredictStock />
                  </div>
               ) :
               (<div></div>)}
         </div>
      </div>
   )
}

Landing.propTypes = {
   updateStockData: PropTypes.func.isRequired,
   stockdata: PropTypes.object.isRequired,
   findCompanies: PropTypes.func.isRequired,
   findcompanies: PropTypes.object.isRequired,
   clearCompanies: PropTypes.func.isRequired,
   clearStocks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   stockdata: state.stockdata,
   findcompanies: state.findcompanies
});

export default connect(mapStateToProps, { updateStockData, findCompanies, clearStocks, clearCompanies })(Landing);
