/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class HomePage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    return (
      <div className='w-100 flex justify-center'>
        We shall add something here...
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
