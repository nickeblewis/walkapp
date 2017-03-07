/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'
import Photo from '../components/Photo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }
console.log(this.props)
    return (
      <main>
      
      <section className='cf w-100 pa2-ns'>
        <Link to='/photo/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New Photo
        </Link>
        
          {this.props.data.allPhotos.map((photo) =>
            <Photo key={photo.id} photo={photo} refresh={() => this.props.data.refetch()} />
          )}
        
      </section>
      </main>
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
