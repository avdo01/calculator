import React, { useState, useEffect } from 'react';
import styles from './AmortizationSchedule.module.css';
import logo from '../photos/forPrint.png';
import { getMonthIndex, nameOfMonths, nameOfMonthsShortcut } from '../Mocks/mockData';

const AmortizationSchedule = ({ loanYears, loanMonths, payment, interestRate, loanAmount, addMonthlyPayment, everyMounthAmount, everyMounthIndex, everyMounthName, oneTimeAmount, oneTimeMonth, oneTimeYear }) => {
    const [currentDate, setCurrentDate] = useState();
    const [futureDate, setFutureDate] = useState();
    var totalInterestVar = 0;
    const nullVar = 0;
    const currentMonthIndex = everyMounthIndex + 1;
    var previousMonthIndex;
    if (currentMonthIndex > 1) {
        previousMonthIndex = currentMonthIndex - 1;
    }
    else {
        previousMonthIndex = 12;
    }
    // console.log('INDEX OF MONTH', everyMounthIndex);

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
        if (totalInterestVar !== 0) {
            // console.log('TOTAL INTEREST VAR', totalInterestVar);
        }
    }, [loanYears, loanMonths, totalInterestVar]);

    useEffect(() => {
        const lastNumber = (paymentt, pti) => {
            // console.log('-----POCETAK--');
            var counter = 1;
            for (var i = 0; i < loanMonths; i++) {
                // console.log('variable', ((i + 1) * paymentt).toFixed(2));
                // console.log('my', (pti - ((i + 1) * paymentt)).toFixed(2));
                if ((pti - ((i + 1) * paymentt)).toFixed(2) > 0) {
                    // console.log('KONACNA', (pti - ((i + 1) * paymentt)).toFixed(2));
                    counter++;
                }
            }
            // console.log('COUNTER', counter)
            // console.log('-----KRAJ--');
            // console.log('Last interest', (((interestRate / 100) / 12) * 358.34).toFixed(2));
        }
        // Ovdje trenutno unosim podatke
        lastNumber(1096.6640076471413, 5000 + 71.15);
    }, [])

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
        payment = (parseFloat(payment) + parseFloat(addMonthlyPayment));
        // payment = parseFloat(payment) + parseFloat(totalInterestVar);
        var interest = interestPerMounth(interestRate, loanAmount);
        var principal = (payment - interest);
        var balance = (loanAmount - principal);
        var totalInt = parseFloat(interest);
        for (var i = 0; i < loanMonths; i++) {
            if (counter === currentMonthIndex) {
                payment = (parseFloat(payment) + parseFloat(everyMounthAmount));
            }
            tableRows.push(
                <tr className={styles.TableRow}>
                    <th className={styles.BodyOne}>{nameOfMonthsShortcut[counter - 1]} {counterYears}</th>
                    <th className={styles.BodyTwo}>${Number.isNaN(payment) === false ? parseFloat(payment).toFixed(2) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyThree}>${Number.isNaN(principal) === false ? principal.toFixed(2) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyFour}>${Number.isNaN(interest) === false ? interest.toFixed(2) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyFive}>${Number.isNaN(totalInt) === false ? totalInt.toFixed(2) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodySix}>${balance < 0 || Number.isNaN(balance) === true ? nullVar.toFixed(2) : balance.toFixed(2)}</th>
                </tr>
            )
            if (counter === currentMonthIndex) {
                payment = (parseFloat(payment) - parseFloat(everyMounthAmount));
            }
            interest = interestPerMounth(interestRate, balance);
            totalInt = parseFloat(parseFloat(totalInt) + parseFloat(interest));
            if (counter === previousMonthIndex) {
                payment = (parseFloat(payment) + parseFloat(everyMounthAmount));
            }
            principal = (payment - interest);
            balance = (parseFloat(balance) - parseFloat(principal));
            if (counter === previousMonthIndex) {
                payment = (parseFloat(payment) - parseFloat(everyMounthAmount));
            }
            counter++;
            if (interest < 0) {
                break;
            }
            if (counter > 12) {
                counter = 1;
                counterYears += 1;
            }
            // if (i === (loanMonths - 1)) {
            //     totalInterestVar = + totalInt
            // }
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