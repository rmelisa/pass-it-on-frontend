import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
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
            return (<div><div> Welcome, {this.props.username}</div>
               <button onClick={this.handleLogout}>Logout</button>
               </div> )

        }
        else {
            return (<div className="login-signup">
                <Link className="login-signup" to={"/login/"}> Login </Link>
                <Link className="login-signup" to={"/signup/"}> Signup </Link>
            </div>)
        }
    }

    handleLogout (event){
        this.props.dispatch({  
            type: "setSession",
            sessionID: null
        })
        this.props.dispatch({  
            type: "setUsername",
            username: ''
        })

        fetch('/logout',{
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
        return (<div>
            <Card>
              <CardImg top width="100%" src={'/' + item.imageName} alt="Image" />
              <CardBody>
                <CardTitle><Link to={"/itemDetails/" + item.itemID}>{item.itemName}</Link> </CardTitle>
                <CardSubtitle>
                <p>Min Bid: {item.minBid}$</p>
                <div>Description: {item.itemDescription}</div>
                <p>Posted By: {item.username}</p>
                </CardSubtitle>
                <CardText><div>Current Bid: {item.currentBid}$</div></CardText>
                <div>Charity: {item.charity}</div>
              </CardBody>
            </Card>
                {/* <img className="item-images" src={item.imageName}></img>
                <div><Link to={"/itemDetails/" + item.itemID}>{item.itemName}</Link> </div>
                <div>Min Bid: {item.minBid}$</div>
                <div>Current Bid: {item.currentBid}$</div>
                <div>Description: {item.itemDescription}</div>
                <div>Posted By: {item.username}</div>
                <div>Charity: {item.charity}</div> */}

        </div>)
    }
    render() {

        return (
            <div className='home-container'>
                {this.handleTopLeft()}
                {/* {this.getTopItems()} */}
                <div className="tabs-container">
                    <div><Link to={"/itemsList/"}>Items for sale</Link></div>
                    <div><Link to={"/FAQ/"}>How it works</Link></div>
                    <div><Link to={"/members/"}>Other members</Link></div>
                    <div><Link to={"/Charities/"}>Charities</Link></div>
                    <div><Link to={"/ItemsBid/"}>My Bids</Link></div>
                </div>

                <div className="btn">
                    <button className="add-item-btn" onClick={this.handleAddItem}>Add Item +</button>
                </div>
                <div className="items">{this.state.itemsDisplayed.map(this.renderItems)}</div>

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