// Always import React at the beginning of every React Component
// Everything is a component in React!
import React from 'react'

// https://github.com/apollographql/react-apollo
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Business from '../../components/Business'

// https://ponyfoo.com/articles/es6-classes-in-depth describes classes really well
class BusinessSection extends React.Component {

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
      <div className="tl bt b--black-10 pa3 pa5-ns bg-lightest-green navy">
        <div className="mw9 center">
          <h1 className="f5 ttu tracked fw6">{this.props.title}</h1>
          <section className="lh-copy">
            <div className="cf">
               <p className="f5 f3-ns lh-copy georgia">
                Farnborough has a vibrant business community and FG wants to introduce you to them!
              </p>
            { /* The following piece of code loops through the business data (see below) */ }
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

// Hey this is a query here :-) You should recognise this from earlier lessons
// We are going to grab the 4 most recently added businesses...
const FeedQuery = gql`query allBusinesses {
  allBusinesses(filter: {published: true},orderBy: createdAt_DESC,first: 6) {
    id
    contactName
    businessName
    emailAddress
  }
}`

const BusinessSectionWithData = graphql(FeedQuery)(BusinessSection)

export default BusinessSectionWithData
