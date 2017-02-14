/**
 * Component that lists all Posts
 */
import React from 'react'
// import { Link } from 'react-router'

class Footer extends React.Component {


  render () {
    return (
        <footer className='bg-center cover w-100 pa3 ph5-ns bg-dark-green-90 sans-serif ferns'>
            
            <div className='db dt-ns mw9 center w-100'>
                <h4 className="f2 lh-copy">
                <span className="bg-black-90 lh-copy white pa1 tracked-tight">
                    <a className="link silver hover-white dib h2 w2 mr3" href="https://facebook.com/farnboroughguide"><p className="pa3">f</p></a>
                </span>
                </h4>
            </div>
        </footer> 
    )
  }
}

export default Footer
