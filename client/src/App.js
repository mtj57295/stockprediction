import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';


//Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div className='big-container'>
       <Provider store={store}>
         <Router>
            <Fragment>
               <Route exact path='/' component={Landing}/>
            </Fragment>
         </Router>
      </Provider>
   </div>
  );
}

export default App;
