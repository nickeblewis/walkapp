/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'
import Place from '../components/Place'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class PlaceListPage extends React.Component {

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
        <Link to='/place/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New Place
        </Link>
        
          {this.props.data.allPlaces.map((place) =>
            <Place key={place.id} place={place} refresh={() => this.props.data.refetch()} />
          )}
        
      </section>
      </main>
    )
  }
}

const FeedQuery = gql`query allPlaces {
  allPlaces(filter: {published:true}, orderBy: createdAt_DESC) {
    id
    banner
    title
    slug
    summary
  }
}`

const PlaceListPageWithData = graphql(FeedQuery)(PlaceListPage)

export default PlaceListPageWithData
