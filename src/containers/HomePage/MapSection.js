/**
 * Map Component
 */
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Place from '../../components/Place'

class MapSection extends React.Component {

   constructor() {
    super();
    this.state = {      
      lat: 51.27985,
      lng: -0.75159,
      zoom: 10,
    };
  }

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    const position = [this.state.lat, this.state.lng];
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <Map 
        center={position} 
        zoom={this.state.zoom} 
        scrollWheelZoom={false}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {this.props.data.allPlaces.map((marker, idx) =>
          <Marker key={`marker-${idx}`} position={[marker.latitude, marker.longitude]}>
          <Popup>
            <span>{marker.title}</span>
          </Popup>
        </Marker>        
        )}        
      </Map>
    )
  }
}

const FeedQuery = gql`query allPlaces {
  allPlaces(filter: {published:true, latitude_not:0, longitude_not:0}, orderBy: createdAt_DESC, first: 5) {
    title
    latitude
    longitude
  }
}`

const MapSectionWithData = graphql(FeedQuery)(MapSection)

export default MapSectionWithData
