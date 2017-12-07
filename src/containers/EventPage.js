/**
 * Component that lists all Posts
 */
import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
// import { Link } from 'react-router'
import { withRouter } from "react-router";
import { Map, Marker, TileLayer } from "react-leaflet";

class EventPage extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 51.27985,
      lng: -0.75159,
      zoom: 15
    };
  }
  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Event: React.PropTypes.object
    }).isRequired,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
  };

  render() {
    if (this.props.data.loading) {
      return(
        <section className="section">
          <div className="container">
            <div className="level">
              <div className="level-left"></div>
              <div className="level-item">
                <a className="button is-dark is-loading is-large">Loading</a>
              </div>
              <div className="level-right"></div>  
            </div>
          </div>
        </section>
      );
    }

    if (this.props.data.error) {
      console.log(this.props.data.error);
      return <div>An unexpected error occurred</div>;
    }

    console.log(this.props.data.Event);

    const Event = this.props.data.Event;

    let position = [Event.lat, Event.lng];
    return (
      <section className="eventpage-main">
        <div className="container">
          <br />
          <div className="columns">
            <div className="column">
              <CloudinaryContext cloudName="dqpknoetx">
                <Image publicId={Event.publicId}>
                  <Transformation width="500" crop="scale" />
                </Image>
              </CloudinaryContext>
            </div>
            <div className="column">
              <h1 className="title">{Event.name}</h1>
              <p className="content is-large">{Event.description}</p>
              <Map
                center={position}
                zoom={this.state.zoom}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={position} />
              </Map>
              <br />
              <h4 className="title">Contact Details</h4>
              <p className="content">{Event.contactName}</p>

              <p className="content">
                <a href={"mailto:" + Event.contactEmail}>
                  {Event.contactEmail}
                </a>
              </p>

              <p className="content">
                <a target="_blank" href={"http://" + Event.website}>
                  {Event.website}
                </a>
              </p>
            </div>
          </div>
          <br />
        </div>
      </section>
    );
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
      lat
      lng
      place {
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
`;

const EventPageWithQuery = graphql(EventQuery, {
  options: ownProps => ({
    variables: {
      id: ownProps.params.id
    }
  })
})(withRouter(EventPage));

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

export default EventPageWithQuery;
