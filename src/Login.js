import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './Login.css';
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
                // return(<div>Welcome,{this.state.usernameInput}</div>)
            } else {
                alert('Failed login , please try again')
            }
        }
        cb = cb.bind(this)
        fetch("/login", {
            method: 'POST',
            body: body // body is defined above
        }).then(function (res) {
            return res.text()
        }).then(cb)
    }

    render() {
        return (<div className="login-area">
        <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet"></link>
            <div className="titlea">PASS</div>
            <div className="titleb">IT ON</div>
            <form className="login-form" onSubmit={this.handleSubmit}>
         
                <div className="login-titles">Username</div>
                <input className="username" type="text" onChange={this.handleUsernameChange}></input>
                <div className="login-titles">Password</div>
                <input className="password" type="password" onChange={this.handlePasswordChange}></input>
                <input className="login-btn" type="submit" value="ENTER"></input>
                
            </form>
        </div>)
    }
}
let connectedLogin = connect()(withRouter(Login))
export default connectedLogin