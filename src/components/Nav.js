/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'


class Nav extends React.Component {

    static propTypes = {
    router: React.PropTypes.object.isRequired,
    data: React.PropTypes.object,
  }

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('graphcoolToken')
    location.reload()
    // this.props.router.push('/')
  }

  _showLogin = () => {
    this.props.router.push('/login')
  }

  _showSignup = () => {
    this.props.router.push('/signup')
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

  renderLoggedIn() {
    return (
      <header className="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
        <nav className="f6 fw6 ttu tracked">
          <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/" >Home</Link> 
          {/*<Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/events" >Events</Link> */}
          {/*<Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/walks" >Walks</Link> */}
          <Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/photos" >Photos</Link> 
          {/*<Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/contacts" >Search</Link> */}
          <span className="f6 fw4 hover-white no-underline white-50 dn dib-l pv2 ph3">
          Logged in as {this.props.data.user.name}
        </span>
          <span onClick={this._logout} className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba">Logout</span> 
                    
        </nav>
      </header>
    )
  }

  renderLoggedOut() {
    return (
<header className="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
        <nav className="f6 fw6 ttu tracked">
          <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/" >Home</Link> 
          {/*<Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/events" >Events</Link> */}
          {/*<Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/walks" >Walks</Link> */}
          <Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/photos" >Photos</Link> 
          {/*<Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/contacts" >Search</Link> */}
          
                    <span onClick={this._showLogin} className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba">Login</span> 
                    <span onClick={this._showSignup} className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba">Sign Up</span> 
        </nav>
      </header>
    )
  }

  render () {
    // const headerImg = '../assets/iStock-504241498.jpg';
    // const headerImg = 'http://mrmrs.io/photos/u/011.jpg'; //./iStock-504241498.jpg';
    if (this._isLoggedIn()) {
      return this.renderLoggedIn()
    } else {
      return this.renderLoggedOut()
    }
  }
}

const userQuery = gql`
  query {
    user {
      id
      name
    }
  }
`

export default graphql(userQuery, { options: {forceFetch: true }})(withRouter(Nav))