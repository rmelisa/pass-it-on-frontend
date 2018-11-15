import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'

class ItemDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentBid: null,
            commentInput: '',
        }
        // this.handleClick = this.handleClick.bind(this)
        this.backToHome = this.backToHome.bind(this)
        // this.handleBidChange = this.handleBidChange.bind(this)
        this.updateBidAmount = this.updateBidAmount.bind(this)
        this.renderComments = this.renderComments.bind(this)
        this.handleCommentInput = this.handleCommentInput.bind(this)
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
        this.getItemDetails = this.getItemDetails.bind(this)
    }
    componentDidMount() {
        this.getItemDetails()
    }

    getItemDetails() {
        let callBack = function (response) {
            let parsed = JSON.parse(response)
            this.setState({
                item: parsed
            })
        }
        callBack = callBack.bind(this)
        fetch('/itemDetails', {
            method: 'POST',
            body: JSON.stringify({
                itemID: this.props.itemID
            })
        }).then(function (x) {
            return x.text()
        }).then(callBack)
    }

    updateBidAmount(event){
        event.preventDefault()
        let callBack = function(response){
            let parsed = JSON.parse(response)
            if(parsed.status === 'success'){
                this.setState({item:parsed.item})
            }else if (parsed.status === 'lowBid') {
                alert("Bid failed. The amount entered is lower than minimum bid or the current bid")
            }else if (parsed.status === 'notLogged'){
                alert("Bid failed. You are not logged in")
            }
        }
        callBack = callBack.bind(this)
        let bidInput = this.refs.bid.value
        fetch('/newBid', {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify({
                itemID: this.props.itemID,
                newBid: bidInput
            })
            }).then(function(res){
                return res.text()
            }).then(callBack)
            this.refs.bid.value = ''
    
    }
    // handleBidChange(event) {
    //     event.preventDefault()
    //     if (this.props.sessionID) {
    //         this.props.dispatch({
    //             type: "allBids",
    //             itemID: this.props.itemID,
    //             name: this.state.item.itemName,
    //             description: this.state.item.description,
    //             price: this.state.item.newBid,
    //             image: this.state.item.filename
    //         })
    //         this.props.history.push('/bids/')
    //     } 
        // else {
        //     alert('Please login to bid on this item.')
        // }
    // }

    backToHome() {
        this.props.history.push('/')
    }

    renderComments(comment) {
        return (<p className="single-comment">{comment}</p>)
    }

    handleCommentInput(event){
        this.setState({commentInput: event.target.value})
    }

    handleCommentSubmit(event){
        event.preventDefault()
        let callBack = function(res){
            let parsed = JSON.parse(res)
            if (parsed.status) {
                this.getItemDetails()
            }
        }
        callBack = callBack.bind(this)
        fetch('/addComment',{
            method:'POST',
            body:JSON.stringify({
                itemID: this.state.item.itemID,
                commentInput: this.state.commentInput
            })
        }).then(function(res){
            return res.text()
        }).then(callBack)
        this.setState({commentInput: ''})
    }

    render() {
        if (!this.state.item) {
            return 'loading'
        }
        return (<div>


            <button className="back-to-home" onClick={this.backToHome}>Back to Shopping</button>
            <img className="item-image" src={'/' + this.state.item.imageName}></img>
            <div className="item-list"> Title:&nbsp;{this.state.item.itemName}</div>
            <div className="item-list">Description:&nbsp;{this.state.item.itemDescription}</div>
            <div className='item-list'>Posted by:&nbsp;{this.state.item.username}</div>
            <div className='item-list'>Charity:&nbsp;{this.state.item.charity}</div>
            <form className="bid-system">
                <div className="item-list">Minimum Bid:&nbsp;${this.state.item.minBid}</div>
                <div className="item-list"> Current Highest Bid:&nbsp;${this.state.item.currentBid}</div>
                <div>Last bid placed by:&nbsp;{this.state.item.currentBidUser}</div>
                Place a bid:&nbsp;
                <input type="text"  ref="bid"></input>
                {/* <input className="add-to-bt}n" type="submit" onClick={this.handleBidChange} /> */}
                <input type="submit" onClick={this.updateBidAmount}></input>
            </form>
            <div className='item-list'>Comments:</div>
            <div>{this.state.item.comments.map(this.renderComments)}</div>
            <form className='comments' onSubmit={this.handleCommentSubmit}>
                <div className='item-list'>Add a comment:</div>
                <textarea rows="10" cols="60" className="comment-box" type="text" onChange={this.handleCommentInput} value={this.state.commentInput}></textarea>
                <input type='submit'/>
            </form>

        </div>)
    }
}
let connectedItemDetails = connect(function (store) {
    return {
        sessionID: store.session,
        item: store.item
    }
})(withRouter(ItemDetails))
export default connectedItemDetails