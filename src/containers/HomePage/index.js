import React from 'react'
// import PhotoSection from './PhotoSection'
// import PlaceSection from './PlaceSection'
// import MapSection from './MapSection'
import EventSection from './EventSection'
import IntroBlock from './IntroBlock'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// import BusinessSection from './BusinessSection'

class HomePage extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,    
    data: React.PropTypes.object,
  }

  render () {
    console.log('mainIndex', this.props.data)
    return (
      <article className="fg">
        
        { /* Dan, added a new paramater here to pass data to the IntroBlock component, this object includes our user details */ }
        <IntroBlock data={this.props.data}/>
        {/* <MapSection /> */}

        { /* TODO: <BusinessSection title="Featured Businesses" /> */ }
        
        { /* TODO: Would be great to pass through a value for number of photos to show here */ }
        {/* <PlaceSection title="Latest Places" /> */}
        <EventSection title="Upcoming Events" data={this.props.data} />
        {/* <PhotoSection title="Newest Photos" /> */}
      </article>
    )
  }
}

// Dan, I have added this GraphQL query that retrieves the logged in user details or should I say the authenticated user details, that is more accurate
const userQuery = gql`
  query {
    user {
      id
    }
  }
`

// Dan, here we connect the user data to the UI
export default graphql(userQuery, { options: { forceFetch: true }} )(withRouter(HomePage))
