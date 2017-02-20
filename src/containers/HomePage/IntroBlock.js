// Always import React at the beginning of every React Component
// Everything is a component in React!
import React from 'react'
import { Link } from 'react-router'

// https://ponyfoo.com/articles/es6-classes-in-depth describes classes really well
class IntroBlock extends React.Component {

  // This component is the child of another and we can pass properties down the chain from a parent 
  // to its child components (children)
  // in this case we are defining data as being a mandatory property which this component can't run without
  static propTypes = {
    data: React.PropTypes.object,
  }

  // The following function is responsible for rendering to the browser
  render () {


    // Now for the JSX template that defines how our component actually looks!
    return (
      <div className="db dt-ns mw9 center w-100">
        <div className="fl-m fl-l w-50-m w-50-l br b--light-gray">
          <div className="pa3 pa4-m">
            <h3 className="f3">Welcome</h3>
            <p className="mid-gray f3 lh-copy measure-narrow">
              Farnborough Guide is a new service that aims to help businesses promote themselves to local residents and other businesses alike. The site will also help people find out about interesting services, events, places, activities and a whole lot more.
            </p>
            <p className="mid-gray f4 lh-copy measure-narrow">
              We are launching the site early by introducing our local photography campaign. We invite everyone to share their photgraphs of the town here on Farnborough Guide. We are especially interested in businesses around the town whom wish to share photographs of what they do, what they sell. help spread the word.
            </p>
          </div>
        </div>
        <div className="fl-m fl-l w-50-m w-50-l">
          <div className="pa3 pa4-m">
            <h3 className="f3">Sign-up</h3>
            <p className="mid-gray f3 lh-copy measure-narrow">
              So you have some photos to share with everyone in the town? What are you waiting for? Once registered you may upload new images via our photos page!
            </p>
            <Link className="f3 fw4 hover-red no-underline black-70 dib pv2 ph3 ba" to="/signup" >Register Now!</Link> 
          </div>
        </div>
      </div>
    )
  }
}

export default IntroBlock
