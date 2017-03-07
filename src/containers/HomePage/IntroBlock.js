import React from 'react'
import { 
  Link 
} from 'react-router'

class IntroBlock extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }
  
  render () {
    
    return (
      <div className="db dt-ns mw9 center">
        <div className="fl-m fl-l w-33-m w-33-l">
          <div className="pa4 pa4-m">
          <h3 className="f3">Welcome</h3>
            <p className="mid-gray f4 lh-copy">
              Farnborough Guide is a new service that aims to help businesses promote themselves to local residents and other businesses alike. The site will also help people find out about interesting services, events, places, activities and a whole lot more.
            </p> 
          </div>
        </div>
        <div className="fl-m fl-l w-33-m w-33-l">
          <div className="pa4 pa4-m">
    <h3 className="f3">2) We are seeking photos</h3>
            <p className="mid-gray f4 lh-copy measure-narrow">
              We are launching the site early by introducing our local photography campaign. We invite everyone to share their photgraphs of the town here on Farnborough Guide. We are especially interested in businesses around the town whom wish to share photographs of what they do, what they sell. help spread the word.
            </p>
          </div>
        </div>
        <div className="fl-m fl-l w-33-m w-33-l br b--light-gray">
          <div className="pa4 pa4-m">
    <h3 className="f3">1) Sign-up</h3>
            <p className="mid-gray f3 lh-copy measure-narrow">
              So you have some photos to share with everyone in the town? What are you waiting for? Once registered you may upload new images via our photos page!
            </p>
            { /* Dan, I have created a function that returns the appropriate button at this stage */}
            {this._renderButton()}
          </div>
        </div> 
      </div>
    )    
  }

  // Dan, If not logged in show the Register button, otherwise show the view all photos button
  _renderButton() {
    if ( !this.props.data.user ) {
      return <Link className="f3 fw4 hover-red no-underline black-70 dib pv2 ph3 ba" to="/signup" >Register Now!</Link>
    } else {
      return <Link className="f3 fw4 hover-red no-underline black-70 dib pv2 ph3 ba" to="/Photo" >View all photos</Link> 
    }
  }
}

export default IntroBlock
