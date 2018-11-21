import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './Signup.css';
import Modal from './Modal.js'

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
            errorPopup: {
                error: false,
                msg: ''
            }
        }
        this.uploadFile = this.uploadFile.bind(this)
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.handleLastNameChange = this.handleLastNameChange.bind(this)
        this.handleBioChange = this.handleBioChange.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderHome = this.renderHome.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)

    }
    componentDidMount() {

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
    handleAddressChange(event){
        this.setState({
            addressInput: event.target.value
        })
    }

    // handleLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(function (position) {
        
    //             console.log(position)
    //         })

    //     }
    // }
    handleSubmit(event) {
        event.preventDefault()
        let body = JSON.stringify(
            this.state)
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
                this.setState({errorPopup: {error: true, msg:'Signup successful, Welcome ' + this.state.usernameInput}})
            } else {
                this.setState({errorPopup: {error: true, msg:'Failed signup. Please try again.'}})
            }
        }
        cb = cb.bind(this)
        fetch('/signup', {
            method: 'POST',
            body: body // body is defined above
        }).then(function (res) {
            return res.text()
        }).then(cb)
    }
    renderHome() {
        this.props.history.push('/')
    }

    render() {
        if (this.state.errorPopup.error) {
            return (<Modal errorMSG={this.state.errorPopup.msg}/>)
        }
        return (
            <div className="signup-main">
              <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
              <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet"></link>

             
                  <form className="form-style" onSubmit={this.handleSubmit}>
                  <div className="add-text">CREATE AN ACCOUNT</div>
                    <div className="add-details">
                        <div className="add-image">
                        <img className="add-image" src={`/${this.state.filename}`}></img>
                        </div>
                        <div className="upload-img"> Upload an Image of yourself!</div>
                        <div className="file-input">
                        <input type="file" onChange={e => this.uploadFile(e.target.files[0])} />
                    
                        </div>
                   
                        <input className="input-field" type="text" onChange={this.handleFirstNameChange} placeholder="First Name"  placeholder="First Name" />
                        <input className="input-field" onChange={this.handleLastNameChange} type="text" placeholder="Last Name" />
                        <input className="input-field" type="email" placeholder="Email"  placeholder="Email" />
                        <input className="input-field" onChange={this.handleAddressChange} type="address" placeholder="Address"  placeholder="Address" />
                        <input className="input-field2" onChange={this.handleUsernameChange} type="text" placeholder="Username"  placeholder="Username" />
                        <input className="input-field" onChange={this.handlePasswordChange}type="password" placeholder="Passowrd"  placeholder="Password" />

                        <textarea className="input-field" rows="4" cols="20" type="textarea" onChange={this.handleBioChange} placeholder="Tell us a bit about yourself.."></textarea>
                
              
                        <div><input className="signup-btn" type='submit' value="Sign Up" /></div>
                    </div>
                      
                    </form>

           
                   
                    
            </div>
        )
    }
}
let connectedLogin = connect()(withRouter(Login))
export default connectedLogin