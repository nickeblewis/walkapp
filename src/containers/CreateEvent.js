/**
 * Upload a new photo and annotate it with name and description
 * We also capture the full metadata for the image that is taken from EXIF, IPTC and other information
 *
 * NOTES FOR UNIT 212
 *
 * 2.1 - Refers to coding standards such as comments, naming and layout. This file also serves as a good example.
 *
 */
import React from "react";
import { withRouter } from "react-router";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Dropzone from "react-dropzone";
import request from "superagent";
import { Map, Marker, TileLayer } from "react-leaflet";

/**
 * TODO
 * Should move these to environment variables, so let's set some time aside to do that
 * The other option will be to move them to a file that is not checked into Github
 * Please ask me about this and why this matters :-)
 */

// Recently changed the preset to one that doesn't change the uploaded files, we want them to be stored as original
const CLOUDINARY_UPLOAD_PRESET = "bqzvryde";

// This is essentially the prefix for all references to images stored on Cloudinary
// Please ask me to do a proper training session on how Cloudinary works
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dqpknoetx/upload";

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    // Default our state - We shall discuss the difference between props and state at some point
    this.state = {
      name: "",
      description: "",
      eventDate: new Date(),
      slug: "",
      socialMessage: "",
      socialMessagePostDate: "",
      website: "",
      imageUrl: "",
      userId: 0,
      venueName: "",
      publicId: null,
      open: true,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: "",
      center: {
        lat: 51.290763,
        lng: -0.754099
      },
      marker: {
        lat: 51.290763,
        lng: -0.754099
      },
      zoom: 17,
      draggable: true
    };
  }

  // This event function is fired when a file is dropped on a page that supports drag-n-drop
  onImageDrop(files) {
    // Store the uploaded file in our state, so it is no longer a null value at this point
    this.setState({
      uploadedFile: files[0]
    });

    // Fire off the image upload handler
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    // These lines of code post the data to Cloudinary including the preset and the file data
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    // Handle the Response from the server, it may have failed, in which case log the error to the console
    upload.end((err, response) => {
      if (err) {
        console.error("ERR1", err);
      }

      // Not failed, good, it worked then!

      // 1. The following piece of code outputs the response we receive from Cloudinary when the image is uploaded OK
      //    you will see it is output in the browser console
      // 2. We also can see in this object that we extract metadata from the photo that was uploaded
      //    I've decided to capture that too

      // Please note that two new fields have been added to our Photo model on Graph.Cool
      console.log(response.body);

      // Dan, so some changes need to be made in order to capture the "public_id" as well as the imageUrl
      // so I have added this line below in the setState
      if (response.body.url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.url,
          imageUrl: response.body.url,
          publicId: response.body.public_id,
          userId: "cj1b7fnnxzllj0147oih4ai72"
        });
      }
    });
  }
  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object
  };

  onChange = eventDate => this.setState({ eventDate });

  updatePosition = () => {
    const { lat, lng } = this.refs.marker.leafletElement.getLatLng();
    this.setState({
      marker: { lat, lng }
    });
  };

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    }

    if (!this.props.data.user) {
      console.warn("only logged in users can create new events");
      this.props.router.replace("/events");
    }
    const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];

    return (
      <section className="section">
        <div className="container">
          <h1 className="title">Create New Event!</h1>
          <h1 className="subtitle">
            When creating a new event, it will be shown on our pages and ordered
            based on the date it will be taking place.
          </h1>
          <div className="content">
            <p>
              Please add a flyer, graphic or other image that will represent
              your event on our website. Your image will also be used in
              conjunction with automated social media campaingns.
            </p>
          </div>
          {/* The DropZone component handles file upload */}
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*"
          >
            <div>
              {this.state.uploadedFileCloudinaryUrl === "" ? null : (
                <div>
                  <p>{this.state.uploadedFile.name}</p>
                </div>
              )}
            </div>
          </Dropzone>

 
          {/* EVENT NAME */}
          <label className="label">Event</label>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="name"
                placeholder="Event Name"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
          </div>
          {/* VENUE NAME */}
          <label className="label">Venue</label>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="name"
                placeholder="Venue Name"
                value={this.state.venueName}
                onChange={e => this.setState({ venueName: e.target.value })}
              />
            </div>
          </div>
          {/* EVENT DESCRIPTION */}
          <label className="label">Description</label>
          <div className="field">
            <textarea
              className="textarea"
              placeholder="Description"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </div>
          {/* EVENT DATE */}
          <label className="label">Date</label>
          <div className="content">
            <p>
              The date is used to automatically scedule social media messages
              for your event. Please enter in the format of YYYY-MM-DDTHH:MM
            </p>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="name"
                placeholder="Event Date"
                value={this.state.eventDate}
                onChange={e => this.setState({ eventDate: e.target.value })}
              />
            </div>
          </div>
          {/* LOCATION */}
          <label className="label">Location</label>
          <Map center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
            <TileLayer
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker
              position={markerPosition}
              draggable={this.state.draggable}
              onDragend={this.updatePosition}
              ref="marker"
            />
          </Map>
          {/* SLUG */}
          <label className="label">Slug</label>
          <div className="content">
            <p>
              A slug is a term that we use referring to the name appended to the
              end of a URL, so for example if your event was "Christmas Carols
              in the Meads" the slug would be christmas-carols-in-the-meads
            </p>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="name"
                placeholder="Slug"
                value={this.state.slug}
                onChange={e => this.setState({ slug: e.target.value })}
              />
            </div>
          </div>
          {/*SOCIAL MESSAGE */}
          <label className="label">Social Message</label>
          <div className="content">
            <p>
              The message you wish to post via Farnborough Guide's Twitter and
              Facebook social media accounts
            </p>
          </div>
          <div className="field">
            <textarea
              className="textarea"
              placeholder="Social Message"
              value={this.state.socialMessage}
              onChange={e => this.setState({ socialMessage: e.target.value })}
            />
          </div>
          <label className="label">Social Message Schedule DateTime</label>
          <div className="content">
            <p>Let us know when you want this message to be posted to social media</p>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                placeholder="Social Message Post Date"
                value={this.state.socialMessagePostDate}
                onChange={e => this.setState({ socialMessagePostDate: e.target.value })}
              />
            </div>
          </div>
          {/*WEBSITE */}
          <label className="label">Website</label>
          <div className="content">
            <p>The offical event website</p>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                placeholder="Website"
                value={this.state.website}
                onChange={e => this.setState({ website: e.target.value })}
              />
            </div>
          </div>
          <button className='button is-primary' onClick={this.handleEvent}>Create Event</button>
        </div>
      </section>
    );
  }

  // This piece of code looks after preparing the GraphQL Mutation
  handleEvent = () => {
    const userId = this.props.data.user.id;
    const {
      name,
      description,
      publicId,
      eventDate,
      slug,
      socialMessage,
      socialMessagePostDate,
      website,
      venueName
    } = this.state;
    const { lat, lng } = this.state.marker;
    this.props
      .mutate({
        variables: {
          name,
          description,
          userId,
          venueName,
          publicId,
          eventDate,
          slug,
          socialMessage,
          socialMessagePostDate,
          website,
          lat,
          lng
        }
      })
      .then(() => {
        this.props.router.push("/events");
      });
  };
}

const createEvent = gql`
  mutation(
    $name: String!
    $description: String!
    $eventDate: DateTime
    $slug: String
    $socialMessage: String
    $socialMessagePostDate: DateTime
    $website: String
    $lat: Float
    $lng: Float
    $userId: ID!
    $venueName: String
    $publicId: String
  ) {
    createEvent(
      archived: false
      name: $name
      description: $description
      eventDate: $eventDate
      slug: $slug
      socialMessage: $socialMessage
      socialMessagePostDate: $socialMessagePostDate
      website: $website
      lat: $lat
      lng: $lng
      userId: $userId
      venueName: $venueName
      publicId: $publicId
    ) {
      id
      socials {
        id
      }
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(createEvent)(
  graphql(userQuery, { options: { forceFetch: true } })(withRouter(CreateEvent))
);
