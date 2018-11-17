import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import React, { Component } from "react";
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'



class Chart extends Component {
        render() {
          
const data = {
    labels: ['SPCA Montreal', 'MSF Canada', 'All Out', 'CAMH',],
    datasets: [
      {
        label: '',
        backgroundColor: 'rgba(25, 46, 80, 0.952)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81]
      }
    ]
  };
              
         return (<div>
            
        <h5 className="chart-title">Amount Raised Per Charity</h5>
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