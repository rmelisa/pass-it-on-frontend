import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import React, { Component } from "react";
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import './CharityPage.css'




class Chart extends Component {
        render() {
          
const data = {
    labels: ['SPCA Montreal', 'MSF Canada', 'All Out', 'CAMH',],
    datasets: [
      {
        label: 'Amount Raised in Dollars',
        backgroundColor: 'rgba(25, 46, 80, 0.952)',
        borderColor: 'rgb(143, 17, 17)',
        borderWidth: 2,
        hoverBackgroundColor: 'rgb(143, 17, 17)',
        hoverBorderColor: 'rgb(143, 17, 17)',
        data: [650, 590, 800, 810]
      }
    ]
  };
              
         return (<div>
            
        <div className="chart-title">CHARITY INFO</div>
        <div className="full-chart">
        <Bar className="full-chart"
          data={data}
          width={100}
          height={300}
          options={{
            maintainAspectRatio: false
            
          }}
        />

      </div>
      </div>
          );
        }
      }
export default Chart