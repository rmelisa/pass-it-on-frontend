import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usernameInput: "",
            passwordInput: ""
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        let body = JSON.stringify({
            username: this.state.usernameInput,
            password: this.state.passwordInput
        })
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
        fetch(this.props.endpoint, {
            method: 'POST',
            body: body // body is defined above
        }).then(function (res) {
            return res.text()
        }).then(cb)
    }

    render() {
        return (
        
            <div className="main">
            <img className="title-logo" src="/shabby.png"></img>
            <p className="title1">Enter To Begin Shopping!</p>
                <form className="signup" onSubmit={this.handleSubmit}>
                    Username:
            <input className="signup1" type="text" onChange={this.handleUsernameChange}></input>
                    Password:
            <input className="signup1" type="password" onChange={this.handlePasswordChange}></input>
                    <input className="signup-btn" type="submit" value="ENTER"></input>
                </form>
            </div>)
    }
}
let connectedLogin = connect()(withRouter(Login))
export default connectedLogin