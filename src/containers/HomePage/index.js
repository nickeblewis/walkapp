import React from 'react'
import PhotoSection from './PhotoSection'
import IntroBlock from './IntroBlock'
// import { withRouter } from 'react-router'
// import { graphql } from 'react-apollo'
// import gql from 'graphql-tag'

// import BusinessSection from './BusinessSection'

class HomePage extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,    
    data: React.PropTypes.object,
  }

  state = { userId: 0 }

  render () {
    // if (!this.props.data.user) {
    //   console.warn('only logged in users can create new posts')
      
    // }
    console.log(this.props)
    // if (this.props.data.loading) {
    //   return (<div>Loading</div>)
    // }
    // Now for the JSX template that defines how our component actually looks!
    return (
      <article>
        
        <IntroBlock />
        {/* <BusinessSection title="Featured Businesses" /> */}
        { /* Would be great to pass through a value for number of photos to show here */ }
        <PhotoSection title="Newest Photos" />
      </article>
    )
  }
}

// const userQuery = gql`
//   query {
//     user {
//       id
//     }
//   }
// `

// export default graphql(userQuery, { options: { forceFetch: true }} )(withRouter(HomePage))
export default HomePage
