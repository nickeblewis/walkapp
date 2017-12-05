import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateLogin extends React.Component {

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    signinUser: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  state = {
    email: '',
    password: '',
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    // redirect if user is logged in
    if (this.props.data.user) {
      console.warn('already logged in')
      this.props.router.replace('/')
    }

    return (
<section className="section">
  <div className="container">
      <div classname="columns">
        
        <div className="column is-half">
         <h1 className="title">Log In</h1>
          <div className="field">
            <div className="control">
              <input className="input" type="email" placeholder="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/> 
            </div>
          </div>  
          <div className="field">
            <div className="control">
              <input className="input" type="password" placeholder="password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/> 
            </div>
          </div>   

          {this.state.email && this.state.password &&
          <button className="button is-link" onClick={this.signinUser}>Login</button>}

         </div> 
        </div>
      </div>
</section>      
    )
  }

  signinUser = () => {
    const {email, password} = this.state

    this.props.signinUser({variables: {email, password}})
      .then((response) => {
        window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
        // this.props.router.replace('/')
        location.reload()
      }).catch((e) => {
        console.error(e)
        this.props.router.replace('/')
      })
  }
}

const signinUser = gql`
  mutation ($email: String!, $password: String!) { 
    signinUser(email: {email: $email, password: $password}) {
      token
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(signinUser, {name: 'signinUser'})(
  graphql(userQuery, { options: { forceFetch: true }})(withRouter(CreateLogin))
)