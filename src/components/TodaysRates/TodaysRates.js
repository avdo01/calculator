import React, { useEffect } from "react";
import "./TodaysRates.css";

const TodaysRates = () => {
  //const [todaysRatesData, setTodaysRatesData] = useState(null);

  useEffect(() => {
    getData();
    console.log("HEREEEE");
  });

  const getData = async () => {
    const responseXML5 = await fetch(
      "https://mbp-backend-test.herokuapp.com/xml5"
    );
    const dataXML5 = await responseXML5.json();
    console.log("res xml5", dataXML5.QR_GOING_RATES_EXTENDED.LIST_G_CROSS[0]);
    /*const responseXML4 = await fetch("https://mbp-backend-test.herokuapp.com/xml4");
    const dataXML4 = await responseXML4.json();
    console.log("res xml4", dataXML4.QR_GOING_RATES_EXTENDED.LIST_G_CROSS[0]);
    const responseXML3 = await fetch("https://mbp-backend-test.herokuapp.com/xml3");
    const dataXML3 = await responseXML3.json();
    console.log("res xml3", dataXML3);
    const responseXML2 = await fetch("https://mbp-backend-test.herokuapp.com/xml2");
    const dataXML2 = await responseXML2.json();
    console.log("res xml2", dataXML2);
    const responseXML1 = await fetch("https://mbp-backend-test.herokuapp.com/xml1");
    const dataXML1 = await responseXML1.json();
    console.log("res xml1", dataXML1); */
  };

  return (
    <div className="todays-rates-container">
      <div className="todays-rates-title">
        <h1>Today’s rates</h1>
      </div>
      <div className="todays-rates-content">
        <div className="todays-rates-content-column">
          <div className="todays-rates-small-box">
            <h4>prime rate</h4>
            <p>3.250%</p>
          </div>
          <div className="todays-rates-small-box">
            <h4>5 yr TR</h4>
            <p>0.864%</p>
          </div>
          <div className="todays-rates-small-box last-small-box">
            <h4>10 yr TR</h4>
            <p>1.478%</p>
          </div>
        </div>
        <div className="todays-rates-content-column">
          <div className="todays-rates-small-box">
            <h4>1 mo. LIBoR</h4>
            <p>0.09588%</p>
          </div>
          <div className="todays-rates-small-box">
            <h4>5 YR SWAP</h4>
            <p>0.921%</p>
          </div>
          <div className="todays-rates-small-box last-small-box">
            <h4>10 YR SWAP</h4>
            <p>1.433%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodaysRates;
