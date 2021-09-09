import React, { useState, useEffect } from 'react';
import styles from './AmortizationSchedule.module.css';
import logo from '../photos/forPrint.png';
import { nameOfMonths, nameOfMonthsShortcut } from '../Mocks/mockData';

const AmortizationSchedule = ({ loanYears, loanMonths, payment, interestRate, loanAmount }) => {
    const [currentDate, setCurrentDate] = useState();
    const [futureDate, setFutureDate] = useState();
    // const [numberOfMonths, setNumberOfMonths] = useState(0);
    const nullVar = 0;

    useEffect(() => {
        if (Number.isInteger(loanYears) === true && Number.isInteger(loanMonths) === false && (loanMonths !== 0 || loanYears !== 0)) {
            getDate('years');
        }
        else if (Number.isNaN(loanYears) === true || Number.isNaN(loanMonths) === true) {
            getDate('nan');
        }
        else {
            getDate('months');
            addTableRows(loanMonths);
        }
    }, [loanYears, loanMonths]);

    const interestPerMounth = (interestRate, pmtt) => {
        return (((interestRate / 100) / 12) * pmtt)
    }

    const currentMonth = () => {
        var today = new Date();
        return today.getMonth() + 1;
    }

    const currentYear = () => {
        var today = new Date();
        return today.getFullYear();
    }

    const addTableRows = (loanMonths) => {
        var tableRows = [];
        var counter = currentMonth() + 1;
        var counterYears = currentYear();
        var paymentt = payment.toFixed(2);
        var interest = interestPerMounth(interestRate, loanAmount);
        var principal = (payment - interest);
        var balance = (loanAmount - principal);
        var totalInt = parseFloat(interest);
        for (var i = 0; i < loanMonths; i++) {
            tableRows.push(
                <tr className={styles.TableRow}>
                    <th className={styles.BodyOne}>{nameOfMonthsShortcut[counter - 1]} {counterYears}</th>
                    <th className={styles.BodyTwo}>${paymentt}</th>
                    <th className={styles.BodyThree}>${Number.isNaN(principal) === false ? principal.toFixed(2) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyFour}>${Number.isNaN(interest) === false ? interest.toFixed(2) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyFive}>${Number.isNaN(totalInt) === false ? totalInt.toFixed(2) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodySix}>${balance < 0 || Number.isNaN(balance) === true ? nullVar.toFixed(2) : balance.toFixed(2)}</th>
                </tr>
            )
            interest = interestPerMounth(interestRate, balance);
            totalInt = parseFloat(parseFloat(totalInt) + parseFloat(interest));
            principal = (payment - interest);
            balance = (balance - principal);
            counter++;
            if (counter > 12) {
                counter = 1;
                counterYears += 1;
            }
        }
        return tableRows;
    }

    const rowsRender = () => {
        return (
            addTableRows(loanMonths)
        )
    }

    const getDate = (yearsOrMonths) => {
        var today = new Date();
        let current = (today.getMonth() + 1) + '/' + (today.getDate()) + '/' + (today.getFullYear());
        setCurrentDate(current);
        if (yearsOrMonths === 'years') {
            var future = new Date();
            future.setFullYear(future.getFullYear() + loanYears);
            setFutureDate((nameOfMonths[future.getMonth() + 1]) + ' ' + (future.getDate()) + ', ' + (future.getFullYear()));
        }
        else if (yearsOrMonths === 'nan') {
            // var today = new Date();
            let fut = (nameOfMonths[today.getMonth()]) + ' ' + (today.getDate()) + ', ' + (today.getFullYear());
            setFutureDate(fut);
        }
        else {
            var future = new Date();
            future.setMonth(future.getMonth() + loanMonths);
            setFutureDate((nameOfMonths[future.getMonth()]) + ' ' + (future.getDate()) + ', ' + (future.getFullYear()));
        }
    }

    return (
        <div className={styles.MainWrapper}>
            <div className={styles.CentralWrapper}>
                <div className={styles.Date}>
                    <div className={styles.StartDateDiv}>
                        <div className={styles.StartDateDivText}>
                            Start Date
                        </div>
                        <div className={styles.StartDateDivInput}>
                            <input type="text" value={currentDate} disabled={true}></input>
                        </div>
                    </div>
                    <div className={styles.EstimatedDate}>
                        <div className={styles.EstimatedDateText}>
                            Estimated Payoff Date
                        </div>
                        <div className={styles.EstimatedDateEnd}>
                            {futureDate ? futureDate : currentDate}
                        </div>
                    </div>
                </div>
                <div className={styles.Title}>
                    Amortization Schedule
                </div>
                <div className={styles.Table}>
                    <thead>
                        <tr>
                            <th className={styles.HeadOne}>Payment Date</th>
                            <th className={styles.HeadTwo}>Payment</th>
                            <th className={styles.HeadThree}>Principal</th>
                            <th className={styles.HeadFour}>Interest</th>
                            <th className={styles.HeadFive}>Total Interest</th>
                            <th className={styles.HeadSix}>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rowsRender()}
                    </tbody>
                </div>
                <div className={styles.Print}>
                    <div className={styles.PrintText}>
                        Print Schedule
                    </div>
                    <div className={styles.PrintImage}>
                        <img alt="Print" src={logo} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AmortizationSchedule;