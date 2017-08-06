/**
 * Map Component
 */
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class MapSection extends React.Component {

  // We set the GPS data in our costructor which is used to center the map on the middle of Farnborough
  constructor() {
    super();
    this.state = {      
      lat: 51.27985,
      lng: -0.75159,
      zoom: 15,
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

// All we need are a title and GPS co-ordinates for our map markers
// We only select items that have been approved and published and that have a valid lonlat
// We only show the latest five places - so that the map isn't cluttered at any point in time
const FeedQuery = gql`query allPlaces {
  allPlaces(filter: {published:true, latitude_not:0, longitude_not:0}, orderBy: createdAt_DESC, first: 5) {
    title
    latitude
    longitude
  }
}`

const MapSectionWithData = graphql(FeedQuery)(MapSection)

export default MapSectionWithData
