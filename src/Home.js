import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
class Home extends Component {
    constructor() {
        super()
        this.state = {

        }
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleTopLeft = this.handleTopLeft.bind(this)
    }

    handleAddItem() {
        if (this.props.sessionID) {
            this.props.history.push('/addItem/')
        } else {
            alert('Sorry! You must be logged in to add an item')
        }
    }
    //In the BidItems component make a fetch request. look at AddItem for inspiration
    handleBidItems() {
        if (this.props.sessionID) {
            this.props.history.push('/ItemsBidOn/')
        } else {
            alert('You must be logged in to access this page')
        }
    }
    handleTopLeft() {
        if (this.props.sessionID) {
            return(<div> welcome, {this.props.username}</div>)
        }
        else {
           return(<div className="login-signup">
                <Link className="login-signup" to={"/login/"}> Login </Link>
                <Link className="login-signup" to={"/signup/"}> Signup </Link>
            </div>)
        }
    }

    render() {

        return (
            <div className='home-container'>
                {this.handleTopLeft()}
                <div className="tabs-container">
                    <div><Link to={"/ItemsList/"}>Items for sale</Link></div>
                    <div><Link to={"/itemDetails/"}/>itemDetails</div>
                    <div><Link to={"/FAQ/"}></Link>How it works</div>
                    <div><Link to={"/members/"}></Link>Other members</div>
                    <div><Link to={"/charity/"}></Link>Charity</div>
                    <div><Link to={"/ItemsBidOn/"}></Link>Items you bid on</div>
                </div>
                <div className="btn">
                    <button className="add-item-btn" onClick={this.handleAddItem}>Add Item +</button>
                </div>
            </div>)
    }
}
let connectedHome = connect(function (store) {
    return {
        sessionID: store.session,
        username: store.username
    }
})(withRouter(Home))
export default connectedHome