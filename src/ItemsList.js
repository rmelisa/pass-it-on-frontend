import React, { Component } from "react";
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class ItemsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: 'all', //need to agree on categories
            searchInput: '',
            itemsDisplayed: []
        }
        this.getItems = this.getItems.bind(this)
        this.renderItems = this.renderItems.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
        this.handleShoppingCart = this.handleShoppingCart.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    }

    componentDidMount() {
        this.getItems()
    }

    getItems() {
        fetch("/getAllItems") //confirm name
            .then(function (x) {
                return x.text()
            })
            .then(function (response) {
                let parsedResponse = JSON.parse(response);
                if (this.state.category === 'all') {
                    this.setState({ itemsDisplayed: parsedResponse.result })
                    return
                }
                let itemsArr = parsedResponse.result.filter(function (item) {
                    return item.category === this.state.category
                }.bind(this))
                this.setState({ itemsDisplayed: itemsArr })//need to return array of items from server
            }.bind(this))
            .catch(err => console.log(err));
    }
    
    renderItems(item) {
        //check that the variable names match what gets returned from the fetch, example image, itemID, price, description
        return (<div className='items'>
            <div>
                <div className="image-container">
                    <img className="item-images" src={item.image}></img>
                    <div className="desc-1"><Link to={"/details/" + item.itemID}>{item.name}</Link> </div>
                    <div className="desc-2">Price: {item.price}$</div>
                    <div className="desc-3">Description: {item.description}</div>
                </div>
            </div>
        </div>)
    }

    handleAddItem() {
        if (this.props.sessionID) {
            this.props.history.push('/addItem/')
        } else {
            alert('Sorry! You must be logged in to add an item')
        }

    }

    handleShoppingCart() {
        if (this.props.sessionID) {
            this.props.history.push('/cart/')
        } else {
            alert('You must be logged in to access shopping cart')
        }
    }

    handleSearchChange(event) {
        let search = event.target.value
        this.setState({ searchInput: search })
    }

    handleSearchSubmit(event) {
        event.preventDefault()
        fetch('/search', {
            method: 'POST',
            body: JSON.stringify({
                query: this.state.searchInput
            })
        }).then(function (x) {
            return x.text()
        }).then(function (res) {
            let parsed = JSON.parse(res)
            this.setState({ itemsDisplayed: parsed })
        }.bind(this))
        this.setState({ searchInput: '' })
    }

    render() {
        return (
            <div>
                <div className='home-container'>
                    <div className="login-signup" >
                        <Link className="login-signup" to={"/login/"}> Login </Link>
                        <Link className="login-signup" to={"/signup/"}> Signup </Link>
                    </div>
                    <img className="title" src="/shabby.png"></img>
                    <div className="btn">
                        <button className="add-item-btn" onClick={this.handleAddItem}>Add Item +</button>
                    </div>
                </div>

                <div className='main-container'>
                    <div className="dropdown">
                        <button className="dropbtn">Categories</button>
                            <div className="dropdown-content">
                                <div onClick={function () {
                                    this.setState({ category: 'all' })
                                    this.getItems()
                                }.bind(this)}>
                                    All items
                            </div>
                                <div onClick={function () {
                                    this.setState({ category: 'clothing' })
                                    this.getItems()
                                }.bind(this)}>
                                    Clothing
                            </div>
                                <div onClick={function () {
                                    this.setState({ category: 'home' })
                                    this.getItems()
                                }.bind(this)}>
                                    Equipment
                            </div>
                                <div onClick={function () {
                                    this.setState({ category: 'electronics' })
                                    this.getItems()
                                }.bind(this)}>
                                    Accessories
                            </div>

                            </div>
                            </div>

                    <form className="search" onSubmit={this.handleSearchSubmit}>
                        
                        <input className = "search-box" onChange={this.handleSearchChange} value={this.state.searchInput} type='search' placeholder="Search Description Keywords"/>
                        <img src="/magnify.png" className="magnify-img"></img>
                        <span class="magnify"></span>
                    </form>
                   
               
                
                <div><button className="cart-btn" onClick={this.handleShoppingCart}>Shopping Cart</button></div>
               
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