import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// import BusinessSection from './BusinessSection'

class ThankyouPage extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,    
    data: React.PropTypes.object,
  }

  render () {
    return (
      <article>
        <div className="db dt-ns mw9 center">
          <div className="fl-m fl-l w-100-m w-100-l">
            <div className="pa4 pa4-m">
            <h3 className="f3">Thankyou!</h3>
              <p className="mid-gray f4 lh-copy">            
                We will get back to you as soon as we can :-)
              </p> 
            </div>
          </div>
        </div>  
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
export default graphql(userQuery, { options: { forceFetch: true }} )(withRouter(ThankyouPage))
