import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'
import { withRouter } from 'react-router'


class FAQ extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.getTotal = this.getTotal.bind(this)
        this.backToHome = this.backToHome.bind(this)
     
    }

    getTotal() {
        let total = 0
        this.props.items.forEach(function (item) {
            let price = parseInt(item.newBid)
            total += price
        });
        return `${total} $`
    }

  
    backToHome() {
        this.props.history.push('/')
    }
  
    render() {
        return (<div>
            <div className="charity-dashboard">How it Works</div>
            <button onClick={this.backToHome}>Back to Home</button>
            <div>Amount Raised Per Charity</div>
           
       
        </div>)
    }
}
const mapStateToProps = (store) => {
    return {
        sessionID: store.session,
        item: store.item
    }
}
let connectedMapStateToStore = connect(mapStateToProps)(withRouter(FAQ))
export default connectedMapStateToStore;