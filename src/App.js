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
          <Route exact path='/nerminh18.sg-host.com/calculators-io/' component={MortgageCalculator} />
          <Route exact path='/nerminh18.sg-host.com/calculators-am/' component={AmortizationCalculator} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
