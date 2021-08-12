import './App.css';
import AmortizationCalculator from './components/AmortizationCalculator/AmortizationCalculator';
import MortgageCalculator from './components/MortgageCalculator/MortgageCalculator';


function App() {
  return (
    <div className="App">
      <AmortizationCalculator />
      <br />
      <MortgageCalculator />
    </div>
  );
}

export default App;
