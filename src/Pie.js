import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import React, { Component } from "react";
import { Route, BrowserRouter, Link } from 'react-router-dom'
import {Pie} from 'react-chartjs-2';

class Pie extends Component {
    render() {
const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};


return (<div>
    <div>
    <h2>Pie Example</h2>
        <Pie data={data} />
      }}

  </div>
  </div>
      );
    }
  }
export default Pie