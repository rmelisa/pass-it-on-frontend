import React, { Component } from "react";
import { connect } from 'react-redux'
import Checkout from './Checkout'
import { withRouter } from 'react-router'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import './CharityPage.css';
import Chart from './Chart';




class CharityPage extends Component {
    constructor() {
        super()
        this.state = {
            charityTotals: {}
        }
        // this.getTotal = this.getTotal.bind(this)
        this.backToHome = this.backToHome.bind(this)
        this.renderCharityInfo = this.renderCharityInfo.bind(this)

    }

    // getTotal() {
    //     let total = 0
    //     this.props.items.forEach(function (item) {
    //         let price = parseInt(item.newBid)
    //         total += price
    //     });
    //     return `${total} $`
    // }
    componentDidMount() {
        fetch("/getAllCharities") //confirm name
            .then(x => x.text())
            .then(response => {
                let parsed = JSON.parse(response)
                this.setState({ charityTotals: parsed })
            })
    }




    backToHome() {
        this.props.history.push('/')
    }
    renderCharityInfo() {
        let charities = Object.keys(this.state.charityTotals)
        return (
            <div>{charities.map(function (charity) {
                return (<div>Charity Name: {charity}
                    <br></br>
                    Amount raised: {this.state.charityTotals[charity]}
                </div>)
            }.bind(this))}
            </div>
        )
    }
    render() {
        return (<div>
            <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
            <div className='home-container'>

                <div class="charity-image">
                    <div class="hero-text">
                        <div className="title1">PASS</div>
                        <div className="title2">IT ON</div>
                        <p>Taking unwanted items and turning them into monatary donations to those in need</p>
                        <h2>-CHARITIES-</h2>
               

                </div>
                <ul className="tabs-container">
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/itemsList/"}>Items for Sale</Link></li>
                    <li><Link to={"/FAQ/"}>How it Works</Link></li>
                    <li><Link to={"/Members/"}>Members</Link></li>
                    <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                    <li><Link to={"/map/"}>Map</Link></li>
                </ul>
            </div>
            </div>
       
            <Chart className="full-chart"></Chart>


            <div className="charity-container">
                <img className="spca-img" src="/spca.png"></img>
                <div className="spca-div">
                    <a href="https://www.spca.com/en/">Link to Website</a>
                    <p>By donating to the Montreal SPCA, you can help alleviate the plight of animals and enable us to continue our mission.</p>
                </div>

                <img className="msf-img" src="/msf.png"></img>
                <div className="msf-div">
                    <a href="http://www.doctorswithoutborders.ca/">Link to Website</a>
                    <p>Médecins Sans Frontières Canada (MSF) works in over 70 countries and has a mission to reduce suffering and provide medical care to people around the world regardless of race, religion or political affiliation.</p>

                </div>
            </div>
            <div className="charity-container">
                <img className="ccs-img" src="/allout.png"></img>
                <div className="ccs-div">
                    <a href="https://allout.org/en">Link to Website</a>
                    <p>All Out is a global movement for love and equality. We're mobilising thousands of people to build a world where no person will have to sacrifice their family or freedom, safety or dignity, because of who they are or who they love.</p>
                </div>

                <img className="camh-img" src="/camh.png"></img>
                <div className="camh-div">
                    <a href="http://www.camh.ca/">Link to Website</a>
                    <p>The Centre for Addiction and Mental Health (CAMH) is Canada's largest mental health teaching hospital and one of the world's leading research centres in its field.</p>
                </div>
            </div>
            <div> {this.renderCharityInfo()} </div>
            <footer className="banner">
                <div className="media-div">
                    <img className="media-img" src={'/facebook.png'} />
                    <img className="media-img" src={'/instagram.png'} />
                    <img className="media-img" src={'/twitter.png'} />
                </div>
            </footer>
        </div >
        )

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