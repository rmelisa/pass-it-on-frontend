import React, { Component } from "react";
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Checkout from './Checkout.js'

class ItemBidsRender extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timeLeft: ''
        }
    }


    componentDidMount() {

        setInterval(function () {
            let curBid = this.props.bid
            let currentTime = Date.now()
            let distance = curBid.timerEnd - currentTime
            if (distance < 0) {
                this.setState({ timeLeft: "0s" })
                return
            }
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this.setState({ timeLeft: `${days}d  ${hours}h ${minutes}m ${seconds}` })
        }.bind(this), 1000)


    }
    // getTotal() {
    //     let total = 0
    //     this.props.bid.forEach(function (item) {
    //         let price = parseInt(item.currentBid)
    //         total += price
    // 
    //     }.bind(this))
    // }

    render() {
        let curBid = this.props.bid
        let currentTime = Date.now()
        let status;
        if (curBid.timerEnd > currentTime) {
            status = 'Auction in progress'
        } else {
            status = 'Auction ended and won by ' + curBid.currentBidUser
        }

        return (<div className="bid-container">
            <div>
                <img className="bid-image" src={'/' + curBid.imageName}></img>
            </div>
            <div className="bid-desc">
                <Link to={"/itemDetails/" + curBid.itemID}>{curBid.itemName}</Link>
                <div>Your bid:&nbsp;{curBid.mybid.newBid}$</div>
                <div>Current bid at:&nbsp;{curBid.currentBid}$</div>
                <div>Time remaining on auction:&nbsp;{this.state.timeLeft}</div>
                <div>{status}</div>

            </div>
            <Checkout/>
        </div>
        )
    }

}

let connectedItemBidsRender = connect()(ItemBidsRender)
export default connectedItemBidsRender