/**
 * Component that lists all Posts
 */
import React from 'react'
import Business from '../components/Business'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class BusinessPage extends React.Component {

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
        
          {this.props.data.allBusinesses.map((business) =>
            <Business key={business.id} business={business} refresh={() => this.props.data.refetch()} />
          )}
        
      </section>
      </main>
    )
  }
}

const FeedQuery = gql`query allBusinesses {
  allBusinesses(orderBy: createdAt_DESC) {
    id
    contactName
    businessName
    emailAddress
  }
}`

const BusinessPageWithData = graphql(FeedQuery)(BusinessPage)

export default BusinessPageWithData
