import React from "react";
import './USTreasuries.css';
import icon from "../photos/title-icon.png";

const USTreasuries = () => {


    return (
        <div class="table-container us-treasuries">
          <div class="table-header">  
             <div class="table-title">
                 <h1>U.S. Treasuries</h1>
                <div class="icon-class"> 
                <img src={icon}/>
                 <div class="grey-box"> 
                    <p> U.S. Treasuries indicate yields for on-the-run U.S. 
                        Treasury bills, notes, and bonds, which are typically the most 
                        recently auctioned and most liquid issue with a maturity closest 
                        to the stated tenor. These are commonly used for pricing fixed-rate
                         debt at origination and for calculating yield maintenance.</p>
                 </div>
                 </div>
              </div>
             <div class="table-date"> 
                 <h4>Updated</h4>
                 <p>16 Aug 2021 09:15 ET</p>
             </div>
          </div>
          <div class="table-body"> 
          <thead>
              <tr>
                  <th></th>
                  <th class="current">Current</th>
                  <th class="other-dates">13 Aug 2021</th>
                  <th class="other-dates">16 Jul 2021</th>
                  <th class="other-dates">16 Jul 2021</th>
              </tr>   
          </thead>
          <tbody>
              <tr>
                  <th class="years">1 Year</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
              </tr>
              <tr>
                  <th class="years">2 Year</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
              </tr>
              <tr>
                  <th class="years">3 Year</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
              </tr>
              <tr>
                  <th class="years">5 Year</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
              </tr>
              <tr>
                  <th class="years">7 Year</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
              </tr>
              <tr>
                  <th class="years">10 Year</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
              </tr>
              <tr>
                  <th class="years">30 Year</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
                  <th class="values">0.071%</th>
              </tr>
          </tbody>
          </div>
          <div class="table-text">
              <p>On the run Treasuries, published on a 2 hour delay</p>
          </div>    
        </div>
    )
}

export default USTreasuries;