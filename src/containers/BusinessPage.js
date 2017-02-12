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
            <div className="tl bt b--black-10 pa3 pa5-ns bg-lightest-green navy">
        <div className="mw9 center">
          <h1 className="f5 ttu tracked fw6">Business Directory</h1>
          <section className="lh-copy">
            <div className="cf">
  
          {this.props.data.allBusinesses.map((business) =>
            <Business key={business.id} business={business} />
          )}
         </div>
          </section>
        </div>
      </div>
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
