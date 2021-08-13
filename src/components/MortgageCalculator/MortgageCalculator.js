import React, { useState, useEffect } from 'react';
import './mortgageCalculator.css';

const MortgageCalculator = () => {
    const [loanAmount, setLoanAmount] = useState();
    const [interestRate, setInterestRate] = useState();
    const [payment, setPayment] = useState(0);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if ((loanAmount < 1000 || loanAmount > 999999) || (interestRate < 1 || interestRate > 99)) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [loanAmount, interestRate]);

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
                        <input type='number' placeholder='0' onChange={(e) => setLoanAmount(parseFloat(e.target.value))} />
                        {loanAmount < 1000 || loanAmount > 999999 ? <div className='invalid'>Minimum value: $1000<br />Maximum value: $999999</div> : null}
                    </div>
                    <div className='left-first'>
                        <h2>Interest rate</h2>
                        <input type='number' placeholder='0' onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
                        {interestRate < 1 || interestRate > 99 ? <div className='invalid'>Minimum rate: 1%<br />Maximum rate: 99%</div> : null}
                    </div>
                </div>
                <div className='left-content-down'>
                    <button disabled={disabled} onClick={() => handleClick()}>Calculate</button>
                </div>
            </div>
            <div className='right-wrapper'>
                <div className='right-number'>
                    ${payment === 0 || Number.isNaN(payment) ? 0 : payment.toFixed(2)}
                </div>
                <div className='right-text'>
                    New monthly payment
                </div>
            </div>
        </div>
    )
}

export default MortgageCalculator;