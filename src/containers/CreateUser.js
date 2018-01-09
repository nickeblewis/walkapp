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

  render() {
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
      <h1 className="title">Membership Pricing</h1>
        <div className="pricing-table">
          <div className="pricing-plan">
            <div className="plan-header">Starter</div>
            <div className="plan-price"><span className="plan-price-amount"><span className="plan-price-currency">£</span>20</span>/month</div>
            <div className="plan-items">
              <div className="plan-item">10 queued articles at any one time</div>
              <div className="plan-item">Distribute across both our own social media network</div>
              <div className="plan-item">plus 2 of your own social media channels</div>
            </div>
            <div className="plan-footer">
              <button className="button is-fullwidth" disabled="disabled">Default plan</button>
            </div>
          </div>

          <div className="pricing-plan is-warning">
            <div className="plan-header">Gold</div>
            <div className="plan-price"><span className="plan-price-amount"><span className="plan-price-currency">£</span>40</span>/month</div>
            <div className="plan-items">
              <div className="plan-item">50 queued articles at any one time</div>
              <div className="plan-item">Distribute across both our own social media network</div>
              <div className="plan-item">plus 10 of your own social media channels</div>
            </div>
            <div className="plan-footer">
              <button className="button is-fullwidth">Choose</button>
            </div>
          </div>

          <div className="pricing-plan is-danger">
            <div className="plan-header">Platinum</div>
            <div className="plan-price"><span className="plan-price-amount"><span className="plan-price-currency">£</span>100</span>/month</div>
            <div className="plan-items">
              <div className="plan-item">100 queued articles at any one time</div>
              <div className="plan-item">Distribute across both our own social media network</div>
              <div className="plan-item">plus an UNLIMITED number of your own social media channels</div>

            </div>
            <div className="plan-footer">
              <button className="button is-fullwidth">Choose</button>
            </div>
          </div>
        </div>
        <div className="container">
          <h2 className="subtitle">Benefits of Signing Up!</h2>
          <div className="columns">
            <div className="column is-half has-text-left">
              <div className="content">
                <p>Rushmoor Life is a great point of reference to find information about a whole host of services, businesses and organisations across the area. We also generate automated social media campaigns via our growing network and then couple this with your very own social media outlets - We are able to promote every article that appears on this site which draws attention to your own cause and simultaneously promotes Rushmoor Life. Neat hey?</p>
                {/* <p>Please refer to any of the following pages for further information and answers to common questions:</p>
                <ul>
                  <li>Detailed informaion about our services</li>
                </ul> */}
              </div>
            </div>

            <div className="column is-half has-content-left">
              <div className="field">
                <div className="control">
                  <input className="input" type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input className="input" type="password" placeholder="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <input className="input" type="Name" placeholder="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="checkbox">
                    <input type="checkbox" onChange={(e) => this.setState({ emailSubscription: e.target.checked })} />
                    Subscribe to email notifications?
            </label>
                </div>
              </div>

              {/* {this.state.name && this.state.email && this.state.password &&
                <button className="button is-link" onClick={this.createUser}>Sign Up</button>} */}

              <button className="button is-link" onClick={this.createUser}>Sign Up</button>
            </div>
          </div>
        </div>
      </section>




    )
  }

  createUser = () => {
    const { email, password, name, emailSubscription } = this.state

    this.props.createUser({ variables: { email, password, name, emailSubscription } })
      .then((response) => {
        this.props.signinUser({ variables: { email, password } })
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

export default graphql(createUser, { name: 'createUser' })(
  graphql(userQuery, { options: { forceFetch: true } })(
    graphql(signinUser, { name: 'signinUser' })(
      withRouter(CreateUser))
  )
)