import React, { Component } from 'react';
import './ItemDetails.css';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'


class ItemDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentBid: null,
            commentInput: '',
            timeLeft: ''
        }
        this.backToHome = this.backToHome.bind(this)
        this.updateBidAmount = this.updateBidAmount.bind(this)
        this.renderComments = this.renderComments.bind(this)
        this.handleCommentInput = this.handleCommentInput.bind(this)
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
        this.getItemDetails = this.getItemDetails.bind(this)
    }
    componentDidMount() {
        this.getItemDetails()
        setInterval(function () {
            let currentTime = Date.now()
            let distance = this.state.item.timerEnd - currentTime
            if (distance < 0) {
                this.setState({ timeLeft: "0s, bidding is closed and won by " + this.state.item.currentBidUser })
                return
            }
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this.setState({ timeLeft: `${days}d  ${hours}h ${minutes}m ${seconds}` })
        }.bind(this), 1000)
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

    updateBidAmount(event) {
        event.preventDefault()
        let currentTime = Date.now()
        if (this.state.item.timerEnd < currentTime) {
            alert('Bidding is closed for this item.')
            this.refs.bid.value = ''
            return
        }
        let callBack = function (response) {
            let parsed = JSON.parse(response)
            if (parsed.status === 'success') {
                this.setState({ item: parsed.item })
            } else if (parsed.status === 'lowBid') {
                alert("Bid failed. The amount entered is lower than minimum bid or the current bid")
            } else if (parsed.status === 'notLogged') {
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
        }).then(function (res) {
            return res.text()
        }).then(callBack)
        this.refs.bid.value = ''

    }

    backToHome() {
        this.props.history.push('/')
    }

    renderComments(comment) {
        return (<p className="single-comment">{comment}</p>)
    }

    handleCommentInput(event) {
        this.setState({ commentInput: event.target.value })
    }

    handleCommentSubmit(event) {
        event.preventDefault()
        let callBack = function (res) {
            let parsed = JSON.parse(res)
            if (parsed.status) {
                this.getItemDetails()
            }
        }
        callBack = callBack.bind(this)
        fetch('/addComment', {
            method: 'POST',
            body: JSON.stringify({
                itemID: this.state.item.itemID,
                commentInput: this.state.commentInput
            })
        }).then(function (res) {
            return res.text()
        }).then(callBack)
        this.setState({ commentInput: '' })
    }

    render() {

        if (!this.state.item) {
            return 'loading'
        }
        return (
            <div className='home-container'>

                <div class="hero-image">
                    <div class="hero-text">
                        <div className="title1">PASS</div>
                        <div className="title2">IT ON</div>
                        <p>Taking unwanted items and turning them into monatary donations to those in need</p>

                    </div>
                <ul className="tabs-container">
                    <li><Link to={"/itemsList/"}>Items for Sale</Link></li>
                    <li><Link to={"/FAQ/"}>How it Works</Link></li>
                    <li><Link to={"/members/"}>Other Members</Link></li>
                    <li><Link to={"/Charities/"}>Charities</Link></li>
                    <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                    <li><Link to={"/addItem/"}>Add Item</Link></li>
                </ul>
                </div>

            <form className="bid-system">
                        <div className="time-left">Time Remaining:&nbsp;{this.state.timeLeft}</div>
                            <div className="item-list">Minimum Bid:&nbsp;${this.state.item.minBid}</div>
                            <div className="item-list"> Current Highest Bid:&nbsp;${this.state.item.currentBid}</div>
                            <div>Last bid placed by:&nbsp;{this.state.item.currentBidUser}</div>
                       
                  
                            <input className="bid-input" type="text" ref="bid" placeholder="$" ></input>
                            <input className="bid-input" type="submit" value="Place Bid"onClick={this.updateBidAmount}></input>
                        </form>
                <div className="detail-container">
                    <div className="details-section">
                        <img className="det-img" src={'/' + this.state.item.imageName}></img>
                        <div className="item-list"> Title:&nbsp;{this.state.item.itemName}</div>
                        <em className="item-list">"{this.state.item.itemDescription}"</em>
                        <div className='item-list'>Posted By:&nbsp;{this.state.item.username}</div>
                        <div className='item-list'>Funds will go to:&nbsp;{this.state.item.charity}</div>
                        
                        
                    </div>






                    <div className='comments'>Comments:
            <div>{this.state.item.comments.map(this.renderComments)}</div>
                        <form onSubmit={this.handleCommentSubmit}>
                            <div className='item-list'>Add a comment:</div>
                            <textarea rows="5" cols="60" className="comment-box" type="text" onChange={this.handleCommentInput} value={this.state.commentInput}></textarea>
                            <input type='submit' />
                        </form>
                    </div>

                </div>



                <footer className="banner">
                    <div className="media-div">
                        <img className="media-img" src={'/facebook.png'} />
                        <img className="media-img" src={'/instagram.png'} />
                        <img className="media-img" src={'/twitter.png'} />
                    </div>
                </footer>

            </div>)
    }
}
let connectedHome = connect(function (store) {
    return {
        sessionID: store.session,
        username: store.username
    }
})(withRouter(ItemDetails))
export default connectedHome