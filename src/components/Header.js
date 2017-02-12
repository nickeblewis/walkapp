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
        <header className='bg-center cover w-100 pa3 ph5-ns bg-dark-green-90 sans-serif ferns'>
            
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
