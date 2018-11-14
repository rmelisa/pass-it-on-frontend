import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'

//Reducer:
let reducer = function( state, action){
    if(action.type ==="setSession"){
        return{...state, session: action.sessionID }
    }
    if(action.type === "setItemID"){
        return{...state, itemID: action.id}
    }
    if(action.type === "setUsername") {
        return {...state, username: action.username}
    }
    if(action.type === "allBids"){
        return{...state, bids: state.bids.concat({
            itemID: action.itemID,
            itemName: action.itemName,
            description: action.description,
            minBid: action.minBid,
            newBid: action.newBid,
            image: action.image

        })}
    }

    return state
}
//CreateStore:
const store = createStore(
    reducer, // reducer
    {session: undefined,
    item: {bids:[] ,filename:"123.png", 
    itemName:"shirt", 
    minBid:"10", 
    description:"cool", 
    charityChoice:"UNICEF" }}, // initial state
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

let contents = (<Provider store={store}>
    <App />
</Provider>)

ReactDOM.render(contents, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
