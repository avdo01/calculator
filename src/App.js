import React from "react";
import {
  Route,
  HashRouter,
} from "react-router-dom";
import "./App.css";
import AmortizationCalculator from "./components/AmortizationCalculator/AmortizationCalculator";
import MortgageCalculator from "./components/MortgageCalculator/MortgageCalculator";
import TodaysRates from "./components/TodaysRates/TodaysRates";
import Rates from "./components/Rates/Rates";
/**
 *
 * STEPS
 *
 * - Add the following line in the hash router (should be the ONLY child)
 * <Route exact path="/" component={MortgageCalculator} />
 * - build the app
 * - upload the build folder through ftp to the io app in wp-content/reactpress/apps/io
 * - replace the component in the hash router with the following line
 * <Route exact path="/" component={AmortizationCalculator} />
 * - build the app
 * - upload the build folder through ftp to the am app in wp-content/reactpress/apps/am
 */

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Route exact path="/" component={TodaysRates} />
        <Route exact path="/" component={Rates} />
      </HashRouter>
    </div>
  );
}

export default App;