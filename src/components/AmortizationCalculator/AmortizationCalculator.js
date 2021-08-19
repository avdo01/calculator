import React, { useState, useEffect } from 'react';
import AddExtraPayments from '../AddExtraPayments/AddExtraPayments';
import logo from '../photos/coolicon1.png';
import './amortizationCalculator.css';

const AmortizationCalculator = () => {
    const [loanAmount, setLoanAmount] = useState();
    const [loanYears, setLoanYears] = useState();
    const [loanMonths, setLoanMonths] = useState();
    const [interestRate, setInterestRate] = useState();
    const [payment, setPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (loanAmount < 1000 || loanAmount > 999999 || loanMonths > 480 || loanYears > 40 || interestRate > 99) {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }, [loanYears, loanMonths, loanAmount, interestRate]);

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
        <div className='main'>
            <div className='main-wrapper-am'>
                <div className='left-content-am'>
                    <div className='left-am-input'>
                        <div className='inputs'>
                            <h2>Loan amount</h2>
                            <input type='number' value={loanAmount} onChange={(e) => setLoanAmount(parseFloat(e.target.value))} />
                            {loanAmount < 1000 || loanAmount > 999999 ? <div className='invalid'>Minimum value: $1000<br />Maximum value: $999999</div> : null}
                        </div>
                        <div className='inputs'>
                            <h2>Loan term in years</h2>
                            <input type='number' value={loanYears} onChange={(e) => setLoanYears(parseFloat(e.target.value))} />
                            {loanYears > 40 ? <div className='invalid'>Maximum years: 40</div> : null}
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
                            {loanMonths > 480 ? <div className='invalid'>Maximum months: 480</div> : null}

                        </div>
                        <div className='inputs'>
                            <h2>Interest rate per year</h2>
                            <input type='number' value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
                            {interestRate > 99 || interestRate < 1 ? <div className='invalid'>Minimum rate: 1<br />Maximum rate: 99</div> : null}
                        </div>
                    </div>
                    <div className='left-am-button'>
                        <button disabled={disabled} onClick={() => handleClick()}>Calculate</button>
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
                            <div className='right-totals-number'>
                                ${loanAmount ? loanAmount : 0}
                            </div>
                        </div>
                        <div className='right-totals-line' />
                        <div className='right-totals'>
                            <div className='right-totals-text'>
                                Total Interest Paid
                            </div>
                            <div className='right-totals-number' style={{ paddingLeft: '8px' }}>
                                ${totalInterest ? totalInterest.toFixed(2) : 0}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddExtraPayments />
        </div>
    )
}

export default AmortizationCalculator;