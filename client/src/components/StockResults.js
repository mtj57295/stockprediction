import React, {useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateStockData, clearStocks } from '../actions/stockdata';
import StockChart from './StockChart';
import PredictStock from './PredictStock';

const StockResults = ({companyTicker, clearStocks, updateStockData, stockdata: { x, y, line, loading, company_ticker, name }}) => {

   const [ frequency, setFrequency ] = useState('daily')
   const [ frequencyRadio, setFrequencyRadio ] = useState({
      daily:'true',
      monthly: null,
      yearly: null
   })
   const { daily, monthly, yearly } = frequencyRadio
   const changeTimeSpan = frequency => {
      if (frequency === 'daily')
         setFrequencyRadio({daily: 'checked' });
      else if (frequency === 'monthly')
         setFrequencyRadio({monthly: 'checked' });
      else if (frequency === 'yearly')
         setFrequencyRadio({yearly: 'checked' });
      setFrequency(frequency)
      clearStocks()
      updateStockData(companyTicker, frequency)
   }

   useEffect(() => {
      clearStocks()
      updateStockData(companyTicker, frequency)
   }, [companyTicker])

   return (
      <div className='center-container'>
         <h6> Company: { name }</h6>
         <h6> NASDAQ: { company_ticker }</h6>
         {!loading && x != null && y != null && line != null ?
            (
               <div>
                  <StockChart x={x} y={y} l={line}/>
                     <div style={{margin: '2%', display: 'inline-block'}}>Select a Time frame: </div>
                     <label className="container" style={{display: 'inline-block', marginRight: '2%'}}>Daily
                       <input
                          onChange={() => changeTimeSpan('daily')}
                          type="radio"
                          checked={daily}
                          name="radio"/>
                       <span className="checkmark"></span>
                     </label>
                     <label className="container" style={{display: 'inline-block',marginRight: '2%'}}>monthly
                       <input
                          onChange={() => changeTimeSpan('monthly')}
                          checked={monthly}
                          type="radio"
                          name="radio"/>
                       <span className="checkmark"></span>
                     </label>
                     <label className="container" style={{display: 'inline-block', marginRight: '2%'}}>Yearly
                       <input
                          onChange={() => changeTimeSpan('yearly')}
                          checked={yearly}
                          type="radio"
                          name="radio"/>
                       <span className="checkmark"></span>
                     </label>
                  <PredictStock />
               </div>
            ) :
            (<div></div>)}
      </div>

   )
}

StockResults.propTypes = {
   updateStockData: PropTypes.func.isRequired,
   stockdata: PropTypes.object.isRequired,
   clearStocks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   stockdata: state.stockdata
});

export default connect(mapStateToProps, { updateStockData,  clearStocks })(StockResults);
