import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateUser extends React.Component {

  static propTypes = {
    router: React.PropTypes.object.isRequired,
    createUser: React.PropTypes.func.isRequired,
    signinUser: React.PropTypes.func.isRequired,
    data: React.PropTypes.object.isRequired,
  }

  state = {
    email: this.props.location.query.email || '',
    password: '',
    name: '',
    emailSubscription: false,
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
   <h1 className="title">Benifits of Signing Up!</h1> 
    <div className="columns">
      <div className="column is-half has-text-left">
          <div className="content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eget hendrerit sapien, vel pharetra sem. Phasellus dapibus eros eu justo cursus, eget ultricies odio mollis.</p>
          </div>
      </div>     
      
      <div className="column is-half has-content-left">
        <div className="field">
            <div className="control">
              <input className="input" type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState( {email: e.target.value})}/>
            </div>
        </div>

        <div className="field">
            <div className="control">
              <input className="input" type="password" placeholder="password" value={this.state.password} onChange={(e) => this.setState( {password: e.target.value})}/>
            </div>
        </div>
        
        <div className="field">
            <div className="control">
              <input className="input" type="Name" placeholder="name" value={this.state.name} onChange={(e) => this.setState( {name: e.target.value})}/>
            </div>
        </div>

        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" onChange={(e) => this.setState({emailSubscription: e.target.checked})}/>
                 Subscribe to email notifications?
            </label>
          </div>
        </div>

        {this.state.name && this.state.email && this.state.password &&
        <button className="button is-link" onClick={this.createUser}>Sign Up</button>}

      </div> 
    </div>  
  </div> 
</section> 
  

      
      
    )
  }

  createUser = () => {
    const {email, password, name, emailSubscription} = this.state

    this.props.createUser({variables: {email, password, name, emailSubscription}})
      .then((response) => {
        this.props.signinUser({variables: {email, password}})
          .then((response) => {
            window.localStorage.setItem('graphcoolToken', response.data.signinUser.token)
            // this.props.router.replace('/')
            location.reload()
          }).catch((e) => {
            console.error(e)
            this.props.router.replace('/')
          })
      }).catch((e) => {
        console.error(e)
        this.props.router.replace('/')
      })
  }
}

const createUser = gql`
  mutation ($email: String!, $password: String!, $name: String!, $emailSubscription: Boolean!) {
    createUser(authProvider: {email: {email: $email, password: $password}}, name: $name, emailSubscription: $emailSubscription) {
      id
    }
  }
`

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

export default graphql(createUser, {name: 'createUser'})(
  graphql(userQuery, { options: { forceFetch: true }})(
    graphql(signinUser, {name: 'signinUser'})(
      withRouter(CreateUser))
    )
)