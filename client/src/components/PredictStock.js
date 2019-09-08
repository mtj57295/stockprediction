import React, {useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { predictPrices, clearPrices } from '../actions/predictprices';
import PredictedChart from './PredictedChart';

const PredictStock = ({ predictPrices, clearPrices, predictprices: { x, y, loading}}) => {

   const [ formData, setFormData ] = useState({
      startDate: '',
      endDate: '',
   })

   const [ predictPricesBlock, setPredictPricesBlock] = useState('none')

   const { startDate, endDate } = formData;

   const onChange = e => {
      setFormData({...formData, [e.target.name]: e.target.value});
   }

   const onSubmit = e => {
      e.preventDefault();
      clearPrices()
      predictPrices(startDate, endDate)
      setPredictPricesBlock('block')
   }

   return (
      <div>
         <h5 style={{display: 'inline-block', marginRight: '2%'}}>Make a Prediction:</h5>
         <small>Select a date in the future, not from the above dates</small>
         <form action="/action_page.php">
           <p>Start Date: <input
             type="date"
             name="startDate"
             value={startDate}
             onChange={e => onChange(e)}
             required /></p>
           <p>End Date: <input
             type="date"
             name="endDate"
             value={endDate}
             onChange={e => onChange(e)}
             required /></p>
             <button
               class="button"
               style={{verticalAlign:'middle', marginBottom: '5%'}}
               onClick={e => onSubmit(e)}
               ><span>Submit</span></button>
         </form>

         <div style={{display: predictPricesBlock}}>
            { !loading && x != null && y != null ? (<PredictedChart x={x} y={y} />) :(<div></div>)}
         </div>

      </div>
   )
}

PredictStock.propTypes = {
   predictprices: PropTypes.object.isRequired,
   predictPrices: PropTypes.func.isRequired,
   clearPrices: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
   predictprices: state.predictprices
});

export default connect(mapStateToProps, { predictPrices, clearPrices })(PredictStock);
