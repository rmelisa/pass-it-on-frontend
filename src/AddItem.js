import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'

class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filename: 'placeholder.png',
            itemName: '',
            minBid: 0,
            description: '',
            charityChoice: 'charity1',   
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCategory = this.handleCategory.bind(this)
        this.backToHome = this.backToHome.bind(this)
    }
    componentDidMount(){
        if (!this.props.sessionID) {
            alert('You need to be logged in to add an item')
            this.props.history.push('/')
        }
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

    handleNameChange(event) {
        let name = event.target.value
        this.setState({
            itemName: name
        })
    }

    handleDescriptionChange(event) {
        let description = event.target.value
        this.setState({
            description: description
        })
    }

    handlePriceChange(event) {
        let price = event.target.value
        this.setState({
            minBid: price
        })
    }

    handleCategory(event) {
        let charity = event.target.value
        this.setState({
           charityChoice: charity
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch('/addItem', {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify(this.state)
        }).then(function (res) {
            return res.text()
        }).then(function (res) {
            let parsed = JSON.parse(res)//check what is being sent back
            if (parsed.status) {
                alert('item added succesfully')
                this.props.history.push('/')
            } else {
                alert('item was not added succesfully, please login and try again')
            }
        }.bind(this))
    }

    backToHome() {
        this.props.history.push('/')
    }

    render() {
        return (
                <div className='home-container'>
                <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
                <div class="hero-image">
                    <div class="hero-text">
                        <h1 className="title1">PASS-IT-ON</h1>
                        <p>Taking unwanted items and turning them into monatary donations to those in need</p>
                        <h2>-ADD ITEM-</h2>
                    </div>
                </div>
                {/* {this.getTopItems()} */}
                <ul className="tabs-container">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/FAQ/"}>How it works</Link></li>
                    <li><Link to={"/members/"}>Other members</Link></li>
                    <li><Link to={"/Charities/"}>Charities</Link></li>
                    <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                    <li><Link to={"/map/"}>Map</Link></li>
                </ul>
            <div className="nav-add">

                <img className="title-add" src="/logo.png"></img>
            </div>
            <button className="keep-shopping" onClick={this.backToHome}>Continue Shopping</button>
            <form className="form-style" onSubmit={this.handleSubmit}>
                <div className="add-details">
                    <div className="add-image">
                        <img className="add-image" src={`/${this.state.filename}`}></img>
                    </div>
                    <div className="file-input">
                        <input id="hide" type="file" onChange={e => this.uploadFile(e.target.files[0])} />
                    </div>
                    <div><input className="input-field" type='text' onChange={this.handleNameChange} placeholder="Item Name" /></div>
                    <div><textarea className="input-field" rows="4" cols="20" type="text" onChange={this.handleDescriptionChange} placeholder="The story behind the item" ></textarea>
                        </div>
                    <div>Start the bid at:<input className="input-field" type='text' onChange={this.handlePriceChange} placeholder="" /></div>

                    <div>
                        <select className="category-select" onChange={this.handleCategory}>
                            <option value="charity1">SPCA Montreal</option>
                            <option value="charity2">Canadian Cancer Society</option>
                            <option value="charity3">MSF - Doctors Without Borders</option>
                            <option value="charity3">CAMH - Center for Addiction and Mental Health</option>
                        </select>
                    </div>
                    <div><input className="add-item-btn" type='submit' value="Add Item" /></div>
                </div>
            </form>
        </div>)
    }
}

let connectedAddItem = connect(function (store) {
    return {
        sessionID: store.session,
        username: store.username
    }
})(withRouter(AddItem))
export default connectedAddItem