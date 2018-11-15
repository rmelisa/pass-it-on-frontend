import React, { Component } from "react";
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';



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
        return (    <div>
            <Card>
              <CardImg top width="100%" src={'/' + item.imageName} alt="Image" />
              <CardBody>
                <CardTitle><Link to={"/itemDetails/" + item.itemID}>{item.itemName}</Link> </CardTitle>
                <CardSubtitle>
                <p>Min Bid: {item.minBid}$</p>
                <p>Posted By: {item.username}</p>
                </CardSubtitle>
                <CardText><div>Current Bid: {item.currentBid}$</div></CardText>
              </CardBody>
            </Card>
          </div>)

     
    }


    renderHome() {
        this.props.history.push('/')
    }

    render() {

        return (
            <div>
                <input type="submit" value="Back to homepage" onClick={this.renderHome}></input>
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