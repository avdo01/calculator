import React, { useState, useEffect } from 'react';
import styles from './AddExtraPayments.module.css';
import plus from '../photos/plus.png';
import minus from '../photos/minus.png';

const AddExtraPayments = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034];
    const [isOpen, setIsOpen] = useState(false);
    const [amountMonthly, setAmountMonthly] = useState(0);
    const [extraYearly, setExtraYearly] = useState(0);
    const [extraYearlyMonth, setExtraYearlyMonth] = useState('');
    const [oneTime, setOneTime] = useState(0);
    const [oneTimeMonth, setOneTimeMonth] = useState(0);
    const [oneTimeYear, setOneTimeYear] = useState(0);
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
            {isOpen ?
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
                            <input type='number' placeholder='$'></input>
                        </div>
                        <div className={styles.inputText}>
                            Amount as an extra yearly payment occurring every:
                        </div>
                        <div className={styles.inputs}>
                            <input type='number' placeholder='$'></input>
                            <select>
                                {
                                    months.map(month => {
                                        return (
                                            <option>{month}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className={styles.inputText}>
                            Amount as a one-time payment in:
                        </div>
                        <div className={styles.inputs}>
                            <input type='number' placeholder='$'></input>
                            <select>
                                {
                                    months.map(month => {
                                        return (
                                            <option>{month}</option>
                                        )
                                    })
                                }
                            </select>
                            <select style={{ width: '80px' }}>
                                {
                                    years.map(year => {
                                        return (
                                            <option>{year}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className={styles.downButton}>
                        <button>Apply Extra Payments</button>
                    </div>
                </div> : null
            }
        </div>
    )
}

export default AddExtraPayments;