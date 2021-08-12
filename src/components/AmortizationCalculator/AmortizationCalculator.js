import React, { useState, useEffect } from 'react';
import logo from '../photos/Calendarr.svg';
import './amortizationCalculator.css';

const AmortizationCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(0);
    const [loanYears, setLoanYears] = useState(0);
    const [loanMonths, setLoanMonths] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [payment, setPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    useEffect(() => {
        setLoanMonths(loanYears * 12);
    }, [loanYears]);

    useEffect(() => {
        setLoanYears(loanMonths / 12);
    }, [loanMonths]);

    const totalInterestt = (value, loanMonths, loanAmount) => {
        return (value * loanMonths) - loanAmount;
    }

    const handleClick = () => {
        var percentageRate = interestRate / 1200;
        var lengthOfLoan = 12 * loanYears;
        var monthlyPayment = (loanAmount * percentageRate) / (1 - (Math.pow((1 + percentageRate), lengthOfLoan * -1)));
        if (Number.isNaN(monthlyPayment)) { setPayment(0) }
        else { setPayment(monthlyPayment); }
        const totals = totalInterestt(monthlyPayment, loanMonths, loanAmount);
        setTotalInterest(totals);
    }

    return (
        <div className='main-wrapper-am'>
            <div className='left-content-am'>
                <div className='left-am-input'>
                    <div className='inputs'>
                        <h2>Loan amount</h2>
                        <input type='number' value={loanAmount} onChange={(e) => setLoanAmount(parseFloat(e.target.value))} />
                    </div>
                    <div className='inputs'>
                        <h2>Loan term in years</h2>
                        <input type='number' value={loanYears} onChange={(e) => setLoanYears(parseFloat(e.target.value))} />
                    </div>
                </div>
                <div className='left-am-line'>
                    <div className='line-one' />
                    or
                    <div className='line-one' />
                </div>
                <div className='left-am-input'>
                    <div className='inputs'>
                        <h2>Loan term in months</h2>
                        <input type='number' value={loanMonths} onChange={(e) => setLoanMonths(parseFloat(e.target.value))} />
                    </div>
                    <div className='inputs'>
                        <h2>Interest rate per year</h2>
                        <input type='number' value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
                    </div>
                </div>
                <div className='left-am-button'>
                    <button onClick={() => handleClick()}>Calculate</button>
                    <h2>Show amortization schedule</h2>
                    <img src={logo} alt='calendar-logo' />
                </div>
            </div>
            <div className='right-content-am'>
                <div className='right-content-first'>
                    <div className='right-number-am'>
                        ${payment === 0 ? 0 : payment.toFixed(2)}
                    </div>
                    <div className='right-text-am'>
                        Monthly Payments
                    </div>
                </div>
                <div className='right-content-second'>
                    <div className='right-totals'>
                        <div className='right-totals-text'>
                            Total Principal Paid
                        </div>
                        <div className='right-totals-text'>
                            ${loanAmount ? loanAmount : 0}
                        </div>
                    </div>
                    <div className='right-totals-line' />
                    <div className='right-totals'>
                        <div className='right-totals-text'>
                            Total Interest Paid
                        </div>
                        <div className='right-totals-text' style={{ paddingLeft: '8px' }}>
                            ${totalInterest ? totalInterest.toFixed(2) : 0}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AmortizationCalculator;