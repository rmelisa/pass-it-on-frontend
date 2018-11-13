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
            currentBid: 0,
            newBid: 0,
            item: {}
        }
        this.handleClick = this.handleClick.bind(this)
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
        fetch('/itemDetails', {
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

    handleClick(event) {
        event.preventDefault();
        if (this.props.sessionID) {
            this.props.dispatch({
                type: "addToCart",
                itemID: this.props.itemID,
                name: this.state.item.name,
                description: this.state.item.description,
                price: this.state.item.price,
                image: this.state.item.image
            })
            this.props.history.push('/cart/')
        } else {
            alert('Please login to add an item to the shopping cart.')
        }
    }
    handleBidChange(event){
        let bidInput = event.target.value
        this.setState({newBid: bidInput})
    }

    backToHome() {
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <div className="itemDetails">
                    <img className="title-det-add" src="/shabby.png"></img>
                </div>
                <div>
                    <button className="back-to-home" onClick={this.backToHome}>Back to Shopping</button>
                </div>
                <div className="item-details">
                    <img className="item-image" src={'/' + this.state.item.image}></img>
                    <div className="item-det">
                        <div className="item-list"> Title:&nbsp;{this.state.item.name}</div>
                        <div className="item-list">Price:&nbsp;${this.state.item.price}</div>
                        <div className="item-list">Description:&nbsp;{this.state.item.description}</div>
                        {/* <div className="item-list">Seller:&nbsp;&nbsp;<Link to={"/seller/" + this.state.item.username}>{this.state.item.username}</Link> </div> */}
                        <form className="bid-system">
                        <input type="text" onChange={this.handleBidChange}></input></form>
                        <input className="add-to-btn" type="submit" value="Add to cart" onClick={this.handleClick} />
                    </div>
                </div>
            </div>)
    }
}
let connectedItemDetails = connect(function (store) {
    return {
        sessionID: store.session
    }
})(withRouter(ItemDetails))
export default connectedItemDetails