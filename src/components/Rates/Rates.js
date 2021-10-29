import React, { useState, useEffect, useRef } from "react";
import USTreasuries from "../USTreasuries/USTreasuries";
import SwapsSemiBond from '../SwapsSemiBond/SwapsSemiBond';
import SwapsMonthlyMoney from '../SwapsMonthlyMoney/SwapsMonthlyMoney';
import USDLibor from '../USDLibor/USDLibor';
import Sofr from '../Sofr/Sofr';
import OtherUSRates from '../OtherUSRates/OtherUSRates';
import Sifma from '../Sifma/Sifma';
import logo from '../photos/forPrint.png';
import ReactToPrint from 'react-to-print';
import './Rates.css';

const Rates = () => {
    const printRef = useRef();
   /*const [data, setData] = useState();
   
   useEffect = (()=> {

   }, []) */
    return (
        <div class="rates-container">
            <USTreasuries />
            <SwapsSemiBond />
            <SwapsMonthlyMoney />
            <USDLibor />
            <Sofr />
            <OtherUSRates />
            <Sifma />
            <div className="print-container">
                    <div className="print-text">
                        <ReactToPrint
                            trigger={() => {
                                return <input type="button" value={'Print Rates'} />
                            }}
                            content={() => printRef.current}
                        />
                    </div>
                    <div className="print-icon">
                        <ReactToPrint
                            trigger={() => {
                                return <input type="image" src={logo} />
                            }}
                            content={() => printRef.current}
                        />
                    </div>
                </div>
        </div>
    )
}

export default Rates;