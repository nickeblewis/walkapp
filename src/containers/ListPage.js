/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'
import Photo from '../components/Photo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Grid, Row } from 'react-bootstrap'



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
          + New Photo
        </Link>
        <Row>
          {this.props.data.allPhotos.map((photo) =>
            <Photo key={photo.id} photo={photo} refresh={() => this.props.data.refetch()} />
          )}
        </Row>
      </Grid>
    )
  }
}

const FeedQuery = gql`query allPhotos {
  allPhotos(orderBy: createdAt_DESC) {
    id
    imageUrl
    name
    description
  }
}`

const ListPageWithData = graphql(FeedQuery)(ListPage)

export default ListPageWithData
