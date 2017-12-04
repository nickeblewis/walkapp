/**
 * Component that lists all Posts
 */
import React from 'react'
import Event from '../components/Event'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class EventListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <section className="eventpage-events">
      <div className="container">
        <p className="title is-4">What's on in the area...</p>
            { /* The following piece of code loops through the photo data (see below) */ }
            <div className="columns is-multiline">
            {this.props.data.allEvents.map((event) =>
              <Event key={event.id} event={event} />
            )}
            </div>
        </div>
    </section>
    )
  }
}

const FeedQuery = gql`query allEvents {
  allEvents(filter: {archived: false}, orderBy: eventDate_ASC) {
    id
    publicId
    name
    description
    slug
    socialMessage
    venueName
    eventDate
  }
}`

const EventListPageWithData = graphql(FeedQuery)(EventListPage)

export default EventListPageWithData
