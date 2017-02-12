/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'

class Nav extends React.Component {


  render () {
    // const headerImg = '../assets/iStock-504241498.jpg';
    // const headerImg = 'http://mrmrs.io/photos/u/011.jpg'; //./iStock-504241498.jpg';
    return (
        <header className="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
  <nav className="f6 fw6 ttu tracked">
    <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/" >Home</Link> 
                    <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/events" >Events</Link> 
                    <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/walks" >Walks</Link> 
                    <Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/photos" >Photos</Link> 
                    <Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/contacts" >Directory</Link> 
                    <Link className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" to="/register" >Sign Up</Link> 
                    <Link className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" to="/login" >Login</Link> 
  </nav>
</header>
    )
  }
}

export default Nav
