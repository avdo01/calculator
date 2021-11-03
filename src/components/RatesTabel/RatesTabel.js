import React, { useEffect } from "react";
import "./RatesTabel.css";
import icon from "../photos/title-icon.png";

const RatesTabel = ({
  tableTitle,
  arrayOfRows,
  arrayOfValues,
  tableDate,
  tableText,
  className,
  bottomText,
}) => {
  useEffect(() => {
    console.log("bottom tekst", bottomText.length);
  });

  return (
    <div className={`table-container ${className}`}>
      <div className="table-header">
        <div className="table-title">
          <h1>{tableTitle}</h1>
          <div className="icon-class">
            <img src={icon} alt="icon" />
            <div className="grey-box">
              <p> {tableText}</p>
            </div>
          </div>
        </div>
        <div className="table-date">
          <h4>Updated</h4>
          <p>{tableDate}</p>
        </div>
      </div>
      <div className="table-body">
        <thead>
          <tr>
            <th></th>
            <th className="current">Current</th>
            <th className="other-dates">13 Aug 2021</th>
            <th className="other-dates">16 Jul 2021</th>
            <th className="other-dates">16 Jul 2021</th>
          </tr>
        </thead>
        <tbody>
          {arrayOfRows.map((row, i) => {
            return (
              <tr key={i}>
                {arrayOfValues.map((value, i) => (
                  <th key={i}>{`${value}%`}</th>
                ))}
              </tr>
            );
          })}
        </tbody>
      </div>
      {bottomText.length !== 0 ? (
        <div className="table-text">
          <p>{bottomText}</p>
        </div>
      ) : (
        <div className="non-table-text"> </div>
      )}
    </div>
  );
};

export default RatesTabel;
