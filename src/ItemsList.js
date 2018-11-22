import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import './ItemsList.css';

class ItemsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsDisplayed: [],
            charity: 'all'
        }
        this.getItems = this.getItems.bind(this)
        this.renderItems = this.renderItems.bind(this)
        this.renderHome = this.renderHome.bind(this)
        this.handleCategory = this.handleCategory.bind(this)
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
                if (this.state.charity === 'all') {
                    this.setState({ itemsDisplayed: parsed })
                    return
                }
                let itemsArr = parsed.filter(function (item) {
                    return item.charity === this.state.charity
                }.bind(this))
                this.setState({ itemsDisplayed: itemsArr })

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
                    <p className="hover-desc">"{item.itemDescription}"</p>

                </div>
            </div>
        </div>)

    }


    renderHome() {
        this.props.history.push('/')
    }

    handleCategory(event) {
        let charity = event.target.value
        this.setState({
            charity: charity
        })
        this.getItems()
    }


    render() {

        return (
            <div className='home-container'>
                <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
                <div class="sale-item-image">
                    <div class="sale-items-text">
                        <div className="title1">PASS</div>
                        <div className="title2">IT ON</div>
                        <p className="title-description">Taking unwanted items and turning them into monatary donations to those in need</p>
                     
                         
                    </div>

                    {/* {this.getTopItems()} */}
                    <ul className="tabs-container">
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/itemsList/"} className="active">Items for Sale</Link></li>
                        <li><Link to={"/members/"}>Other Members</Link></li>
                        <li><Link to={"/Charities/"}>Charities</Link></li>
                        <li><Link to={"/addItem/"}>Add Item</Link></li>
                        <li><Link to={"/FAQ/"}>How it Works</Link></li>
                        <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                    </ul>
                </div>
                <div className="items-title">ITEMS FOR SALE</div>
                <select className="category-select" onChange={this.handleCategory}>
                                <option value="all">All Items</option>
                                <option value="SPCA Montreal">SPCA Montreal</option>
                                <option value="All Out">All Out</option>
                                <option value="MSF - Doctors Without Borders">MSF - Doctors Without Borders</option>
                                <option value="CAMH - Center for Addiction and Mental Health">CAMH - Center for Addiction and Mental Health</option>
                            </select>
                <div className="all-items">{this.state.itemsDisplayed.map(this.renderItems)}</div>
                <footer className="banner">
                    <div className="media-div">
                    <img className="media-img" src={'/facebook-xxl.png'} />
                        <img className="media-img" src={'/instagram-xxl.png'} />
                        <img className="media-img" src={'/twitter-xxl.png'} />
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