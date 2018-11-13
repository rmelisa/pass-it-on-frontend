import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'
import { withRouter } from 'react-router'

class ShoppingCart extends Component {
    constructor() {
        super()

        this.getTotal = this.getTotal.bind(this)
        this.backToHome = this.backToHome.bind(this)
        this.getItems = this.getItems.bind(this)
    }

    getTotal() {
        let total = 0
        this.props.items.forEach(function (item) {
            let price = parseInt(item.newBid)
            total += price
        });
        return `${total} $`
    }

    getItems() {
        fetch("http://demo5206055.mockable.io/") 
            .then(function (x) {
                return x.text()
            })
            .then(function (response) {
                let parsedResponse = JSON.parse(response);
                let itemsArr = parsedResponse.result.filter(function (item) {
                    return item.username === this.state.username
                }.bind(this))
                this.setState({ itemsDisplayed: itemsArr })//need to return array of items from server
            }.bind(this))
            .catch(err => console.log(err));
    }
    backToHome() {
        this.props.history.push('/')
    }
    showItems(item) {
        return (<div>
            <img src={'/' + this.props.item.filename}></img>
            <div>
                <div>Name: {this.props.item.itemName}</div>
                <div>Description: {this.props.item.description}</div>
                <div>Current Highest Bid: {item.newBid}$</div>
            </div>
        </div>)
    }
    render() {
        return (<div>
           
            <p>Items You Have Bid On</p>
            <button onClick={this.backToHome}>Back to Home</button>
            <div>Days Left in Auction</div>
            <div>{this.props.items.map(this.showItems)}</div>
            <div>Total price:{this.getTotal(this.props.items)}</div>
            <Checkout/>
        </div>)
    }
}
const mapStateToProps = (state) => {
    return { items: state.cartItems }
}
let connectedMapStateToStore = connect(mapStateToProps)(withRouter(ShoppingCart))
export default connectedMapStateToStore;