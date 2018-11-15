import React,{Component} from 'react';
import ReactMapGL from 'react-map-gl';

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYm9yaGFhbiIsImEiOiJjam9pdnNsaWswZGgxM3FtaTcwbXNuMXZ1In0.dsqmmjBjCMkxcFhjcZ-gSA"

class Map extends Component {
constructor(props){
    super(props)
  this.state = {
    viewport: {
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
    
  };
}

//   componentDidMount(){
//       this.renderToken()
//   }
  
  render() {
    return (<div>
       
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
      </div>
    );
  }
}

export default Map