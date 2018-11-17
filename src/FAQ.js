import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import './FAQ.css'


class FAQ extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.getTotal = this.getTotal.bind(this)

    }

    getTotal() {
        let total = 0
        this.props.items.forEach(function (item) {
            let price = parseInt(item.newBid)
            total += price
        });
        return `${total} $`
    }




    render() {
        return (<div>
            <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
            <div className='home-container'>

                <div class="hero-image">
                    <div class="hero-text">
                    <div className="title1">PASS</div>
                    <div className="title2">IT ON</div>
                        <p>Taking unwanted items and turning them into monatary donations to those in need</p>
                        <h2>-HOW IT WORKS-</h2>



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
            </div>


            <div className="faq">
                <div className="seller">
                    <h2 className="step-title">Do you want to sell your item and have the proceeds go to a charity of your choice?</h2>
                    <span className="steps">1</span>
                    <p className="step-desc">Create an Account and let us know a little about you</p>
                    <span className="steps">2</span>
                    <p className="step-desc">Add an item to sell and tell us why you are selling the item, your choice of charity, and set the minimum bid amount</p>
                    <span className="steps">3</span>
                    <p className="step-desc">Let the Bidding begin! Your item will be available to bid on for a period of 5 days</p>
                    <span className="steps">4</span>
                    <p className="step-desc">Once the bidding has ended, you will be sent the approriate packaging and shipping label.</p>
                </div>

                <div className="buyer">
                    <h2 className="step-title">Do you want to Bid on an item and if won, have your funds donated to a charity in need?</h2>
                    <span className="steps">1</span>
                    <p className="step-desc">Create an Account and let us know a little about you</p>
                    <span className="steps">2</span>
                    <p className="step-desc">Start bidding on an item you would like to purchase!</p>
                    <span className="steps">3</span>
                    <p className="step-desc">You can view the status of your bid through "My Bids"</p>
                    <span className="steps">4</span>
                    <p className="step-desc">If you have won the bid a payment is required. Once complete the process of shipment of the item commences</p>
                </div>
            </div>

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