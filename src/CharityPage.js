import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'
import { withRouter } from 'react-router'
import './CharityPage.css';

class CharityPage extends Component {
    constructor() {
        super()
        this.state = {
        }
        this.getTotal = this.getTotal.bind(this)
        this.backToHome = this.backToHome.bind(this)
     
    }

    getTotal() {
        let total = 0
        this.props.items.forEach(function (item) {
            let price = parseInt(item.newBid)
            total += price
        });
        return `${total} $`
    }

  
    backToHome() {
        this.props.history.push('/')
    }
  
    render() {
        return (<div>
            <div className="charity-dashboard">Charity Dashboard</div>
            <button onClick={this.backToHome}>Back to Home</button>
            <div className="charity-container">
            <img className="charity-img" src="/spca.png"></img>
            <div className="charity-div">
            <a href="https://www.spca.com/en/">Link to Website</a>
            <p>By donating to the Montreal SPCA, you can help alleviate the plight of animals and enable us to continue our mission.</p>
            <div>Amount Raised:</div>
            </div>
            
            <img className="charity-img" src="/msf.png"></img>
            <div className="charity-div">
            <a href="http://www.doctorswithoutborders.ca/">Link to Website</a>
            <p>Médecins Sans Frontières Canada (MSF) works in over 70 countries and has a mission to reduce suffering and provide medical care to people around the world regardless of race, religion or political affiliation.</p>
            <div>Amount Raised:</div>
            </div>
            </div>
            <div className="charity-container">
            <img className="charity-img" src="/ccs.jpg"></img>
            <div className="charity-div">
            <a href="http://www.cancer.ca/en/?region=qc">Link to Website</a>
            <p>The Canadian Cancer Society is a national, community-based charitable organization of volunteers whose mission is to eradicate cancer and enhance the quality of life of those who have the disease.</p>
            <div>Amount Raised:</div>
            </div>
        
            <img className="charity-img" src="/camh.jpg"></img>
            <div className="charity-div">
            <a href="http://www.camh.ca/">Link to Website</a>
            <p>The Centre for Addiction and Mental Health (CAMH) is Canada's largest mental health teaching hospital and one of the world's leading research centres in its field.</p>
            <div>Amount Raised:</div>
            </div>
            </div>
            
            {/* <div className="charity-container">
            <img className="charity-img" src="/unicef.png"></img>
            <div className="charity-div">
            <a href="https://www.unicef.ca/en">Link to Website</a>
            <p>UNICEF, acronym of United Nations Children's Fund, special program of the United Nations (UN) devoted to aiding national efforts to improve the health, nutrition, education, and general welfare of children.</p>
            <div>Amount Raised:</div>
            </div>
            </div> */}

            

            {/* <div>{this.props.items.map(this.showItems)}</div>
            <div>Total price:{this.getTotal(this.props.items)}</div> */}
      
        </div>)
    }
}
const mapStateToProps = (store) => {
    return {
        sessionID: store.session,
        item: store.item
    }
}
let connectedMapStateToStore = connect(mapStateToProps)(withRouter(CharityPage))
export default connectedMapStateToStore;