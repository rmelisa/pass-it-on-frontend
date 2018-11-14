import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Home from './Home.js'

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
        let filteredUsers = this.state.membersList.filter(function(user){
            return user.username.includes(searchInput)
        })
        this.setState({listShown: filteredUsers})
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
                <div className="image-container">
                    <img className="item-images" src={'/' + user.imageName}></img>
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
            <input type="submit" value="Back to homepage" onClick={this.renderHome}></input>
            <form onSubmit={this.handleSearchSubmit}>
                <input type="search" placeholder="Search here" onChange={this.handleSearchChange}></input>
                <input type="submit" ></input>
            </form>
            <div className="members">{this.state.listShown.map(this.renderAllMemebers)}</div>
        </div>)
    }

}
let connectedMembers = connect(function (store) {
    return {
        sessionID: store.session
    }
})(withRouter(Members))
export default connectedMembers