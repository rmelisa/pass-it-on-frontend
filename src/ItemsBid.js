import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import ItemsBidsRender from './ItemBidsRender.js'
import './ItemsBid.css'

class ItemsBid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bids: []
        }

        this.backToHome = this.backToHome.bind(this)
        this.renderBids = this.renderBids.bind(this)
    }

    componentDidMount() {
        if (!this.props.sessionID) {
            alert('You need to be logged in to see your current bids')
            this.props.history.push('/')
        }
        let callBack = function (res) {
            let parsed = JSON.parse(res)
            console.log(parsed)
            this.setState({ bids: parsed })
        }
        callBack = callBack.bind(this)

        fetch('/getBids', {
            method: 'GET',
            credentials: "same-origin"
        }).then(function (res) {
            return res.text()
        }).then(callBack)

    }


    backToHome() {
        this.props.history.push('/')
    }



    renderBids(curBid) {
        return (<ItemsBidsRender bid={curBid} />)
    }


    render() {

        return (<div>
            <div className='home-container'>
                <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
                <div class="hero-image">
                    <div class="hero-text">
                        <div className="title1">PASS</div>
                        <div className="title2">IT ON</div>
                        <p>Taking unwanted items and turning them into monatary donations to those in need</p>
                        <h2>-YOUR BIDS-</h2>
                    </div>

                    <ul className="tabs-container">
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/itemsList/"}>Items for Sale</Link></li>
                        <li><Link to={"/FAQ/"}>How it Works</Link></li>
                        <li><Link to={"/Members/"}>Members</Link></li>
                        <li><Link to={"/Charities/"}>Charities</Link></li>
                        <li><Link to={"/addItem/"}>Add Item</Link></li>
                    </ul>
                </div>
            </div>
            <p>Items You Have Bid On</p>
            <div>{this.state.bids.map(this.renderBids)}</div>
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

let connectedItemsBid = connect(function (store) {
    return {
        sessionID: store.session,
        username: store.username
    }
})(withRouter(ItemsBid))
export default connectedItemsBid