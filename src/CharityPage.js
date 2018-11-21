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
        this.backToHome = this.backToHome.bind(this)
        this.renderCharityInfo = this.renderCharityInfo.bind(this)

    }
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
        return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet"></link>
             <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet"></link>
            <div className='home-container'>

                <div class="charity-image">
                    <div class="hero-text">
                        <div className="title1">PASS</div>
                        <div className="title2">IT ON</div>
                        <p className="title-description">Taking unwanted items and turning them into monatary donations to those in need</p>
                        <h2>-CHARITIES-</h2>


                    </div>
                    <ul className="tabs-container">
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/itemsList/"}>Items for Sale</Link></li>
                        <li><Link to={"/members/"}>Other Members</Link></li>
                        <li><Link to={"/Charities/"} className="active">Charities</Link></li>
                        <li><Link to={"/addItem/"}>Add Item</Link></li>
                        <li><Link to={"/FAQ/"}>About</Link></li>
                        <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
                    </ul>
                </div>
            </div>

            <Chart className="full-chart"></Chart>


            <div className="charity-container">
            <a href="https://www.spca.com/en/"><img className="spca-img" src="/spca.png"/></a>
                <div className="spca-div">
                    <a href="https://www.spca.com/en/">SPCA Montreal</a>
                    <p>By donating to the Montreal SPCA, you can help alleviate the plight of animals and enable us to continue our mission.</p>
                </div>

                <a href="http://www.doctorswithoutborders.ca/"><img className="msf-img" src="/msf.png"/></a>
                <div className="msf-div">
                    <a href="http://www.doctorswithoutborders.ca/">MSF - Doctors Without Borders</a>
                    <p>Médecins Sans Frontières Canada (MSF) works in over 70 countries and has a mission to reduce suffering and provide medical care to people around the world regardless of race, religion or political affiliation.</p>
                </div>


                <div className="charity-container">
                <a href="https://allout.org/en"><img className="ccs-img" src="/allout.png"/></a>
                    <div className="ccs-div">
                        <a href="https://allout.org/en">All Out</a>
                        <p>All Out is a global movement for love and equality. We're mobilising thousands of people to build a world where no person will have to sacrifice their family or freedom, safety or dignity, because of who they are or who they love.</p>
                    </div>

                    <a href="http://www.camh.ca/"><img className="camh-img" src="/camh.png"/></a>
                    <div className="camh-div">
                        <a href="http://www.camh.ca/">CAMH - Center for Addiction and Mental Health</a>
                        <p>The Centre for Addiction and Mental Health (CAMH) is Canada's largest mental health teaching hospital and one of the world's leading research centres in its field.</p>
                    </div>
                </div>

                <footer className="banner">
                    <div className="media-div">
                        <img className="media-img" src={'/facebook-xxl.png'} />
                        <img className="media-img" src={'/instagram-xxl.png'} />
                        <img className="media-img" src={'/twitter-xxl.png'} />
                    </div>
                </footer>
            </div >
            </div>
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