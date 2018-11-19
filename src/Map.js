import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Route, BrowserRouter, Link } from 'react-router-dom'

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYm9yaGFhbiIsImEiOiJjam9pdnNsaWswZGgxM3FtaTcwbXNuMXZ1In0.dsqmmjBjCMkxcFhjcZ-gSA"

class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: 1200,
        height: 200,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      },
      membersList: []

    };
  }

  render() {
    return (<div>
      
      <ReactMapGL
      {...this.state.viewport}
      onViewportChange={(viewport) => this.setState({ viewport })}
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
          <div><img src="/pin2.png"></img></div>
        </Marker>
        
        </ReactMapGL>
    </div>
      );
    }
  }
  
export default Map