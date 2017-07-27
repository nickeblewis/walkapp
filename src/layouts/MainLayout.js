import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
// import Nav from '../components/Nav'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router'
import gql from 'graphql-tag'

class MainLayout extends React.Component {
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
          <Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/places" >Places</Link> 
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
          <Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/places" >Places</Link> 
          <Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/events" >Events</Link> 
          {/*<Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/contacts" >Search</Link> */}
          
                    <span onClick={this._showLogin} className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba">Login</span> 
                    <span onClick={this._showSignup} className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba">Sign Up</span> 
        </nav>
      </header>
    )
  }
  render () {
    let nav = null;

    if (this._isLoggedIn()) {
      nav =  this.renderLoggedIn();
    } else {
      nav =  this.renderLoggedOut();
    }

    return (
        <main>          
          {nav}
          <Header />
          {this.props.children}
          <Footer />        
        </main>
    )
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

export default graphql(userQuery, { options: {forceFetch: true }})(withRouter(MainLayout))