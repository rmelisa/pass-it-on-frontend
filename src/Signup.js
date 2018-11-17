import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './Signup.css';


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
                this.props.history.push('/')
            } else {
                alert('Failed login or signup, please try again')
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
        return (
            <div className="signup-main">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <img className="add-image" src={`/${this.state.filename}`}></img>
                        <input type="file" onChange={e => this.uploadFile(e.target.files[0])} />
                        <Label for="exampleFile"></Label>
                        <FormText color="muted">
                            Upload an Image of yourself!
                    </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleEmail"></Label>
                        <Input type="text" onChange={this.handleFirstNameChange} placeholder="First Name" />
                        <Label for="exampleEmail"></Label>
                        <Input type="text" onChange={this.handleLastNameChange} type="text" placeholder="Last Name" />
                    </FormGroup>

                    <Label></Label>
                    <Input type="email" placeholder="Email" />

                    <Label></Label>
                    <Input type="text" onChange={this.handleUsernameChange} placeholder="Username" />

                    <Label></Label>
                    <Input type="password" onChange={this.handlePasswordChange} placeholder="Password" />
                    <Label></Label>
                    <Input type="text" onChange={this.handleAddressChange} placeholder="Address" />
                    <FormGroup>
                        <Label for="exampleText"></Label>
                        <Input type="textarea" onChange={this.handleBioChange} placeholder="Tell us a bit about yourself.." />
                    </FormGroup>
                    <Button >Signup</Button>
                </Form>
            </div>
        )
    }
}
let connectedLogin = connect()(withRouter(Login))
export default connectedLogin