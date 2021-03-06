import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import './AddItem.css';
import Modal from './Modal.js'

class AddItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filename: 'placeholder.png',
            itemName: '',
            minBid: 0,
            description: '',
            charityChoice: 'SPCA Montreal',
            errorPopup: {
                error: false,
                msg: '',
            }
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.uploadFile = this.uploadFile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCategory = this.handleCategory.bind(this)
        this.backToHome = this.backToHome.bind(this)
    }
    componentDidMount() {


        if (!this.props.sessionID) {
            this.setState({errorPopup: {error: true, msg:'You need to be logged in to add an item'}})
        
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
                this.setState({errorPopup: {error: true, msg:'Item added successfully'}})
            } else {
                alert('item was not added succesfully, please login and try again')
            }
        }.bind(this))
    }

    backToHome() {
        this.props.history.push('/')
    }

    render() {
        if (this.state.errorPopup.error) {
            return (<Modal errorMSG={this.state.errorPopup.msg}/>)
        }
        return (
            <div className='add-container'>
                <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
                <ul className="tab-container">             
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/itemsList/"}>Items for Sale</Link></li>
                        <li><Link to={"/members/"}>Other Members</Link></li>
                        <li><Link to={"/Charities/"}>Charities</Link></li>
                        <li><Link to={"/addItem/"} className="active">Add Item</Link></li>
                        <li><Link to={"/FAQ/"}>About</Link></li>
                        <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                    </ul>
                <div class="hero-texts">
                   
              
                </div>
                

                <form className="form-style" onSubmit={this.handleSubmit}>
                <div className="add-text">ADD ITEM</div>
                    <div className="add-details">
                        <div className="add-item-image">
                            <img className="add-item-image" src={`/${this.state.filename}`}></img>
                        </div>
                        <div className="file-input">
                            <input id="hide" type="file" onChange={e => this.uploadFile(e.target.files[0])} />
                        </div>
                   \
                        <input className="input-field" type='text' onChange={this.handleNameChange} placeholder="Item Name" />
                        <textarea className="input-field" rows="4" cols="20" type="text" onChange={this.handleDescriptionChange} placeholder="The story behind the item" ></textarea>
                        <input className="input-field" type='text' onChange={this.handlePriceChange} placeholder="Start The Bid At:" />
               \
                     
                            <select className="category-select" onChange={this.handleCategory}>
                                <option value="SPCA Montreal">SPCA Montreal</option>
                                <option value="All Out">All Out</option>
                                <option value="MSF - Doctors Without Borders">MSF - Doctors Without Borders</option>
                                <option value="CAMH - Center for Addiction and Mental Health">CAMH - Center for Addiction and Mental Health</option>
                            </select>
                        
                        <div><input className="add-item-btn" type='submit' value="Add Item" /></div>
                    </div>
                      
                    </form>
              
            </div >)
    }
}

let connectedAddItem = connect(function (store) {
    return {
        sessionID: store.session,
        username: store.username
    }
})(withRouter(AddItem))
export default connectedAddItem