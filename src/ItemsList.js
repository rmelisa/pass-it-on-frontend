import React, { Component } from "react";
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class ItemsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: 'all', 
            itemsDisplayed: []
        }
        this.getItems = this.getItems.bind(this)
        this.renderItems = this.renderItems.bind(this)
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
   
    render() {
        return (
            <div>
                <div className='List-container'>
                    <img className="title" src="/shabby.png"></img>
                   
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