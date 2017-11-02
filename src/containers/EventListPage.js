/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'
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
      <main>
        <section className='cf w-100 pa2-ns'>
          {/* <Link to='/events/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
            + New Event
          </Link> */}
          
            {this.props.data.allEvents.map((event) =>
              <Event key={event.id} event={event} refresh={() => this.props.data.refetch()} />
            )}
          
        </section>
      </main>
    )
  }
}

const FeedQuery = gql`query allEvents {
  allEvents(orderBy: createdAt_DESC) {
    id
    publicId
    name
    description
    slug
    eventDate
  }
}`

const EventListPageWithData = graphql(FeedQuery)(EventListPage)

export default EventListPageWithData
