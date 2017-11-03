/**
 * Component that lists all Posts
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react'
// import { Link } from 'react-router'
import { withRouter } from 'react-router'
import { Map, Marker, TileLayer } from 'react-leaflet'

class EventPage extends React.Component {
  constructor() {
    super();
    this.state = {      
      lat: 51.27985,
      lng: -0.75159,
      zoom: 15,
    };
  }
  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Event: React.PropTypes.object,
    }).isRequired,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
  }

  
  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

     if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

      console.log(this.props.data.Event)
      
      const Event = this.props.data.Event

    let position = [Event.eventVenue.longitude,Event.eventVenue.latitude]
    return (
      <main>
        <div className="db dt-ns mw9 center bg-black">
          <div className="fl-m fl-l w-50-m w-50-l">
            <div className="pa4 pa4-m center">
                  <CloudinaryContext cloudName="dqpknoetx">
                  <Image publicId={Event.publicId}>
                    <Transformation width="500" crop="scale" />
                  </Image>
                </CloudinaryContext>

                
          </div>
        </div>
        <div className="fl-m fl-l w-50-m w-50-l bg-near-white">
          <div className="pa4 pa4-m">
            <h3 className="f2">{Event.name}</h3>
            <p className="mid-gray f4 lh-copy">
              {Event.description}
            </p>
            <h3 className="f4">Where?</h3>
            <Map 
        center={position} 
        zoom={this.state.zoom} 
        scrollWheelZoom={false}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
          <Marker position={position}>
            
          </Marker>        
      </Map>
            <p className="mid-gray f4 lh-copy">
              {Event.eventVenue.title}
            </p>

            <p className="mid-gray f6 lh-copy">
              {Event.eventVenue.address}
            </p>

            <p className="mid-gray f6 lh-copy">
              {Event.eventVenue.postcode}
            </p>

            <h3 className="f4">Contact Details</h3>

            <p className="mid-gray f5 lh-copy">
              {Event.contactName}              
            </p>

            <p className="mid-gray f5 lh-copy">
              <a href={"mailto:" + Event.contactEmail}>{Event.contactEmail}</a>
            </p>

            <p className="mid-gray f5 lh-copy">
              <a target="_blank" href={"http://" + Event.website}>{Event.website}</a>
            </p>
            <p className="mid-gray f5 lh-copy">
              {Event.eventVenue.phone ? Event.eventVenue.phone : "No phone number available"}
            </p>
          </div>
        </div>
      </div>
            <div className="pa4 ph7-l georgia mw9-l center"></div>
        </main>
    )
  }
}

const EventQuery = gql`
query EventQuery($id: String!) {
    Event(slug: $id) {
      id
      publicId
      name
      description
      contactName
      contactEmail
      cost
      slug
      eventVenue {
        title
        postcode
        address
        latitude
        longitude
        phone
      }      
      eventDate
      website
    }
  }
`

const EventPageWithQuery = graphql(EventQuery,{
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.id
    }
  })
})(withRouter(EventPage))

// Nilan suggests....

// const EventQuery = gqlquery EventQuery($id: ID!) { Event(id: $id) { id file { url } } }
// const EventComponentWithData = graphql(EventQuery, {
// options: (ownProps) => ({
// variables: {
// id: ownProps.params.id
// }
// })
// }
// )(withRouter(Event))

export default EventPageWithQuery
