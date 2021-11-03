import React, { useState, useEffect, useRef } from "react";
import logo from "../photos/forPrint.png";
import ReactToPrint from "react-to-print";
import "./Rates.css";
import RatesTabel from "../RatesTabel/RatesTabel";

const Rates = () => {
  const printRef = useRef();
  //const [ratesData, setRatesData] = useState(null);
  const [currentDate, setCurrentDate] = useState();

  useEffect(() => {
    getData();
  });
  const monthName = (monthNumber) => {
    if (monthNumber === 0) return "Jan";
    else if (monthNumber === 1) return "Feb";
    else if (monthNumber === 2) return "Mar";
    else if (monthNumber === 3) return "Apr";
    else if (monthNumber === 4) return "May";
    else if (monthNumber === 5) return "Jun";
    else if (monthNumber === 6) return "Jul";
    else if (monthNumber === 7) return "Aug";
    else if (monthNumber === 8) return "Sep";
    else if (monthNumber === 9) return "Oct";
    else if (monthNumber === 10) return "Nov";
    else if (monthNumber === 11) return "Dec";
  };
  const getData = async () => {
    const response = await fetch("https://mbp-backend-test.herokuapp.com/xml5");
    const data = await response.json();
    console.log("res", data);
    const response1 = await fetch(
      "https://mbp-backend-test.herokuapp.com/xml1"
    );
    const data1 = await response1.json();
    console.log("res", data1);
    //setRatesData(data);
    const dateArray =
      data.QR_GOING_RATES_EXTENDED.LIST_G_CROSS[0].G_CROSS[0]
        .LIST_G_QUOTE_DATE[0].G_QUOTE_DATE;
    const date = new Date(dateArray.pop().QUOTE_DATE[0]);
    const dateString = `${date.getDate()} ${monthName(
      date.getMonth()
    )}  ${date.getFullYear()}`;
    setCurrentDate(dateString);
  };
  return (
    <div className="rates-container" ref={printRef}>
      <RatesTabel
        tableTitle={"U.S. Treasuries"}
        className={"us-treasuries"}
        tableDate={currentDate}
        tableText={
          "U.S. Treasuries indicate yields for on-the-run U.S. Treasury bills, notes, and bonds, which are typically the most recently auctioned and most liquid issue with a maturity closest the stated tenor. These are commonly used for pricing fixed-rate debt at origination and for calculating yield maintenance."
        }
        arrayOfRows={[1, 2, 3, 4, 5, 6, 7]}
        arrayOfValues={[1.23, 2.32, 3.43, 4.23, 5.21]}
        bottomText={"On the run Treasuries, published on a 2 hour delay"}
      />
      <RatesTabel
        tableTitle={"Swaps – Semi-Bond"}
        className={"swaps-semi-bond"}
        tableDate={currentDate}
        tableText={
          "U.S. Treasuries indicate yields for on-the-run U.S. Treasury bills, notes, and bonds, which are typically the most recently auctioned and most liquid issue with a maturity closest the stated tenor. These are commonly used for pricing fixed-rate debt at origination and for calculating yield maintenance."
        }
        arrayOfRows={[1, 2, 3, 4, 5, 6, 7]}
        arrayOfValues={[1.23, 2.32, 3.43, 4.23, 5.21]}
        bottomText={""}
      />
      <RatesTabel
        tableTitle={"Swaps – Monthly Money"}
        className={"swaps-monthly-money"}
        tableDate={currentDate}
        tableText={
          "U.S. Treasuries indicate yields for on-the-run U.S. Treasury bills, notes, and bonds, which are typically the most recently auctioned and most liquid issue with a maturity closest the stated tenor. These are commonly used for pricing fixed-rate debt at origination and for calculating yield maintenance."
        }
        arrayOfRows={[1, 2, 3, 4, 5, 6, 7]}
        arrayOfValues={[1.23, 2.32, 3.43, 4.23, 5.21]}
        bottomText={""}
      />
      <RatesTabel
        tableTitle={"USD LIBOR"}
        className={"usd-libor"}
        tableDate={currentDate}
        tableText={
          "U.S. Treasuries indicate yields for on-the-run U.S. Treasury bills, notes, and bonds, which are typically the most recently auctioned and most liquid issue with a maturity closest the stated tenor. These are commonly used for pricing fixed-rate debt at origination and for calculating yield maintenance."
        }
        arrayOfRows={[1, 2, 3, 4]}
        arrayOfValues={[1.23, 2.32, 3.43, 4.23, 5.21]}
        bottomText={""}
      />
      <RatesTabel
        tableTitle={"Secured Overnight Financing Rate (SOFR)"}
        className={"sofr"}
        tableDate={currentDate}
        tableText={
          "U.S. Treasuries indicate yields for on-the-run U.S. Treasury bills, notes, and bonds, which are typically the most recently auctioned and most liquid issue with a maturity closest the stated tenor. These are commonly used for pricing fixed-rate debt at origination and for calculating yield maintenance."
        }
        arrayOfRows={[1, 2, 3]}
        arrayOfValues={[1.23, 2.32, 3.43, 4.23, 5.21]}
        bottomText={""}
      />
      <RatesTabel
        tableTitle={"Other U.S. Rates"}
        className={"other-us-rates"}
        tableDate={currentDate}
        tableText={
          "U.S. Treasuries indicate yields for on-the-run U.S. Treasury bills, notes, and bonds, which are typically the most recently auctioned and most liquid issue with a maturity closest the stated tenor. These are commonly used for pricing fixed-rate debt at origination and for calculating yield maintenance."
        }
        arrayOfRows={[1, 2]}
        arrayOfValues={[1.23, 2.32, 3.43, 4.23, 5.21]}
        bottomText={""}
      />
      <RatesTabel
        tableTitle={"SIFMA"}
        className={"sifma"}
        tableDate={currentDate}
        tableText={
          "U.S. Treasuries indicate yields for on-the-run U.S. Treasury bills, notes, and bonds, which are typically the most recently auctioned and most liquid issue with a maturity closest the stated tenor. These are commonly used for pricing fixed-rate debt at origination and for calculating yield maintenance."
        }
        arrayOfRows={[1]}
        arrayOfValues={[1.23, 2.32, 3.43, 4.23, 5.21]}
        bottomText={"On the run Treasuries, published on a 2 hour delay"}
      />

      <div className="print-container">
        <div className="print-text">
          <ReactToPrint
            trigger={() => {
              return <input type="button" value={"Print Rates"} />;
            }}
            content={() => printRef.current}
          />
        </div>
        <div className="print-icon">
          <ReactToPrint
            trigger={() => {
              return <input type="image" src={logo} alt="print-logo" />;
            }}
            content={() => printRef.current}
          />
        </div>
      </div>
    </div>
  );
};

export default Rates;
