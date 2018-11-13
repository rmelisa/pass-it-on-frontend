//To add: likes, bid system, comments
//Need to display the current bid
//we need an onSubmit button with a method checking if the entered bid is higher than minimum or not.
import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
// import Member from './Member.js'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'

class ItemDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentBid: null,
            newBid: null,
            item: {}
        }
        // this.handleClick = this.handleClick.bind(this)
        this.backToHome = this.backToHome.bind(this)
        this.handleBidChange = this.handleBidChange.bind(this)
    }
    componentDidMount() {
        let callBack = function (response) {
            let parsed = JSON.parse(response)
            this.setState({
                item: parsed.result
            })
        }
        callBack = callBack.bind(this)
        fetch('http://demo5206055.mockable.io/itemDetails', {
            method: 'POST',
            body: JSON.stringify({
                itemID: this.props.itemID
            })
        }).then(function (x) {
            return x.text()
        }).then(callBack)
    }

    // getSellerDetail() {
    //     let callBack = function (response) {
    //         let parsed = JSON.parse(response)
    //         this.props.dispatch({
    //             type: "setSessionId",
    //             id: parsed.id
    //         })
    //     }
    //     callBack = callBack.bind(this)
    //     fetch('/memberDetail', {
    //         method: 'GET',

    //     }).then(function (x) {
    //         return x.text()
    //     }).then(callBack)
    // }

    // handleClick(event) {
    //     event.preventDefault();
    //     if (this.props.sessionID) {
    //         this.props.dispatch({
    //             type: "allBids",
    //             itemID: this.props.itemID,
    //             name: this.state.item.itemName,
    //             description: this.state.item.description,
    //             price: this.state.item.newBid,
    //             image: this.state.item.filename
    //         })
    //         this.props.history.push('/bids/')
    //     } else {
    //         alert('Please login to add an item to the shopping cart.')
    //     }
    // }

  
    handleBidChange(event){
        let bidInput = event.target.value
        
        this.setState({newBid: bidInput})
    }

    backToHome() {
        this.props.history.push('/')
    }

    render() {
        return ( <div>
                
             
                         <button className="back-to-home" onClick={this.backToHome}>Back to Shopping</button>
                        <img className="item-image" src={'/' + this.props.item.filename}></img>
                        <div className="item-list"> Title:&nbsp;{this.props.item.itemName}</div>
                        <div className="item-list">Description:&nbsp;{this.props.item.description}</div>
                        
                        <form className="bid-system">
                        <div className="item-list">Min Bid:&nbsp;${this.props.item.minBid}</div>
                        <input type="text" onChange={this.handleBidChange}></input>
                        <div className="item-list"> Current Bid:&nbsp;${this.state.newBid}</div>
                        <input className="add-to-btn" type="submit" onClick={this.handleBidChange}/>
                        </form>
                        
                
            </div>)
    }
}
let connectedItemDetails = connect(function (store) {
    return {
        sessionID: store.session,
        item: store.item
    }
})(withRouter(ItemDetails))
export default connectedItemDetails