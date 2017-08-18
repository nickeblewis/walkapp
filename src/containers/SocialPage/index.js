import React from 'react'
import IntroBlock from './IntroBlock'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class SocialPage extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,    
    data: React.PropTypes.object,
  }

  render () {
    return (
      <article>
        
        { /* Dan, added a new paramater here to pass data to the IntroBlock component, this object includes our user details */ }
        <IntroBlock data={this.props.data}/>
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
export default graphql(userQuery, { options: { forceFetch: true }} )(withRouter(SocialPage))
