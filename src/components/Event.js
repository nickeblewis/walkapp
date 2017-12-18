/**
 * Single Photo item
 */
import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";
import Moment from "react-moment";

class Event extends React.Component {
  static propTypes = {
    event: React.PropTypes.object,
    mutate: React.PropTypes.func,
    refresh: React.PropTypes.func,
    data: React.PropTypes.object
  };

  // http://res.cloudinary.com/dqpknoetx/image/upload/v1489441520/odtitxnfqdjzfygvuvls.jpg

  _isLoggedIn() {
    console.log('debug1', this.props.data)
    return window.localStorage.getItem('graphcoolToken')
  }

  render() {
    // let outputUrl = '';

    // if(this.props.event.publicId === null) {
    //   outputUrl = this.props.event.imageUrl;
    // } else {
    //   outputUrl = 'http://res.cloudinary.com/dqpknoetx/image/upload/c_scale,w_640/v1489441520/' + this.props.event.publicId;
    // }

    var event = this.props.event.slug;
    const linkTo = "/events/" + event;

    console.log(linkTo);

    return (
      <div className="column is-one-third">
        <div className="card">
          <div className="card-image">
            {/* <div className='aspect-ratio aspect-ratio--1x1'> */}
            <Link className="" to={linkTo}>
              {/* <img style={{ backgroundImage: `url(${outputUrl})` }} className='db bg-center cover aspect-ratio--object' role='presentation'  */}

              <CloudinaryContext cloudName="dqpknoetx">
                <Image publicId={this.props.event.publicId} className="">
                  <Transformation width="800" height="200" crop="thumb" />
                </Image>
              </CloudinaryContext>
            </Link>

            {/* </div> */}
            {/*<span onClick={this.handleDelete}>Delete</span>*/}
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{this.props.event.name}</p>
                <p className="subtitle is-6">
                  @{this.props.event.venueName || "unknownvenue"}{" "}
                  <Moment fromNow>{this.props.event.eventDate}</Moment>
                </p>
              </div>
            </div>
            {/* <div className="content">{this.props.event.socialMessage}</div> */}
            {this._isLoggedIn() &&
              <div className="field is-grouped is-grouped-multiline">
              <p className="control">
                <a className="button is-primary">Edit</a>
              </p>
              <p className="control">
                <a className="button is-primary">Promote</a>
              </p>
              <p className="control">
                <a className="button is-warning" onClick={this.handleUpdate}>Archive</a>
              </p>
            </div>
            }
            
          </div>
        </div>
      </div>
    );
  }

  handleUpdate = () => {
    this.props
      .mutate({ variables: { id: this.props.event.id } })
      .then(this.props.refresh);
  };
}

const updateMutation = gql`
  mutation updateEvent($id: ID!) {
    updateEvent(id: $id, archived: true) {
      id
    }
  }
`;

const EventWithMutation = graphql(updateMutation)(Event);

export default EventWithMutation;
