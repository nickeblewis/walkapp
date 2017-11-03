/**
 * HomePage Component
 */

// Always import React at the beginning of every React Component
// Everything is a component in React!
import React from 'react'

// https://github.com/apollographql/react-apollo
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// https://css-tricks.com/learning-react-router/ this is a great resource for learning all about this
import Event from '../../components/Event'

// https://ponyfoo.com/articles/es6-classes-in-depth describes classes really well
class EventSection extends React.Component {

  // This component is the child of another and we can pass properties down the chain from a parent 
  // to its child components (children)
  // in this case we are defining data as being a mandatory property which this component can't run without
  static propTypes = {
    data: React.PropTypes.object,
  }

  // The following function is responsible for rendering to the browser
  render () {

    // Display a little loading message whilst we load data in 
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // Now for the JSX template that defines how our component actually looks!
    return (
      <div className="tl bt b--black-10 pa3 pa5-ns bg-black white">
        <div className="mw9 center">
          <h1 className="f5 ttu tracked fw6 pa3">{this.props.title}</h1>
          <section className="lh-copy">
            <div className="cf pa2">
              { /* The following piece of code loops through the photo data (see below) */ }
              {this.props.data.allEvents.map((event) =>
                <Event key={event.id} event={event} />
              )}
              </div>
            </section>
          </div>
      </div>
    )
  }
}

const FeedQuery = gql`query allEvents {
  allEvents(orderBy: eventDate_ASC, first: 15) {
    id
    publicId
    name
    slug
    description
  }
}`

const EventSectionWithData = graphql(FeedQuery)(EventSection)

export default EventSectionWithData
