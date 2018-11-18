import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Route, BrowserRouter, Link } from 'react-router-dom'

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYm9yaGFhbiIsImEiOiJjam9pdnNsaWswZGgxM3FtaTcwbXNuMXZ1In0.dsqmmjBjCMkxcFhjcZ-gSA"

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: 1000,
        height: 200,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }

    };
  }

  render() {
    return (<div>
      <link href="https://fonts.googleapis.com/css?family=Libre+Franklin" rel="stylesheet"></link>
      <div className='home-container'>

        <div class="hero-image">
          <div class="hero-text">
          <div className="title1">PASS</div>
            <div className="title2">IT ON</div>
            <p>Taking unwanted items and turning them into monatary donations to those in need</p>
            <h2>-MAP-</h2>
          </div>
        </div>
        <ul className="tabs-container">
          <li><Link to={"/"}>Home</Link></li>
          <li><Link to={"/itemsList/"}>Items for Sale</Link></li>
          <li><Link to={"/FAQ/"}>How it Works</Link></li>
          <li><Link to={"/Members/"}>Members</Link></li>
          <li><Link to={"/Charities/"}>Charities</Link></li>
          <li><Link to={"/ItemsBid/"}>My Bids</Link></li>
        </ul>
      </div>
      <ReactMapGL
      {...this.state.viewport}
      onViewportChange={(viewport) => this.setState({ viewport })}
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
          <div><img src="/pin.png"></img></div>
        </Marker>
        
        </ReactMapGL>
    </div>
      );
    }
  }
  
export default Map