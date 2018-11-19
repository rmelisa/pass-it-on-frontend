import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import './ItemsList.css';

class ItemsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsDisplayed: []
        }
        this.getItems = this.getItems.bind(this)
        this.renderItems = this.renderItems.bind(this)
        this.renderHome = this.renderHome.bind(this)
        // this.handleAddItem = this.handleAddItem.bind(this)
        // this.handleShoppingCart = this.handleShoppingCart.bind(this)
    }

    componentDidMount() {
        this.getItems()
    }

    getItems() {
        fetch("/itemsList") //confirm name
            .then(x => x.text())
            .then(response => {
                let parsed = JSON.parse(response)
                this.setState({ itemsDisplayed: parsed })
            })
    }

    renderItems(item) {
        //check that the variable names match what gets returned from the fetch, example image, itemID, price, description
        return (<div className="item-card">
            <Link to={"/itemDetails/" + item.itemID}> <img className="item-image" top width="30%" src={'/' + item.imageName} alt="Image" /></Link>
            <div>
                <div ><Link to={"/itemDetails/" + item.itemID} className="name-link">{item.itemName}</Link> </div>
                <div className="item-list-desc">
                    <p >{item.charity}</p>
                    <p className="hover-desc">{item.itemDescription}</p>

                </div>
            </div>
        </div>)

    }


    renderHome() {
        this.props.history.push('/')
    }

    render() {

        return (
            <div className='home-container'>
                <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
                <div class="sale-item-image">
                    <div class="sale-items-text">
                        <div className="title1">PASS</div>
                        <div className="title2">IT ON</div>
                        <p>Taking unwanted items and turning them into monatary donations to those in need</p>
                        <h2>-ITEMS FOR SALE-</h2>
                         
                    </div>

                    {/* {this.getTopItems()} */}
                    <ul className="tabs-container">
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/FAQ/"}>How it works</Link></li>
                        <li><Link to={"/members/"}>Other members</Link></li>
                        <li><Link to={"/Charities/"}>Charities</Link></li>
                        <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                        <li><Link to={"/addItem/"}>Add Item</Link></li>
                    </ul>
                </div>
                <div className="all-items">{this.state.itemsDisplayed.map(this.renderItems)}</div>
                <footer className="banner">
                    <div className="media-div">
                        <img className="media-img" src={'/facebook.png'} />
                        <img className="media-img" src={'/instagram.png'} />
                        <img className="media-img" src={'/twitter.png'} />
                    </div>
                </footer>
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