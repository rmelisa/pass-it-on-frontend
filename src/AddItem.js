import React, { Component } from "react";
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

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
        return (<div>
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
                    <div>Item name:<input className="input-field" type='text' onChange={this.handleNameChange} placeholder="Item Name" /></div>
                    <div>What is the story behind the item?<textarea className="input-field" rows="4" cols="20" type="text" onChange={this.handleDescriptionChange} placeholder="The story behind the item" ></textarea>
                        </div>
                    <div> start the bid at:<input className="input-field" type='text' onChange={this.handlePriceChange} placeholder="" /></div>

                    <div>
                        <select className="category-select" onChange={this.handleCategory}>
                            <option value="charity1">charity1</option>
                            <option value="charity2">charity2</option>
                            <option value="charity3">charity3</option>
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