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
        latitude: 45.476722211952456,
        longitude: -73.57146624130783,
        zoom: 10
      },
      members: []

    };
    this.MarkerForMembers = this.MarkerForMembers.bind(this)
  }

  componentDidMount(){
    let cb = function (response) {
      let parsed = JSON.parse(response)
      console.log(parsed)
      this.setState({ members: parsed})
  }
cb = cb.bind(this)
    
      fetch("/getMembers")
          .then(function (x) {
              return x.text()
          })
          .then(cb)
  }

  MarkerForMembers(member){
    console.log("hey shabi!", member.lat, member.lon)
    return(<Marker latitude={member.location.lat} longitude={member.location.lon} offsetLeft={-20} offsetTop={-10}>
      <div><img src="/pin2.png"></img></div>
    </Marker>)
  }
  render() {
    return (<div>
      
      <ReactMapGL
      {...this.state.viewport}
      onViewportChange={(viewport) => this.setState({ viewport })}
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      >
        {this.state.members.map(this.MarkerForMembers)}
        
        </ReactMapGL>
    </div>
      );
    }
  }
  
export default Map