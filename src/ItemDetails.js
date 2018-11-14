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
            item: {}
        }
        // this.handleClick = this.handleClick.bind(this)
        this.backToHome = this.backToHome.bind(this)
        // this.handleBidChange = this.handleBidChange.bind(this)
        this.updateBidAmount = this.updateBidAmount.bind(this)
    }
    componentDidMount() {
        let callBack = function (response) {
            let parsed = JSON.parse(response)
            this.setState({
                item: parsed
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

    updateBidAmount(event){
        event.preventDefault()
        let callBack = function(response){
            let parsed = JSON.parse(response)
            if(parsed.status){
                this.setState({item:parsed.item})
            }else{
                alert("The amount entered is lower than minimum bid")
            }
        }
        callBack = callBack.bind(this)
        let bidInput = this.refs.bid.value
        fetch('/newBid', {
            method: 'POST',
            body: JSON.stringify({
                itemID: this.props.itemID,
                newBid: bidInput
            })
            }).then(function(res){
                return res.text()
            }).then(callBack)
    
    }
    // handleBidChange(event) {
    //     event.preventDefault()
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
    //     } 
        // else {
        //     alert('Please login to bid on this item.')
        // }
    // }

    backToHome() {
        this.props.history.push('/')
    }

    render() {
        return (<div>


            <button className="back-to-home" onClick={this.backToHome}>Back to Shopping</button>
            <img className="item-image" src={'/' + this.state.item.filename}></img>
            <div className="item-list"> Title:&nbsp;{this.state.item.itemName}</div>
            <div className="item-list">Description:&nbsp;{this.state.item.itemDescription}</div>
            <form className="bid-system">
                <div className="item-list">Minimum Bid:&nbsp;${this.state.item.minBid}</div>
                <input type="text"  ref="bid"></input>
                <div className="item-list"> Current Highest Bid:&nbsp;${this.state.item.currentBid}</div>
                {/* <input className="add-to-btn" type="submit" onClick={this.handleBidChange} /> */}
                <input type="submit" onClick={this.updateBidAmount}></input>
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