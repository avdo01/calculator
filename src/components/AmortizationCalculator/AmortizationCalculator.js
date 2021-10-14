import React, { useState, useEffect } from 'react';
import AddExtraPayments from '../AddExtraPayments/AddExtraPayments';
import AmortizationSchedule from '../AmortizationSchedule/AmortizationSchedule';
import { getNumberWithCommas } from '../Mocks/mockData';
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
    const [amScheduleOpen, setAmScheduleOpen] = useState(false);
    const [addMonthlyPayment, setAddMonthlyPayment] = useState(0);
    const [everyMounthAmount, setEveryMounthAmount] = useState(0);
    const [everyMounthName, setEveryMounthName] = useState('');
    const [everyMounthIndex, setEveryMounthIndex] = useState(0);
    const [oneTimeAmount, setOneTimeAmount] = useState(0);
    const [oneTimeMonth, setOneTimeMonth] = useState(0);
    const [oneTimeYear, setOneTimeYear] = useState(0);
    const [isApplyed, setIsApplyed] = useState(false);

    useEffect(() => {
        if (loanAmount < 1 || loanAmount > 1000000000000000 || loanMonths > 1200 || loanYears > 100) {
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

    
    // console.log('number', payment.toFixed().toString().length + 2, payment);
    const maximumValue = getNumberWithCommas(1000000000000000);

    const totalInterestt = (value, loanMonths, loanAmount) => {
        return (value * loanMonths) - loanAmount;
    }

    const amScheduleToggle = () => {
        setAmScheduleOpen(!amScheduleOpen);
    }

    const getDate = () => {
        var today = new Date();
        var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
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
                            {loanAmount < 1 || loanAmount > 1000000000000000 ? <div className='invalid'>Minimum value: $1<br />Maximum value: ${maximumValue}</div> : null}
                        </div>
                        <div className='inputs'>
                            <h2>Loan term in years</h2>
                            <input type='number' value={loanYears} onChange={(e) => setLoanYears(parseFloat(e.target.value))} />
                            {loanYears > 100 ? <div className='invalid'>Maximum years: 100</div> : null}
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
                            {loanMonths > 1200 ? <div className='invalid'>Maximum months: 1200</div> : null}

                        </div>
                        <div className='inputs'>
                            <h2>Interest rate per year</h2>
                            <input type='number' value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
                            {/* {interestRate > 99 || interestRate < 1 ? <div className='invalid'>Minimum rate: 1<br />Maximum rate: 99</div> : null} */}
                        </div>
                    </div>
                    <div className='left-am-button'>
                        <button disabled={disabled} onClick={() => handleClick()}>Calculate</button>
                        {!amScheduleOpen ?
                            <a onClick={() => amScheduleToggle()}><h2>Show amortization schedule</h2></a>
                            :
                            <a onClick={() => amScheduleToggle()}><h2>Hide amortization schedule</h2></a>
                        }
                        <img src={logo} alt='calendar-logo' />
                    </div>
                </div>
                <div className='right-content-am'>
                    <div className='right-content-first'>
                        <div className='right-number-am'>
                            ${payment === 0 ? 0 : payment.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}
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
                                ${loanAmount ? loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0, minimumFractionDigits: 0 }) : 0}
                            </div>
                        </div>
                        <div className='right-totals-line' />
                        <div className='right-totals'>
                            <div className='right-totals-text'>
                                Total Interest Paid
                            </div>
                            <div className='right-totals-number' style={{ paddingLeft: '8px' }}>
                                ${totalInterest ? totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : 0}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddExtraPayments
                setAddMonthlyPayment={setAddMonthlyPayment}
                setEveryMounthAmount={setEveryMounthAmount}
                setEveryMounthName={setEveryMounthName}
                setOneTimeAmount={setOneTimeAmount}
                setOneTimeMonth={setOneTimeMonth}
                setOneTimeYear={setOneTimeYear}
                setIsApplyed={setIsApplyed}
                setEveryMounthIndex={setEveryMounthIndex}
            />
            {amScheduleOpen &&
                <AmortizationSchedule
                    loanYears={loanYears}
                    loanMonths={loanMonths}
                    payment={payment}
                    interestRate={interestRate}
                    loanAmount={loanAmount}
                    addMonthlyPayment={addMonthlyPayment}
                    everyMounthAmount={everyMounthAmount}
                    everyMounthName={everyMounthName}
                    everyMounthIndex={everyMounthIndex}
                    oneTimeAmount={oneTimeAmount}
                    oneTimeMonth={oneTimeMonth}
                    oneTimeYear={oneTimeYear}
                />
            }
        </div>
    )
}

export default AmortizationCalculator;