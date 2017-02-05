/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'
import Post from '../components/Post'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Grid, Thumbnail, Col, Row, Button, Jumbotron } from 'react-bootstrap'



class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <Grid>
        <Link to='/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New Post
        </Link>
        <Row>
          {this.props.data.allPosts.map((post) =>
            <Post key={post.id} post={post} refresh={() => this.props.data.refetch()} />
          )}
        </Row>
      </Grid>
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

const ListPageWithData = graphql(FeedQuery)(ListPage)

export default ListPageWithData
