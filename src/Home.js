import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './Home.css';

class Home extends Component {
    constructor() {
        super()
        this.state = {
            itemsDisplayed: []
        }
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleTopLeft = this.handleTopLeft.bind(this)
        this.getTopItems = this.getTopItems.bind(this)
        this.renderItems = this.renderItems.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }
    componentDidMount() {
        this.getTopItems()
    }

    handleAddItem() {
        this.props.history.push('/addItem/')

    }
    //In the BidItems component make a fetch request. look at AddItem for inspiration
    // handleBidItems() {
    //     if (this.props.sessionID) {
    //         this.props.history.push('/ItemsBidOn/')
    //     } else {
    //         alert('You must be logged in to access this page')
    //     }
    // }
    handleTopLeft() {
        if (this.props.sessionID) {
            return (<div className="logged-in"><div className="logged-in"> Welcome, {this.props.username}</div>
                <button className="logout" onClick={this.handleLogout}>Logout</button>
            </div>)

        }
        else {
            return (<div className="login-signup">
                <Link className="login-signup" to={"/login/"}> Login </Link>
                <Link className="login-signup" to={"/signup/"}> Signup </Link>
            </div>)
        }
    }

    handleLogout(event) {
        this.props.dispatch({
            type: "setSession",
            sessionID: null
        })
        this.props.dispatch({
            type: "setUsername",
            username: ''
        })

        fetch('/logout', {
            method: 'GET',
            credentials: "same-origin"
        })

    }

    getTopItems() {
        fetch("/home") //confirm name
            .then(function (x) {
                return x.text()
            })
            .then(function (response) {
                let parsed = JSON.parse(response)
                this.setState({ itemsDisplayed: parsed })
            }.bind(this))
    }
    renderItems(item) {
        //check that the variable names match what gets returned from the fetch, example image, itemID, price, description
        return (

            <div className="item-div">
                <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
                <img className="item-images" src={item.imageName}></img>
                <p>
                    <div><Link to={"/itemDetails/" + item.itemID}>{item.itemName}</Link> </div>

                    <div>Min Bid: {item.minBid}$</div>
                    <div>Current Bid: {item.currentBid}$</div>
                    <div>Description: {item.itemDescription}</div>
                    <div>Posted By: {item.username}</div>
                    <div>Charity: {item.charity}</div>
                    
                </p>
            </div>

        )
    }
    render() {

        return (
            <div className='home-container'>
                {this.handleTopLeft()}
                <div class="hero-image">
                    <div class="hero-text">
                        <h1 className="title1">PASS-IT-ON</h1>
                        <p>Taking unwanted items and turning them into monatary donations to those in need</p>
            
                    </div>
                </div>
                {/* {this.getTopItems()} */}
                <ul className="tabs-container">
                    <li><Link to={"/itemsList/"}>Items for Sale</Link></li>
                    <li><Link to={"/FAQ/"}>How it Works</Link></li>
                    <li><Link to={"/members/"}>Other Members</Link></li>
                    <li><Link to={"/Charities/"}>Charities</Link></li>
                    <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                    <li><Link to={"/map/"}>Map</Link></li>
                    <li><Link to={"/addItem/"}>Add Item</Link></li>
                </ul>



                <div className="btn">
                    <p className="top-5-title">Top 5 Items With the Highest Bid!</p>
                </div>
                <div className="items-home">
                    {this.state.itemsDisplayed.map(this.renderItems)}
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