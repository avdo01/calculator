import React, { useState, useEffect } from 'react';
import './mortgageCalculator.css';

const MortgageCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [payment, setPayment] = useState(0);

    const handleClick = () => {
        let value = ((interestRate / 100) / 12) * loanAmount;
        setPayment(value);
    }

    return (
        <div className='main-wrapper'>
            <div className='left-wrapper'>
                <div className='left-content-up'>
                    <div className='left-first'>
                        <h2>Loan amount</h2>
                        <input type='number' value={loanAmount} onChange={(e) => setLoanAmount(parseFloat(e.target.value))} />
                    </div>
                    <div className='left-first'>
                        <h2>Interest rate</h2>
                        <input type='number' value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
                    </div>
                </div>
                <div className='left-content-down'>
                    <button onClick={() => handleClick()}>Calculate</button>
                </div>
            </div>
            <div className='right-wrapper'>
                <div className='right-number'>
                    ${payment === 0 ? 0 : payment.toFixed(2)}
                </div>
                <div className='right-text'>
                    New monthly payment
                </div>
            </div>
        </div>
    )
}

export default MortgageCalculator;