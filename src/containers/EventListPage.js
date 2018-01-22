/**
 * Component that lists all Posts
 */
import React from 'react'
import styled from 'styled-components'

import HeroSection from '../components/HeroSection'

import Event from '../components/Event'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

class EventListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

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

    return (
      <Wrapper>
        <HeroSection title="Events" slogan="What's coming up..." />
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
      </Wrapper>
      
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
