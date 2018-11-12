import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

class Seller extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviewInput: "",
            reviews: []
        }
        this.handleReviewInput = this.handleReviewInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getAllReviews = this.getAllReviews.bind(this)
        this.renderReviews = this.renderReviews.bind(this)
        this.backToHome = this.backToHome.bind(this)
    }

    componentDidMount() {
        this.getAllReviews()
    }

    handleReviewInput(event) {
        this.setState({
            reviewInput: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let body = JSON.stringify({
            review: this.state.reviewInput,
            username: this.props.username
        })
        let callBack = function (response) {
            let parsed = JSON.parse(response)
            if (parsed.status) {
                this.getAllReviews()
            }
        }
        callBack = callBack.bind(this)
        fetch('/addReview', { //need an endpoint in server.js 
            method: 'POST',
            body: body // body is defined above
        }).then(function (res) {
            return res.text()
        }).then(callBack)

        this.setState({ reviewInput: '' })

    }
    getAllReviews() {
        let callBack = function (response) {
            let parsed = JSON.parse(response)
            this.setState({ reviews: parsed.result })
        }
        callBack = callBack.bind(this)
        fetch('/getAllReviews', {
            method: 'POST',
            body: JSON.stringify({
                username: this.props.username
            })
        }).then(function (x) {
            return x.text()
        }).then(callBack)
    }

    renderReviews(review) {
        return (
            <p className="single-review">{review}</p>
        )
    }
    backToHome() {
        this.props.history.push('/')
    }

    render() {
        return (<div className="sellerPage">
            <div>
                <div className="seller-details">
                    <img className="title-seller" src="/shabby.png"></img>
                </div>
                <div>
                    <button className="back-to-main" onClick={this.backToHome}>Back to Shopping</button>
                </div>
            </div>
            <div className="seller-reviews">
                <div className="seller-titles">Seller: &nbsp;&nbsp;
                {this.props.username}</div>
                <div>{this.state.reviews.map(this.renderReviews)}</div>
                <div className="seller-titles">Add a review for the Seller!</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="submit-area">
                        <textarea rows="10" cols="60" className="review-box" type="text" onChange={this.handleReviewInput}></textarea>
                        <input className="submit-review" type="submit" />
                    </div>
                </form>
            </div>
        </div>)
    }
}
let connectedSeller = connect()(withRouter(Seller))
export default connectedSeller
