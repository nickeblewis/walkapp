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
      <div className="tl bt b--black-10 pa3 pa5-ns bg-black white">
        
        <div className="mw9 center">
        
          {/* <section className="lh-copy"> */}
            <div className="cf pa2">
              
            <h2 class="f3 fw4 pa3 mv0">What's On in your area...</h2>           
            {this.props.data.allEvents.map((event) =>
              <Event key={event.id} event={event} refresh={() => this.props.data.refetch()} />
            )}
          
       </div>
       {/* </section> */}
       </div>
       </div>
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
    eventDate
  }
}`

const EventListPageWithData = graphql(FeedQuery)(EventListPage)

export default EventListPageWithData
