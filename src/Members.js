import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Home from './Home.js'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import "./Members.css"

class Members extends Component {
    constructor(props) {
        super(props)
        this.state = {
            membersList: [],
            listShown: []
        }
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
        this.getAllMembers = this.getAllMembers.bind(this)
        this.renderAllMemebers = this.renderAllMemebers.bind(this)
        this.renderHome = this.renderHome.bind(this)
    }
    componentDidMount() {
        this.getAllMembers()
    }

    handleSearchChange(event) {
        event.preventDefault()
        let searchInput = event.target.value
        let filteredUsers = this.state.membersList.filter(function (user) {
            return user.username.includes(searchInput)
        })
        this.setState({ listShown: filteredUsers })
        return filteredUsers
    }

    handleSearchSubmit(event) {
        event.preventDefault()
    }

    getAllMembers() {
        fetch("/getMembers")
            .then(function (x) {
                return x.text()
            })
            .then(function (response) {
                let parsed = JSON.parse(response)
                console.log(parsed)
                this.setState({ membersList: parsed, listShown: parsed })
            }.bind(this))
    }

    renderAllMemebers(user) {
        return (<div className='members'>
            <div>
                <div className="member-container">
                    <img className="user-img" src={'/' + user.imageName}></img>
                    <div className="desc-1">Username:{user.username}</div>
                    <div className="desc-2">First Name: {user.firstName}</div>
                    <div className="desc-3">Last Name: {user.lastName}</div>
                    <div className="desc-3">Bio: {user.bio}</div>
                </div>
            </div>
        </div>)
    }
    renderHome() {
        this.props.history.push('/')
    }
    render() {
        return (<div>
            <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
            <div className='home-container'>

                <div class="hero-image">
                    <div class="hero-text">
                    <div className="title1">PASS</div>
                    <div className="title2">IT ON</div>
                        <p>Taking unwanted items and turning them into monatary donations to those in need</p>
                        <h2>-MEMBERS-</h2>
                    </div>

                    <ul className="tabs-container">
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/itemsList/"}>Items for Sale</Link></li>
                        <li><Link to={"/FAQ/"}>How it Works</Link></li>
                        <li><Link to={"/Charities/"}>Charities</Link></li>
                        <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                        <li><Link to={"/map/"}>Map</Link></li>
                    </ul>
                </div>

            </div>
            <form onSubmit={this.handleSearchSubmit}>
                
                    <input className="search-member" type="search" placeholder="Find a Member!" onChange={this.handleSearchChange}></input>
                 
        
            </form>
            <div className="members">{this.state.listShown.map(this.renderAllMemebers)}</div>
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
let connectedMembers = connect(function (store) {
    return {
        sessionID: store.session
    }
})(withRouter(Members))
export default connectedMembers