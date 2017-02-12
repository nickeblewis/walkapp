/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'

class Header extends React.Component {


  render () {
    const headerImg = '../assets/iStock-504241498.jpg';
    // const headerImg = 'http://mrmrs.io/photos/u/011.jpg'; //./iStock-504241498.jpg';
    return (
        <header className='bg-center cover w-100 pa3 ph5-ns bg-dark-green sans-serif ferns'>
            <nav className="dt w-100 mw8 center">                 
                <div className="dtc v-mid tr pa3 bg-black">
                    <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/" >Home</Link> 
                    <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/events" >Events</Link> 
                    <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" to="/walks" >Walks</Link> 
                    <Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/photos" >Photos</Link> 
                    <Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" to="/contacts" >Contacts</Link> 
                    <Link className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" to="/register" >Sign Up</Link> 
                </div>
            </nav>
            <div className='db dt-ns mw9 center w-100'>
                <h3 className="f2 f1-m f-headline-l measure-narrow lh-title mv0">
                <span className="bg-black-90 lh-copy white pa1 tracked-tight">
                    Farnborough Guide
                </span>
                </h3>
                <h4 className="f2 lh-copy">
                <span className="bg-black-90 lh-copy white pa1 i tracked-tight">
                    The definitive guide to your town.
                </span>
                </h4>
                
            </div>
        </header> 
    )
  }
}

export default Header
