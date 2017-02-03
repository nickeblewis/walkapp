/**
 * Component that lists all Posts
 */
import React from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class HomePage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    return (
      <div>
        <h2>What is really not going on?</h2>
      </div>
    )
  }
}

const FeedQuery = gql`query allPosts {
  allPosts(orderBy: createdAt_DESC) {
    id
    imageUrl
    description
  }
}`

const HomePageWithData = graphql(FeedQuery)(HomePage)

export default HomePageWithData
