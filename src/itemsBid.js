import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'

class ItemsBid extends Component {
    constructor(props) {
        super(props)
        this.state={
            bids:[]
        }

        this.backToHome = this.backToHome.bind(this)
        this.renderBids = this.renderBids.bind(this)
    }

    componentDidMount(){
        if (!this.props.sessionID) {
            alert('You need to be logged in to see your current bids')
            this.props.history.push('/')
        }
        let callBack = function(res) {
            let parsed = JSON.parse(res)
            console.log(parsed)
            this.setState({bids:parsed})
        }
        callBack = callBack.bind(this)

        fetch('/getBids', {
            method: 'GET',
            credentials: "same-origin"
        }).then(function(res){
            return res.text()
        }).then(callBack)

    }

    
    backToHome() {
        this.props.history.push('/')
    }

    renderBids(bid) { 
        return (<div>
            <Link to={"/itemDetails/" + bid.itemID}>{bid.itemName}</Link>
            <div>Your bid:&nbsp;{bid.newBid}</div>
            <img src={'/' + bid.imageName}></img>
         </div>
        )
    }
 

    render() {
        
        return (<div>
            <p>Items You Have Bid On</p>
            <div>{this.state.bids.map(this.renderBids)}</div>
            <button onClick={this.backToHome}>Back to Shopping</button>
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