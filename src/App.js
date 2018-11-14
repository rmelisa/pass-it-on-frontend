import React, { Component } from 'react';
import './App.css';
import Login from './Login.js'
import Signup from './Signup.js'
// import Member from './Member.js'
import ItemDetails from './ItemDetails.js'
import { connect } from 'react-redux'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Home from './Home'
import AddItem from './AddItem.js'
import ItemsList from './ItemsList'
import ShoppingCart from './ShoppingCart'
import Members from './Members.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    let callBack = function (res){
      let parsed = JSON.parse(res)
      if (parsed.status) {
        this.props.dispatch({  
          type: "setSession",
          sessionID: parsed.sessionID
        })
        this.props.dispatch({  
          type: "setUsername",
          username: parsed.username
        })
      }
    }
    callBack = callBack.bind(this)
    fetch('/sessionActive', {
      method:'GET',
      credentials: "same-origin"
    }).then(function (x) {
      return x.text()
    }).then(callBack)
  }

  renderLogin() {
    return (<Login endpoint={'/login'} />)
  }

  renderSignup() {
    return (<Signup endpoint={'/signup'} />)
  }

  // renderCharity(){
  //   return (<Charity endpoint={'/charity'}/>)
  // }
  renderHome() {
    return (<Home />)
  }

  renderDetails(routerData) {
    let itemID = routerData.match.params.itemID;
    return (<ItemDetails itemID={itemID} />)
  }
  renderAddItem() {
    return (<AddItem />)
  }
  renderItemsList() {
    return (<ItemsList/>)
  }


  // renderItemsBid(){
  //   return (<ItemsBid endpoint={'/bids'}/>)
  // }
  
  renderMember(routerData) {
    let username = routerData.match.params.username;
    return (<Members username={username} />)
  }
  // renderCart(){
  //   return(<ShoppingCart/>)
  //   }
// renderFAQ(){
//   return (<FAQ/>)
// }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={this.renderHome} />
          <Route exact={true} path='/signup/' render={this.renderSignup} />
          <Route exact={true} path='/login/' render={this.renderLogin} />
          <Route exact={true} path='/itemsList' render={this.renderItemsList} />
          <Route exact={true} path='/addItem/' render={this.renderAddItem} />
          <Route exact={true} path='/itemDetails/:itemID' render={this.renderDetails} />
          <Route exact={true} path='/Info/' render={this.renderFAQ} />
          {/* <Route exact={true} path='/cart/' render={this.renderCart} /> */}
          {/* <Route exact={true} path= '/charity/' render={this.renderCharity} /> */}
          <Route exact={true} path= '/bids' render={this.renderItemsBid} />
          <Route exact={true} path='/members/' render={this.renderMember} />

        </div>
      </BrowserRouter>
    );
  }
}

let connectedApp = connect(function (store) {
  return {
    sessionID: store.session
  }
})(App)
export default connectedApp;
