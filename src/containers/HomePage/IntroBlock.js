// Always import React at the beginning of every React Component
// Everything is a component in React!
import React from 'react'

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
      <div className="cf">
        <div className="fl-m fl-l w-50-m w-50-l br b--light-gray">
          <div className="pa3 pa4-m pa5-l">
            <h3 className="f3">Businesses</h3>
            <p className="mid-gray f3 lh-copy measure-narrow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut iaculis mi. In facilisis risus ante, ac aliquet diam porttitor vitae. Sed libero diam, cursus a augue eget, molestie dignissim metus
            </p>
          </div>
        </div>
        <div className="fl-m fl-l w-50-m w-50-l">
          <div className="pa3 pa4-m pa5-l">
            <h3 className="f3">Events</h3>
            <p className="mid-gray f3 lh-copy measure-narrow">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut iaculis mi. In facilisis risus ante, ac aliquet diam porttitor vitae. Sed libero diam, cursus a augue eget, molestie dignissim metus
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default IntroBlock
