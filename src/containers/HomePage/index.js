import React from 'react'
import PhotoSection from './PhotoSection'
import PlaceSection from './PlaceSection'
import EventSection from './EventSection'
import IntroBlock from './IntroBlock'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

// import BusinessSection from './BusinessSection'

class HomePage extends React.Component {

  constructor() {
    super();
    this.state = {      
      lat: 51.27985,
      lng: -0.75159,
      zoom: 15,
    };
  }

  static propTypes = {
    router: React.PropTypes.object,    
    data: React.PropTypes.object,
  }

  render () {
    const position = [this.state.lat, this.state.lng];
    return (
      <article>
        
        { /* Dan, added a new paramater here to pass data to the IntroBlock component, this object includes our user details */ }
        <IntroBlock data={this.props.data}/>
                <Map center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>

        {/* <BusinessSection title="Featured Businesses" /> */}
        
        { /* TODO: Would be great to pass through a value for number of photos to show here */ }
        <PlaceSection title="Latest Places" />
        <EventSection title="Upcoming Events" />
        <PhotoSection title="Newest Photos" />
      </article>
    )
  }
}

// Dan, I have added this GraphQL query that retrieves the logged in user details or should I say the authenticated user details, that is more accurate
const userQuery = gql`
  query {
    user {
      id
    }
  }
`

// Dan, here we connect the user data to the UI
export default graphql(userQuery, { options: { forceFetch: true }} )(withRouter(HomePage))
