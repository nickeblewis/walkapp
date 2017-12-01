import React from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends React.Component {
    
    render() {
      const style = {
        width: '100vw',
        height: '100vh'
      }
        return (
          <div style={style}>
          <Map 
            google={this.props.google} 
            zoom={14} 
            initialCenter={{
            lat: 51.290763,
            lng: -0.754099
          }} />

           
          
         
          </div>
        );
      }
    }
    

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCavd5OJyJCErf_b0QFAPIJJXGwrRCEZ1o')
  })(MapContainer)