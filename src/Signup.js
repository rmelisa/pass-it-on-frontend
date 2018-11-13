import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filename: "placeholder.png",
            firstNameInput: "",
            lastNameInput: "",
            email: "",
            address: "",
            bioInput: "",
            usernameInput: "",
            passwordInput: "",

        }
        this.uploadFile = this.uploadFile.bind(this)
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handleBioChange = this.handleBioChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    uploadFile(x) {
        var filename = x.name;
        var fileExtension = filename.split('.').pop();
        fetch('/pics?ext=' + fileExtension, { method: "POST", body: x })
            .then(function (res) {
                return res.text()
            }).then(function (res) {
                let parsed = res//check what is being sent back
                this.setState({ filename: parsed })
            }.bind(this))
    }

    handleFirstNameChange(event) {
        this.setState({
            firstNameInput: event.target.value
        })
    }
    handleLastNameChange(event) {
        this.setState({
            lastNameInput: event.target.value
        })
    }
    handleBioChange(event) {
        this.setState({
            bioInput: event.target.value
        })
    }
    handleUsernameChange(event) {
        this.setState({
            usernameInput: event.target.value
        })
    }
    handlePasswordChange(event) {
        this.setState({
            passwordInput: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        let body = JSON.stringify(
            this.state)
        // firstName: this.state.firstNameInput,
        // lastName: this.state.lastNameInput,
        // username: this.state.usernameInput,
        // password: this.state.passwordInput,
        // bio: this.state.bioInput
        let cb = function (resBody) {
            let parsed = JSON.parse(resBody)
            if (parsed.status) {
                this.props.dispatch({  // passing this action to the reducer by specifing the type of action
                    type: "setSession",
                    sessionID: parsed.sessionID
                })
                this.props.dispatch({  // passing this action to the reducer by specifing the type of action
                    type: "setUsername",
                    username: this.state.usernameInput
                })
                this.props.history.push('/')
            } else {
                alert('Failed login or signup, please try again')
            }
        }
        cb = cb.bind(this)
        fetch('http://demo5206055.mockable.io/signup', {
            method: 'POST',
            body: body // body is defined above
        }).then(function (res) {
            return res.text()
        }).then(cb)
    }

    render() {
        return (

            <div className="main">
                {/* <div className="add-image">
                    <img className="add-image" src={`/${this.state.filename}`}></img>
                </div> */}
                <form onSubmit={this.handleSubmit}>
                    First Name:
            <input type="text" onChange={this.handleFirstNameChange}></input>
                    Last Name:
            <input type="text" onChange={this.handleLastNameChange}></input>
                    Email:
            <input type="email"></input>
                    Address:
            <input type="text"></input>
                    Bio:
            <textarea rows="4" cols="20" type="text" onChange={this.handleBioChange}></textarea>
                    Profile picture:
            <input id="hide" type="file" onChange={e => this.uploadFile(e.target.files[0])} />

                    Username:
            <input type="text" onChange={this.handleUsernameChange}></input>
                    Password:
            <input type="password" onChange={this.handlePasswordChange}></input>
                    <input type="submit" value="ENTER"></input>
                </form>
            </div>)
    }
}
let connectedLogin = connect()(withRouter(Login))
export default connectedLogin