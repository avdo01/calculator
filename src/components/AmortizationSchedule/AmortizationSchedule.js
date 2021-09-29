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
        datesArray[datesArray.length - 1] =
            setFutureDate(datesArray[datesArray.length - 1]);
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
        var interestArray = [];
        var balanceArray = [];
        var totalInterestArray = [];
        var day = date.getDate();
        var counter = currentMonth() + 1;
        var counterYears = currentYear();
        if (addMonthlyPayment) {
            payment = (parseFloat(payment) + parseFloat(addMonthlyPayment));
        }
        var interest = interestPerMounth(interestRate, loanAmount);
        var principal = (payment - interest);
        var balance = (loanAmount - principal);
        var totalInt = parseFloat(interest);
        var firstBalanceMonthStart = balance - everyMounthAmount - oneTimeAmount;
        var secondInterestMonthStart = interestPerMounth(interestRate, firstBalanceMonthStart);
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
                principal = payment - interest;
            }
            if (startMonth === true && counter === currentMonthIndex && coMounth === 0) {
                payment = (parseFloat(payment) + parseFloat(everyMounthAmount));
                interest = interestPerMounth(interestRate, sum);
                principal = payment - interest;
                balance -= parseFloat(everyMounthAmount);
                sum = balance;
                coMounth++;
            }
            if (i === 0 && oneTimeAmount > 0 && oneTimeYear === currentYear()) {
                tableRows.push(
                    <tr className={styles.TableRow}>
                        <th className={styles.BodyOne}>{nameOfMonthsShortcut[counter - 1]} {counterYears}</th>
                        <th className={styles.BodyTwo}>${Number.isNaN(payment) === false ? payment.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyThree}>${Number.isNaN(principal) === false ? principal.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyFour}>${Number.isNaN(interest) === false ? interest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyFive}>${Number.isNaN(totalInt) === false ? totalInt.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodySix}>${firstBalanceMonthStart < 0 || Number.isNaN(firstBalanceMonthStart) === true ? nullVar.toFixed(2) : firstBalanceMonthStart.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                    </tr>
                )
            } else if (i === 1 && oneTimeAmount > 0 && oneTimeYear === currentYear()) {
                tableRows.push(
                    <tr className={styles.TableRow}>
                        <th className={styles.BodyOne}>{nameOfMonthsShortcut[counter - 1]} {counterYears}</th>
                        <th className={styles.BodyTwo}>${Number.isNaN(payment) === false ? payment.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyThree}>${Number.isNaN(principal) === false ? principal.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyFour}>${Number.isNaN(secondInterestMonthStart) === false ? secondInterestMonthStart.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyFive}>${Number.isNaN(totalInt) === false ? totalInt.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodySix}>${balance < 0 || Number.isNaN(balance) === true ? nullVar.toFixed(2) : balance.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                    </tr>
                )
            }
            else {
                tableRows.push(
                    <tr className={styles.TableRow}>
                        <th className={styles.BodyOne}>{nameOfMonthsShortcut[counter - 1]} {counterYears}</th>
                        <th className={styles.BodyTwo}>${Number.isNaN(payment) === false ? payment.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyThree}>${Number.isNaN(principal) === false ? principal.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyFour}>${Number.isNaN(interest) === false ? interest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyFive}>${Number.isNaN(totalInt) === false ? totalInt.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodySix}>${balance < 0 || Number.isNaN(balance) === true ? nullVar.toFixed(2) : balance.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                    </tr>
                )
            }
            datesArray.push(nameOfMonths[counter - 1] + ' ' + day + ', ' + counterYears);
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
                    <th className={styles.BodyTwo}>${(lastPayment && Number.isNaN(lastPayment) !== true) ? lastPayment.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyThree}>${(lastPrincipal && Number.isNaN(lastPrincipal) !== true) ? lastPrincipal.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyFour}>${(lastInterest && Number.isNaN(lastInterest) !== true) ? lastInterest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyFive}>${(lastTotalInterest && Number.isNaN(lastTotalInterest) !== true) ? lastTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodySix}>${balance < 0 || Number.isNaN(balance) === true ? nullVar.toFixed(2) : balance.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                </tr>;
                datesArray[datesArray.length - 1] = (nameOfMonths[counter - 2] + ' ' + day + ', ' + counterYears);
                break;
            }
            if (counter === currentMonthIndex && startMonth === false) {
                payment = (parseFloat(payment) - parseFloat(everyMounthAmount));
                principal = payment - interest;
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
            if (startMonth === true && counter === currentMonthIndex && coMounth === 1) {
                payment = (parseFloat(payment) - parseFloat(everyMounthAmount));
                interest = interestPerMounth(interestRate, sum);
                principal = payment - interest;
                balance += (parseFloat(everyMounthAmount));
                sum = balance;
                coMounth++;
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
                    <th className={styles.BodyTwo}>${(lastPayment && Number.isNaN(lastPayment) !== true) ? lastPayment.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyThree}>${(lastPrincipal && Number.isNaN(lastPrincipal) !== true) ? lastPrincipal.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyFour}>${(lastInterest && Number.isNaN(lastInterest) !== true) ? lastInterest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyFive}>${(lastTotalInterest && Number.isNaN(lastTotalInterest) !== true) ? lastTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodySix}>${balance < 0 || Number.isNaN(balance) === true ? nullVar.toFixed(2) : balance.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                </tr>;
                datesArray[datesArray.length - 1] = (nameOfMonths[counter - 2] + ' ' + day + ', ' + counterYears);
            }
        }
        if (tableRows.length === 1) {
            var onlyInterest = interestPerMounth(interestRate, loanAmount);
            var onlyTotalInterest = onlyInterest;
            var onlyPayment = loanAmount + onlyInterest;
            var onlyPrincipal = onlyPayment - onlyInterest;
            var onlyBalance = 0;
            tableRows[0] =
                <tr className={styles.TableRow}>
                    <th className={styles.BodyOne}>{nameOfMonthsShortcut[counter - 2]} {counterYears}</th>
                    <th className={styles.BodyTwo}>${Number.isNaN(onlyPayment) === false ? onlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyThree}>${Number.isNaN(onlyPrincipal) === false ? onlyPrincipal.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyFour}>${Number.isNaN(onlyInterest) === false ? onlyInterest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodyFive}>${Number.isNaN(onlyTotalInterest) === false ? onlyTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                    <th className={styles.BodySix}>${onlyBalance < 0 || Number.isNaN(onlyBalance) === true ? nullVar.toFixed(2) : onlyBalance.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                </tr>;

        }
        if (tableRows.length === 2) {
            var onlyTwoInterest = interestPerMounth(interestRate, loanAmount);
            var firstPayment = payment;
            var firstPrincipal = payment - onlyTwoInterest;
            var firstInterest = interestPerMounth(interestRate, loanAmount);
            var firstTotalInterest = interestPerMounth(interestRate, loanAmount);
            var firstBalance = loanAmount - firstPrincipal;
            var secondInterest = interestPerMounth(interestRate, firstBalance);
            var secondPayment = firstBalance + secondInterest;
            var secondPrincipal = firstBalance;
            var secondTotalInterest = firstInterest + secondInterest;
            var secondBalance = 0;
            if ((everyMounthIndex === currentMonth() && everyMounthAmount > 0) || (oneTimeYear === currentYear() && oneTimeMonth === currentMonth() && oneTimeAmount > 0)) {
                var totalSum = parseFloat(everyMounthAmount) + parseFloat(oneTimeAmount);
                var tempInterest = interestPerMounth(interestRate, loanAmount);
                var tempPayment = payment + totalSum;
                var tempPrincipal = tempPayment - tempInterest;
                var tempBalance = loanAmount - tempPrincipal;
                var secondInterestMonth = interestPerMounth(interestRate, tempBalance);
                var secondPaymentMonth = tempBalance + secondInterestMonth;
                var secondPrincipalMonth = tempBalance;
                var secondTotalInterestMonth = tempInterest + secondInterestMonth;
                var secondBalanceMonth = 0;
                tableRows[1] =
                    <tr className={styles.TableRow}>
                        <th className={styles.BodyOne}>{nameOfMonthsShortcut[counter - 2]} {counterYears}</th>
                        <th className={styles.BodyTwo}>${Number.isNaN(secondPaymentMonth) === false ? secondPaymentMonth.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyThree}>${Number.isNaN(secondPrincipalMonth) === false ? secondPrincipalMonth.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyFour}>${Number.isNaN(secondInterestMonth) === false ? secondInterestMonth.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyFive}>${Number.isNaN(secondTotalInterestMonth) === false ? secondTotalInterestMonth.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodySix}>${secondBalanceMonth < 0 || Number.isNaN(secondBalanceMonth) === true ? nullVar.toFixed(2) : secondBalanceMonth.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
                    </tr>;

            }
            else {
                tableRows[1] =
                    <tr className={styles.TableRow}>
                        <th className={styles.BodyOne}>{nameOfMonthsShortcut[counter - 2]} {counterYears}</th>
                        <th className={styles.BodyTwo}>${Number.isNaN(secondPayment) === false ? secondPayment.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyThree}>${Number.isNaN(secondPrincipal) === false ? secondPrincipal.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyFour}>${Number.isNaN(secondInterest) === false ? secondInterest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodyFive}>${Number.isNaN(secondTotalInterest) === false ? secondTotalInterest.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : nullVar.toFixed(2)}</th>
                        <th className={styles.BodySix}>${secondBalance < 0 || Number.isNaN(secondBalance) === true ? nullVar.toFixed(2) : secondBalance.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}</th>
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