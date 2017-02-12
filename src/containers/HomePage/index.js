/**
 * HomePage Component
 */

// Always import React at the beginning of every React Component
// Everything is a component in React!
import React from 'react'
import PhotoSection from './PhotoSection'
import BusinessSection from './BusinessSection'

// https://ponyfoo.com/articles/es6-classes-in-depth describes classes really well
class HomePage extends React.Component {

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
      <article>
        <BusinessSection title="Featured" />
        <PhotoSection title="Newest Photos" />
      </article>
    )
  }
}

export default HomePage
