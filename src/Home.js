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
            itemsDisplayed: [],
            charityTotals: {}
        }
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleTopLeft = this.handleTopLeft.bind(this)
        this.getTopItems = this.getTopItems.bind(this)
        this.renderItems = this.renderItems.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.renderCharityInfo = this.renderCharityInfo.bind(this)
    }
    componentDidMount() {
        this.getTopItems()
        fetch("/getAllCharities") //confirm name
            .then(x => x.text())
            .then(response => {
                let parsed = JSON.parse(response)
                this.setState({ charityTotals: parsed })
            })
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

            <div className="item-div-home">
                <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
                <Link to={"/itemDetails/" + item.itemID}><img className="item-image-home" src={item.imageName}></img></Link>
                <div className="desc-box">
                    <div><Link to={"/itemDetails/" + item.itemID} className="item-link">{item.itemName}</Link> </div>
                    <div className="desc-item">
                        <div>Min Bid: {item.minBid}$</div>
                        <div>Current Bid: {item.currentBid}$</div>
                        <em>"{item.itemDescription}"</em>
                        <div>Posted By: {item.username}</div>
                        <div>Charity: {item.charity}</div>


                    </div>
                </div >
            </div>

        )
    }

    renderCharityInfo() {
        let charities = Object.keys(this.state.charityTotals)
        return (
            <div>{charities.map(function (charity) {
                return (<div>Charity Name: {charity}
                    <br></br>
                    Amount raised: {this.state.charityTotals[charity]}
                </div>)
            }.bind(this))}
            </div>
        )
    }
    render() {

        return (

            <div className='home-container'>
                {this.handleTopLeft()}
                <div className="hero-image">
                    <div className="hero-text">
                        <div className="title1">PASS</div>
                        <div className="title2">IT ON</div>
                        <p>Taking unwanted items and turning them into monatary donations to those in need</p>

                    </div>

                    {/* {this.getTopItems()} */}
                    <ul className="tabs-container">
                        <li><Link to={"/itemsList/"}>Items for Sale</Link></li>
                        <li><Link to={"/FAQ/"}>How it Works</Link></li>
                        <li><Link to={"/members/"}>Other Members</Link></li>
                        <li><Link to={"/Charities/"}>Charities</Link></li>
                        <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                        <li><Link to={"/addItem/"}>Add Item</Link></li>
                    </ul>
                </div>


                <div className="dashboard-header">
                    <h3 className="charity-header">Charity<br></br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Dashboard</h3>

                    <h3 className="top-header">Top 5<br></br>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Items</h3>
                </div>
                <div className="home-items">
                    <div >{this.renderCharityInfo()} </div>
                    {this.state.itemsDisplayed.map(this.renderItems)}
                </div>





                <footer className="banner">
                    <div className="media-div">
                        <img className="media-img" src={'/facebook.png'} />
                        <img className="media-img" src={'/instagram.png'} />
                        <img className="media-img" src={'/twitter.png'} />
                    </div>
                  
                    </footer>
                        

            
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