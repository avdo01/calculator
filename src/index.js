import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const target = document.querySelector("#react-calculator");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('react-calculator')
);