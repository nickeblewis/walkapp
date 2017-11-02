/**
 * Component that lists all Posts
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react'
// import { Link } from 'react-router'
import { withRouter } from 'react-router'

class EventPage extends React.Component {

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
    // const outputUrl = "http://placehold.it/400x400";
    // var myText = this.props.params.id;
    // console.log(this.props.data.Event)
    // let outputUrl = '';
    
    // if(this.props.data.Event.publicId === null) {
    //   outputUrl = this.props.data.Event.imageUrl;
    // } else {
    //   outputUrl = 'http://res.cloudinary.com/dqpknoetx/image/upload/c_scale,w_1200/v1489441520/' + this.props.data.Event.publicId;
    // }

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

     if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

      console.log(this.props.data.Event)
    // const Event = this.props.data.Event

    return (
      <main>
        <div className="db dt-ns mw9 center">
          <div className="fl-m fl-l w-50-m w-50-l">
            <div className="pa4 pa4-m">
                  <CloudinaryContext cloudName="dqpknoetx">
                  <Image publicId={this.props.data.Event.publicId}>
                    <Transformation width="500" crop="scale" />
                  </Image>
                </CloudinaryContext>

                
          </div>
        </div>
        <div className="fl-m fl-l w-50-m w-50-l">
          <div className="pa4 pa4-m">
            <h3 className="f4">{this.props.data.Event.name}</h3>
            <p className="mid-gray f5 lh-copy">
              {this.props.data.Event.description}
            </p>
            <h3 className="f4">Where?</h3>
            <p className="mid-gray f5 lh-copy">
              {this.props.data.Event.eventVenue.title}
            </p>
            <h3 className="f4">When?</h3>
            <p className="mid-gray f5 lh-copy">
              {this.props.data.Event.eventDate}
            </p>
            <h3 className="f4">Who to Contact?</h3>
            <p className="mid-gray f5 lh-copy">
              {this.props.data.Event.contactName}
            </p>
            <h3 className="f4">Cost</h3>
            <p className="mid-gray f5 lh-copy">
              {this.props.data.Event.cost}
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
      imageUrl
      publicId
      name
      description
      contactName
      cost
      slug
      eventVenue {
        title
      }
      eventDate
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
