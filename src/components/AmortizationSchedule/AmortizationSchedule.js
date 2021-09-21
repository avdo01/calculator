import React, { useState, useEffect } from 'react';
import styles from './AmortizationSchedule.module.css';
import logo from '../photos/forPrint.png';
import { getMonthIndex, nameOfMonths, nameOfMonthsShortcut } from '../Mocks/mockData';

const AmortizationSchedule = ({ loanYears, loanMonths, payment, interestRate, loanAmount, addMonthlyPayment, everyMounthAmount, everyMounthIndex, everyMounthName, oneTimeAmount, oneTimeMonth, oneTimeYear }) => {
    const [currentDate, setCurrentDate] = useState();
    const [futureDate, setFutureDate] = useState();
    const nullVar = 0;
    const currentMonthIndex = everyMounthIndex + 1;
    var previousMonthIndex;
    if (currentMonthIndex > 1) {
        previousMonthIndex = currentMonthIndex - 1;
    }
    else {
        previousMonthIndex = 12;
    }

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
        var interestArray = [];
        var balanceArray = [];
        var totalInterestArray = [];
        var counter = currentMonth() + 1;
        var counterYears = currentYear();
        payment = (parseFloat(payment) + parseFloat(addMonthlyPayment));
        var interest = interestPerMounth(interestRate, loanAmount);
        var principal = (payment - interest);
        var balance = (loanAmount - principal);
        var totalInt = parseFloat(interest);
        var sum = loanAmount;
        var sumOne = loanAmount;
        var coMounth = 0;
        var startMonth;
        var startYear;
        if (everyMounthIndex === (counter - 1)) {
            startMonth = true;
        } else {
            startMonth = false;
        }
        if (oneTimeMonth === (counter - 1) && oneTimeYear === counterYears) {
            startYear = true;
        } else {
            startYear = false;
        }
        for (var i = 0; i < loanMonths; i++) {
            if (counterYears === oneTimeYear && counter === oneTimeMonth + 1 && startYear === false) {
                payment = (parseFloat(payment) + parseFloat(oneTimeAmount));
            }
            if (counterYears === oneTimeYear && counter === oneTimeMonth + 1 && startYear === true) {
                payment = (parseFloat(payment) + parseFloat(oneTimeAmount));
                interest = interestPerMounth(interestRate, sumOne);
                principal = payment - interest;
            }
            if (counter === currentMonthIndex && startMonth === false) {
                payment = (parseFloat(payment) + parseFloat(everyMounthAmount));
            }
            if (startMonth === true && counter === currentMonthIndex) {
                payment = (parseFloat(payment) + parseFloat(everyMounthAmount));
                interest = interestPerMounth(interestRate, sum);
                principal = payment - interest;
                if (coMounth === 0) {
                    balance -= parseFloat(everyMounthAmount);
                    coMounth++;
                }
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
            if (interest < 0) {
                var lastPayment = balanceArray[balanceArray.length - 3] + parseFloat(interestArray[interestArray.length - 2]);
                var lastPrincipal = balanceArray[balanceArray.length - 3];
                var lastInterest = interestArray[interestArray.length - 2];
                var lastTotalInterest = totalInterestArray[totalInterestArray.length - 3] + lastInterest;
                // console.log('payment', lastPayment);
                // console.log('----', parseFloat(interestArray[interestArray.length - 2]));
                // console.log('---->', balanceArray[balanceArray.length - 3]);
                // console.log('BBB', parseFloat(balanceArray[balanceArray.length - 3]) + parseFloat(interestArray[interestArray.length - 2]));
                tableRows.pop();
                tableRows[tableRows.length - 1] = <tr className={styles.TableRow}>
                    <th className={styles.BodyOne}>{nameOfMonthsShortcut[counter - 2]} {counterYears}</th>
                    <th className={styles.BodyTwo}>${lastPayment && lastPayment.toFixed(2)}</th>
                    <th className={styles.BodyThree}>${lastPrincipal && lastPrincipal.toFixed(2)}</th>
                    <th className={styles.BodyFour}>${lastInterest && lastInterest.toFixed(2)}</th>
                    <th className={styles.BodyFive}>${lastTotalInterest && lastTotalInterest.toFixed(2)}</th>
                    <th className={styles.BodySix}>${balance < 0 || Number.isNaN(balance) === true ? nullVar.toFixed(2) : balance.toFixed(2)}</th>
                </tr>;
                break;
            }
            if (counter === currentMonthIndex && startMonth === false) {
                payment = (parseFloat(payment) - parseFloat(everyMounthAmount));
            }
            if (counterYears === oneTimeYear && counter === oneTimeMonth + 1 && startYear === false) {
                payment = (parseFloat(payment) - parseFloat(oneTimeAmount));
            }
            if (counterYears === oneTimeYear && counter === oneTimeMonth + 1 && startYear === true) {
                payment = (parseFloat(payment) - parseFloat(oneTimeAmount));
                interest = interestPerMounth(interestRate, sumOne);
                principal = payment - interest;
                balance -= parseFloat(oneTimeAmount);
                sumOne = balance;
            }
            interest = interestPerMounth(interestRate, balance);
            totalInt = parseFloat(parseFloat(totalInt) + parseFloat(interest));
            if (counterYears === oneTimeYear && counter === oneTimeMonth) {
                payment = (parseFloat(payment) + parseFloat(oneTimeAmount));
            }
            if (counter === previousMonthIndex) {
                payment = (parseFloat(payment) + parseFloat(everyMounthAmount));
            }
            principal = (payment - interest);
            balance = (parseFloat(balance) - parseFloat(principal));
            if (startMonth === true && counter === currentMonthIndex) {
                payment = (parseFloat(payment) - parseFloat(everyMounthAmount));
                interest = interestPerMounth(interestRate, sum);
                principal = payment - interest;
                balance += parseFloat(everyMounthAmount);
                sum = balance;
            }
            if (counter === previousMonthIndex) {
                payment = (parseFloat(payment) - parseFloat(everyMounthAmount));
            }
            if (counterYears === oneTimeYear && counter === oneTimeMonth) {
                payment = (parseFloat(payment) - parseFloat(oneTimeAmount));
            }
            counter++;
            interestArray.push(interest);
            balanceArray.push(balance);
            totalInterestArray.push(totalInt);

            // if (interest < 0) {
            //     break;
            // }
            if (counter > 12) {
                counter = 1;
                counterYears += 1;
            }
            if (i === loanMonths - 1) {
                var lastPayment = balanceArray[balanceArray.length - 3] + parseFloat(interestArray[interestArray.length - 2]);
                var lastPrincipal = balanceArray[balanceArray.length - 3];
                var lastInterest = interestArray[interestArray.length - 2];
                var lastTotalInterest = totalInterestArray[totalInterestArray.length - 3] + lastInterest;
                tableRows[tableRows.length - 1] = <tr className={styles.TableRow}>
                    <th className={styles.BodyOne}>{nameOfMonthsShortcut[counter - 2]} {counterYears}</th>
                    <th className={styles.BodyTwo}>${lastPayment && lastPayment.toFixed(2)}</th>
                    <th className={styles.BodyThree}>${lastPrincipal && lastPrincipal.toFixed(2)}</th>
                    <th className={styles.BodyFour}>${lastInterest && lastInterest.toFixed(2)}</th>
                    <th className={styles.BodyFive}>${lastTotalInterest && lastTotalInterest.toFixed(2)}</th>
                    <th className={styles.BodySix}>${balance < 0 || Number.isNaN(balance) === true ? nullVar.toFixed(2) : balance.toFixed(2)}</th>
                </tr>;
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