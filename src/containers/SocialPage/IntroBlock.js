import React from 'react'
import { Link } from 'react-router'
import instagram_logo from '../../assets/instagram_logo.png'
import facebook_logo from '../../assets/facebook_logo.png'
import snapchat_logo from '../../assets/snapchat_logo.png'
import twitter_logo from '../../assets/twitter_logo.png'

class IntroBlock extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }
  
  render () {

    return (
      <div className="db dt-ns mw9 center">
        <div className="fl-m fl-l w-50-m w-50-l">
          <div className="pa4 pa4-m">
          <h2 className="f2">Facebook</h2>
            <img className="logo" src={facebook_logo}/>
            <p className="mid-gray f4 lh-copy">            
              Follow us to get the latest news @farnboroughguide
            </p> 
          </div>
        </div>
        <div className="fl-m fl-l w-50-m w-50-l">
          <div className="pa4 pa4-m">
            <h2 className="f2">Instagram</h2>
            <div clasaName="size">
              <img className="logo" src={instagram_logo}/>
            </div>
            <p className="mid-gray f4 lh-copy measure-narrow">
              See some pictures of farnborough @farnboroughguide
            </p>
          </div>
        </div>
        <div className="fl-m fl-l w-50-m w-50-l">
          <div className="pa4 pa4-m">
            <h2 className="f2">Snapchat</h2>
              <img className="logo" src={snapchat_logo}/>
            <p className="mid-gray f4 lh-copy measure-narrow">
              Keep up-to-date with the latest news @fguide
            </p>
          </div>
        </div>
        <div className="fl-m fl-l w-50-m w-50-l br b--light-gray">
          <div className="pa4 pa4-m">
            <h2 className="f2">Twitter</h2>
              <img className="logo" src={twitter_logo}/>
            <p className="mid-gray f4 lh-copy measure-narrow">
              Give us a follow! @fboroguide
            </p>
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

  _showText() {
    if ( !this.props.data.user ) {
      return <h3 className="f3">1. Sign-up</h3>
    } else {
      return <h3 className="f3">2. Add photos</h3>
    }
  }
}

export default IntroBlock
