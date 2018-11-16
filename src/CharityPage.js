import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import './CharityPage.css';
import Chart from './Chart';




class CharityPage extends Component {
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
                    <h2>-CHARITIES-</h2> 
                </div>
            </div>
            <ul className="tabs-container">
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/itemsList/"}>Items for Sale</Link></li>
                <li><Link to={"/FAQ/"}>How it Works</Link></li>
                <li><Link to={"/Members/"}>Members</Link></li>
                <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                <li><Link to={"/map/"}>Map</Link></li>
            </ul>       
            </div>
            
            <Chart className="full-chart"></Chart>
          
           
            <div id="piechart"></div>
            <div className="charity-container">
            <img className="spca-img" src="/spca.png"></img>
            <div className="spca-div">
            <a href="https://www.spca.com/en/">Link to Website</a>
            <p>By donating to the Montreal SPCA, you can help alleviate the plight of animals and enable us to continue our mission.</p>
            <div>Amount Raised:</div>
            </div>
            
            <img className="msf-img" src="/msf.png"></img>
            <div className="msf-div">
            <a href="http://www.doctorswithoutborders.ca/">Link to Website</a>
            <p>Médecins Sans Frontières Canada (MSF) works in over 70 countries and has a mission to reduce suffering and provide medical care to people around the world regardless of race, religion or political affiliation.</p>
            <div>Amount Raised:</div>
            </div>
            </div>
            <div className="charity-container">
            <img className="ccs-img" src="/ccs.jpg"></img>
            <div className="ccs-div">
            <a href="http://www.cancer.ca/en/?region=qc">Link to Website</a>
            <p>The Canadian Cancer Society is a national, community-based charitable organization of volunteers whose mission is to eradicate cancer and enhance the quality of life of those who have the disease.</p>
            <div>Amount Raised:</div>
            </div>
        
            <img className="camh-img" src="/camh.jpg"></img>
            <div className="camh-div">
            <a href="http://www.camh.ca/">Link to Website</a>
            <p>The Centre for Addiction and Mental Health (CAMH) is Canada's largest mental health teaching hospital and one of the world's leading research centres in its field.</p>
            <div>Amount Raised:</div>
            </div>
            </div>
          
        </div>
        )
    }
}
const mapStateToProps = (store) => {
    return {
        sessionID: store.session,
        item: store.item
    }
}
let connectedMapStateToStore = connect(mapStateToProps)(withRouter(CharityPage))

export default connectedMapStateToStore;