import React, { useEffect, useState } from "react";
import './TodaysRates.css'

const TodaysRates = () => {
    const [todaysRatesData, setTodaysRatesData] = useState("amina");

    useEffect (() => {
        //getData();
        console.log("HEREEEE", todaysRatesData);
    },[])

const getData = async () => {
    //const response = await fetch("https://data.treasury.gov/feed.svc/DailyTreasuryYieldCurveRateData?$filter=month(NEW_DATE)%20eq%2010%20and%20year(NEW_DATE)%20eq%202021");
    //const data = await response.json();
   // setTodaysRatesData(data);
}

    return (
        <div class="todays-rates-container">
          <div class="todays-rates-title">
              <h1>Today’s rates</h1>
          </div>
          <div class="todays-rates-content">
              <div class="todays-rates-content-column">
                  <div class="todays-rates-small-box">
                      <h4>prime rate</h4>
                      <p>3.250%</p>
                  </div>
                  <div class="todays-rates-small-box">
                      <h4>5 yr TR</h4>
                      <p>0.864%</p>
                  </div>
                  <div class="todays-rates-small-box last-small-box">
                      <h4>10 yr TR</h4>
                      <p>1.478%</p>
                  </div>
              </div>
              <div class="todays-rates-content-column">
              <div class="todays-rates-small-box">
                      <h4>1 mo. LIBoR</h4>
                      <p>0.09588%</p>
                  </div>
                  <div class="todays-rates-small-box">
                      <h4>5 YR SWAP</h4>
                      <p>0.921%</p>
                  </div>
                  <div class="todays-rates-small-box last-small-box">
                      <h4>10 YR SWAP</h4>
                      <p>1.433%</p>
                  </div>
              </div>
          </div>
        </div>
    )
}

export default TodaysRates;