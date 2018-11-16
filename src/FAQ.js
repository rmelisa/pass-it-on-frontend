import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'


class FAQ extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.getTotal = this.getTotal.bind(this)
        this.backToHome = this.backToHome.bind(this)
     
    }

    getTotal() {
        let total = 0
        this.props.items.forEach(function (item) {
            let price = parseInt(item.newBid)
            total += price
        });
        return `${total} $`
    }

  
    backToHome() {
        this.props.history.push('/')
    }
  
    render() {
        return (<div>
         <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
            <div className='home-container'>
            
            <div class="hero-image">
                <div class="hero-text">
                    <h1 className="title1">PASS-IT-ON</h1>
                    <p>Taking unwanted items and turning them into monatary donations to those in need</p>
                    <h2>-HOW IT WORKS-</h2>
                </div>
            </div>
            <ul className="tabs-container">
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/itemsList/"}>Items for Sale</Link></li>
                <li><Link to={"/members/"}>Other Members</Link></li>
                <li><Link to={"/Charities/"}>Charities</Link></li>
                <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                <li><Link to={"/map/"}>Map</Link></li>
            </ul>       
        
            </div>

        
      
            <div>Step 1:</div>
            <div>Step 2:</div>
            <div>Step 3:</div>
            <div>Step 4:</div>
           
       
        </div>)
    }
}
const mapStateToProps = (store) => {
    return {
        sessionID: store.session,
        item: store.item
    }
}
let connectedMapStateToStore = connect(mapStateToProps)(withRouter(FAQ))
export default connectedMapStateToStore;