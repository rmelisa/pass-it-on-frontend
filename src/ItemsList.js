import React, { Component } from "react";
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { withRouter } from 'react-router'


class ItemsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsDisplayed: []
        }
        this.getItems = this.getItems.bind(this)
        this.renderItems = this.renderItems.bind(this)
        // this.handleAddItem = this.handleAddItem.bind(this)
        // this.handleShoppingCart = this.handleShoppingCart.bind(this)
    }

    componentDidMount() {
        this.getItems()
    }

    getItems() {
        fetch("/itemsList") //confirm name
        .then(x=>x.text())
        .then(response =>{
            let parsed =JSON.parse(response)
            this.setState({itemsDisplayed:parsed})
        })
    }

    renderItems(item) {
        //check that the variable names match what gets returned from the fetch, example image, itemID, price, description
        return (<div className='items'>
                <div className="image-container">
                    <img className="item-images" src={item.imageName}></img>
                    <div><Link to={"/itemDetails/" + item.itemID}>{item.itemName}</Link> </div>
                    <div>Min Bid: {item.minBid}$</div>
                    <div>Current Bid: {item.currentBid}$</div>
                    <div>Description: {item.itemDescription}</div>
                    <div>Posted By: {item.username}</div>
                    <div>Charity: {item.charity}</div>
                </div>
        </div>)
    }

    // handleAddItem() {
    //     if (this.props.sessionID) {
    //         this.props.history.push('/addItem/')
    //     } else {
    //         alert('Sorry! You must be logged in to add an item')
    //     }
    // }

    // handleShoppingCart() {
    //     if (this.props.sessionID) {
    //         this.props.history.push('/cart/')
    //     } else {
    //         alert('You must be logged in to access shopping cart')
    //     }
    // }


  
    render() {

        return (
            <div>
          
                    <div>
                        <Link to={"/login/"}> Login </Link>
                        <Link to={"/signup/"}> Signup </Link>
                    </div>
               
                <div className="items">{this.state.itemsDisplayed.map(this.renderItems)}</div>
            </div>
            
        )
    }
}

let connectedItemsList = connect(function (store) {
    return {
        sessionID: store.session
    }
})(withRouter(ItemsList))
export default connectedItemsList