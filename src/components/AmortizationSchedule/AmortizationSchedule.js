import React, { useState, useEffect, useRef } from 'react';
import styles from './AmortizationSchedule.module.css';
import logo from '../photos/forPrint.png';
import { nameOfMonths, nameOfMonthsShortcut } from '../Mocks/mockData';
import ReactToPrint from 'react-to-print';

const AmortizationSchedule = ({ loanYears, loanMonths, payment, interestRate, loanAmount, addMonthlyPayment, everyMounthAmount, everyMounthIndex, everyMounthName, oneTimeAmount, oneTimeMonth, oneTimeYear }) => {
    const [currentDate, setCurrentDate] = useState();
    const [futureDate, setFutureDate] = useState();
    const printRef = useRef();
    const nullVar = 0;
    const currentMonthIndex = everyMounthIndex + 1;
    var previousMonthIndex;
    var datesArray = [];
    var yearsArray = [];
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

    useEffect(() => {
        var date = new Date();
        if (nameOfMonths[datesArray[datesArray.length - 2]] !== undefined) {
            var temp = nameOfMonths[datesArray[datesArray.length - 2]] + ' ' + date.getDate() + ', ' + yearsArray[yearsArray.length - 1];
            setFutureDate(temp);
        }
        else {
            var tempp = nameOfMonths[(date.getMonth() + 2) + ' ' + date.getDate() + ', ' + yearsArray[yearsArray.length - 1]];
            setFutureDate(tempp);
        }
    });

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
        var date = new Date();
        var tableRows = [];
        var paymentArray = [];
        var principalArray = [];
        var interestArray = [];
        var balanceArray = [];
        var totalInterestArray = [];
        var nullVar = 0;
        var paymentt = payment;
        if (addMonthlyPayment > 0) {
            paymentt += parseFloat(addMonthlyPayment);
        }
        var interest = interestPerMounth(interestRate, loanAmount);
        var principal = paymentt - interest;
        var balance = loanAmount - principal;
        var totalInterest = interest;
        var currentMonth = date.getMonth() + 1;
        var currentYear = date.getFullYear();
        var counterMonths = currentMonth + 1;
        paymentArray.push(paymentt);
        principalArray.push(principal);
        interestArray.push(interest);
        balanceArray.push(balance);

        console.log(oneTimeMonth, everyMounthIndex);
        console.log('start')
        for (var i = 0; i < loanMonths; i++) {
            console.log(counterMonths)
            datesArray.push(counterMonths);
            yearsArray.push(currentYear);
            if ((oneTimeMonth === counterMonths && oneTimeYear === currentYear)) {
                // if (i === 0) {
                //     paymentt = paymentt + parseFloat(oneTimeAmount);
                //     interest = interestPerMounth(interestRate, loanAmount);
                //     principal = parseFloat(paymentt) - parseFloat(interest);
                //     balance = loanAmount - principal;
                // }
                // else {
                paymentt = paymentt + parseFloat(oneTimeAmount);
                principal = parseFloat(paymentt) - parseFloat(interest);
                balance = balance - (parseFloat(oneTimeAmount));
                // }
            }
            if ((everyMounthIndex === counterMonths)) {
                if (i === 0) {
                    paymentt = paymentt + parseFloat(everyMounthAmount);
                    interest = interestPerMounth(interestRate, loanAmount);
                    principal = parseFloat(paymentt) - parseFloat(interest);
                    balance = loanAmount - principal;
                }
                else {
                    paymentt = paymentt + parseFloat(everyMounthAmount);
                    principal = parseFloat(paymentt) - parseFloat(interest);
                    balance = balance - (parseFloat(everyMounthAmount));
                }
            }
            tableRows.push(
                <tr className={styles.TableRow}>
                    <th className={styles.BodyOne}>{nameOfMonthsShortcut[counterMonths - 1]} {currentYear}</th>
                    <th className={styles.BodyTwo}>${paymentt.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                    <th className={styles.BodyThree}>${principal.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                    <th className={styles.BodyFour}>${interest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                    <th className={styles.BodyFive}>${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                    <th className={styles.BodySix}>${balance.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                </tr>
            )
            if ((oneTimeMonth === counterMonths && oneTimeYear === currentYear)) {
                // if (i === 0) {
                //     paymentt = paymentt - parseFloat(oneTimeAmount);
                // }
                // else {
                paymentt = paymentt - parseFloat(oneTimeAmount);
                // }
            }
            if ((everyMounthIndex === counterMonths)) {
                if (i === 0) {
                    paymentt = paymentt - parseFloat(everyMounthAmount);
                }
                else {
                    paymentt = paymentt - parseFloat(everyMounthAmount);
                }
            }
            // Smanjuje vrijednosti svega
            interest = interestPerMounth(interestRate, balance);
            totalInterest += interest;
            principal = paymentt - interest;
            balance = balance - principal;
            interestArray.push(interest);
            principalArray.push(principal);
            balanceArray.push(balance);
            totalInterestArray.push(totalInterest);
            // Pomjera mjesece i godine u tablei
            counterMonths++;
            if (interest < 0) {
                break;
            }
            if (counterMonths > 12) {
                counterMonths = 1;
                currentYear++;
            }
        }
        // Korekcija zadnjeg reda
        if (tableRows.length > 1) {
            var lastPayment = balanceArray[balanceArray.length - 3] + interestArray[interestArray.length - 2];
            var lastTotalInterest = interestArray[interestArray.length - 2] + totalInterestArray[totalInterestArray.length - 3];
            tableRows[tableRows.length - 1] =
                <tr className={styles.TableRow}>
                    <th className={styles.BodyOne}>{nameOfMonthsShortcut[counterMonths - 2]} {currentYear}</th>
                    <th className={styles.BodyTwo}>${!undefined ? lastPayment.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                    <th className={styles.BodyThree}>${!undefined ? balanceArray[balanceArray.length - 3].toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                    <th className={styles.BodyFour}>${!undefined ? interestArray[interestArray.length - 2].toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                    <th className={styles.BodyFive}>${!undefined ? lastTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                    <th className={styles.BodySix}>${nullVar.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                </tr>;
        }
        if (tableRows.length === 1) {
            tableRows[0] =
                <tr className={styles.TableRow}>
                    <th className={styles.BodyOne}>{nameOfMonthsShortcut[counterMonths - 2]} {currentYear}</th>
                    <th className={styles.BodyTwo}>${!undefined ? (loanAmount + interestPerMounth(interestRate, loanAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                    <th className={styles.BodyThree}>${!undefined ? (loanAmount).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                    <th className={styles.BodyFour}>${!undefined ? interestArray[interestArray.length - 2].toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                    <th className={styles.BodyFive}>${!undefined ? (interestPerMounth(interestRate, loanAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                    <th className={styles.BodySix}>${nullVar.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                </tr>;
        }
        if (tableRows.length === 2) {
            if (oneTimeAmount === 0) {
                tableRows[1] =
                    <tr className={styles.TableRow}>
                        <th className={styles.BodyOne}>{nameOfMonthsShortcut[counterMonths - 2]} {currentYear}</th>
                        <th className={styles.BodyTwo}>${!undefined ? (balanceArray[0] - parseFloat(everyMounthAmount) + interestArray[interestArray.length - 2]).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                        <th className={styles.BodyThree}>${!undefined ? (balanceArray[0] - parseFloat(everyMounthAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                        <th className={styles.BodyFour}>${!undefined ? interestArray[interestArray.length - 2].toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                        <th className={styles.BodyFive}>${!undefined ? (interestArray[interestArray.length - 2] + interestPerMounth(interestRate, loanAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                        <th className={styles.BodySix}>${nullVar.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                    </tr>;
            } else {
                tableRows[1] =
                    <tr className={styles.TableRow}>
                        <th className={styles.BodyOne}>{nameOfMonthsShortcut[counterMonths - 2]} {currentYear}</th>
                        <th className={styles.BodyTwo}>${!undefined ? (balanceArray[0] - parseFloat(everyMounthAmount) - parseFloat(oneTimeAmount) + interestArray[interestArray.length - 2]).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                        <th className={styles.BodyThree}>${!undefined ? (balanceArray[0] - parseFloat(everyMounthAmount) - parseFloat(oneTimeAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                        <th className={styles.BodyFour}>${!undefined ? interestArray[interestArray.length - 2].toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                        <th className={styles.BodyFive}>${!undefined ? (interestArray[interestArray.length - 2] + interestPerMounth(interestRate, loanAmount)).toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : null}</th>
                        <th className={styles.BodySix}>${nullVar.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
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
                <div className={styles.Table} ref={printRef}>
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
                        <ReactToPrint
                            trigger={() => {
                                return <input type="button" value={'Print Schedule'} />
                            }}
                            content={() => printRef.current}
                        />
                    </div>
                    <div className={styles.PrintImage}>
                        <ReactToPrint
                            trigger={() => {
                                return <input type="image" src={logo} />
                            }}
                            content={() => printRef.current}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AmortizationSchedule;