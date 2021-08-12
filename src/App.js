import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AmortizationCalculator from './components/AmortizationCalculator/AmortizationCalculator';
import MortgageCalculator from './components/MortgageCalculator/MortgageCalculator';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/calculator1' component={MortgageCalculator} />
          <Route exact path='/calculator2' component={AmortizationCalculator} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
