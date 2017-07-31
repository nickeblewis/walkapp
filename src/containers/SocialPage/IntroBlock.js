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
          <h3 className="f3">Facebook</h3>
            <img src={facebook_logo}/>
            <p className="mid-gray f4 lh-copy">            
               
            </p> 
          </div>
        </div>
        <div className="fl-m fl-l w-50-m w-50-l">
          <div className="pa4 pa4-m">
            <h3 className="f3">Instagram</h3>
            <div clasaName="size">
              <img src={instagram_logo}/>
            </div>
            <p className="mid-gray f4 lh-copy measure-narrow">

            </p>
          </div>
        </div>
        <div className="fl-m fl-l w-50-m w-50-l">
          <div className="pa4 pa4-m">
            <h3 className="f3">Snapchat</h3>
              <img src={snapchat_logo}/>
            <p className="mid-gray f4 lh-copy measure-narrow">

            </p>
          </div>
        </div>
        <div className="fl-m fl-l w-50-m w-50-l br b--light-gray">
          <div className="pa4 pa4-m">
            <h3 className="f3">Twitter</h3>
              <img src={twitter_logo}/>
            <p className="mid-gray f4 lh-copy measure-narrow">

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
