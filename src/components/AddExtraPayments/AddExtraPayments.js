import React, { useState, useEffect } from 'react';
import styles from './AddExtraPayments.module.css';
import plus from '../photos/plus.png';
import minus from '../photos/minus.png';
import { getMonthIndex, monthsInYear, nameOfMonths, years, currentYear } from '../Mocks/mockData';

const AddExtraPayments = ({ setAddMonthlyPayment, setEveryMounthAmount, setEveryMounthName, setOneTimeAmount, setOneTimeMonth, setOneTimeYear, setEveryMounthIndex, setIsApplyed }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [addMonthlyPaymentX, setAddMonthlyPaymentX] = useState(0);
    const [everyMounthAmountX, setEveryMounthAmountX] = useState(0);
    const [everyMounthNameX, setEveryMounthNameX] = useState('January');
    const [everyMounthIndexX, setEveryMounthIndexX] = useState(0);
    const [oneTimeAmountX, setOneTimeAmountX] = useState(0);
    const [oneTimeMonthX, setOneTimeMonthX] = useState(0);
    const [oneTimeYearX, setOneTimeYearX] = useState(currentYear);
    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.up}>
                <div className={styles.leftContent}>
                    {
                        !isOpen ?
                            <div className={styles.leftContentText}>
                                Add Extra Payments
                            </div>
                            :
                            <div className={styles.leftContentText}>
                                Hide Extra Payments
                            </div>
                    }
                </div>
                <div className={styles.rightContent}>
                    {!isOpen ? <a onClick={() => handleClick()}><img className={styles.plus} src={plus} alt='plus-logo' /></a> : null}
                    {isOpen ? <a onClick={() => handleClick()}><img className={styles.minus} src={minus} alt='minus-logo' /></a> : null}
                </div>
            </div>
            {isOpen &&
                <div className={styles.down}>
                    <div className={styles.downText}>
                        <div className={styles.downTextContent}>
                            Calculate the impact of extra payments using any combination of the
                        </div>
                        <div className={styles.downTextContent}>
                            inputs below. To see your new estimated payoff date, click ‘Show
                        </div>
                        <div className={styles.downTextContent}>
                            amortization schedule’ link above.
                        </div>
                    </div>
                    <div className={styles.downInput}>
                        <div className={styles.inputText}>
                            Amount to your monthly payment
                        </div>
                        <div className={styles.inputs}>
                            <input type='number' placeholder='$' onChange={(e) => {
                                if (e.target.value) {
                                    setAddMonthlyPaymentX(e.target.value);
                                }
                                else {
                                    setAddMonthlyPaymentX(0);
                                }
                            }} />
                        </div>
                        <div className={styles.inputText}>
                            Amount as an extra yearly payment occurring every:
                        </div>
                        <div className={styles.inputs}>
                            <input type='number' placeholder='$' onChange={(e) => {
                                if (e.target.value) {
                                    setEveryMounthAmountX(e.target.value);
                                }
                                else {
                                    setEveryMounthAmountX(0)
                                }
                            }} />
                            <select onChange={(e) => {
                                if (e.target.value) {
                                    setEveryMounthIndexX(parseFloat(e.target.value));
                                }
                                else {
                                    setEveryMounthIndexX(0);
                                }
                            }}>
                                {
                                    nameOfMonths.map((month, index) => {
                                        return (
                                            <option key={index} value={index + 1}>{month}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className={styles.inputText}>
                            Amount as a one-time payment in:
                        </div>
                        <div className={styles.inputs}>
                            <input type='number' placeholder='$' onChange={(e) => {
                                if (e.target.value) {
                                    setOneTimeAmountX(e.target.value)
                                }
                                else {
                                    setOneTimeAmountX(0)
                                }
                            }} />
                            <select onChange={(e) => {
                                if (e.target.value) {
                                    setOneTimeMonthX(parseFloat(e.target.value))
                                }
                                else {
                                    setOneTimeMonthX(0);
                                }
                            }}>
                                {
                                    nameOfMonths.map((month, index) => {
                                        return (
                                            <option key={index} value={index + 1}>{month}</option>
                                        )
                                    })
                                }
                            </select>
                            <select style={{ width: '80px' }} onChange={(e) => {
                                if (e.target.value || e.target.value !== 0) {
                                    setOneTimeYearX(parseFloat(e.target.value));
                                }
                                else {
                                    setOneTimeYearX(parseFloat(currentYear));
                                }

                            }}>
                                {
                                    years.map((year, index) => {
                                        return (
                                            <option key={index} value={year}>{year}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className={styles.downButton}>
                        <button onClick={() => {
                            setAddMonthlyPayment(addMonthlyPaymentX);
                            setEveryMounthAmount(everyMounthAmountX);
                            setEveryMounthName(nameOfMonths[everyMounthIndexX]);
                            setOneTimeAmount(oneTimeAmountX);
                            setOneTimeMonth(oneTimeMonthX);
                            setOneTimeYear(oneTimeYearX);
                            setEveryMounthIndex(everyMounthIndexX);
                            setClicked(!clicked);
                        }}>Apply Extra Payments</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AddExtraPayments;