/**
 * Component that lists all Posts
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
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

    // const Event = this.props.data.Event

    return (
        <article>
            <div className="pa4 ph7-l georgia mw9-l center">
                { this.props.data.Event.publicId ? 
                  <img src={`http://res.cloudinary.com/dqpknoetx/image/upload/c_scale,w_1200/v1489441520/${this.props.data.Event.publicId}`} alt={this.props.data.Event.name} />  :
                  <img src={this.props.data.Event.imageUrl} alt={this.props.data.Event.name} /> 
                }
                <h3 className="f3">{this.props.data.Event.name} </h3>
                <p className="mid-gray f3 lh-copy">
                    {this.props.data.Event.description}
                    {this.props.data.Event.publicId}
                </p>
            </div>
        </article>
    )
  }
}


const EventQuery = gql`
query EventQuery($id: ID!) {
    Event(id: $id) {
      id
      imageUrl
      publicId
      name
      description
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
