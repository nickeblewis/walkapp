import React from 'react'
import {
  Link
} from 'react-router'

class IntroBlock extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render() {

    return (
      <section className="homepage-introblock">
        <div className="container">
          <div className="columns">
            <div className="column is-primary">
              <h2 className="title">What's in the name?</h2>
              <div className="content is-large">
                <p>
                  Farnborough was mentioned in the domesday book of 1086, a Saxon settlement. The name Farnborough is derived from "Ferneberga" believed to mean "Fern Hill". There are many links to this ancient name across the town.
                </p>
              </div>
            </div>
            <div className="column">
              <h2 className="title">Aircraft and Aviation</h2>
              <div className="content is-large">
                <p>
                  Over the years Farnborough has played a major role in the British aviation industry and is linked with three particular milestones in the history of the industry that has ultimately led to faster travel across the globe.
                </p>
              </div>
            </div>
            <div className="column">
              <h2 className="title">The Future...</h2>
              <div className="content is-large">
                <p>
                  Farnborough is a town that has always been in a state of transition mainly due to the aviation and related industry here, so it is no surprise that it continues to be attractive to investors in business and property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Dan, If not logged in show the Register button, otherwise show the view all photos button
  _renderButton() {
    if (!this.props.data.user) {
      return <Link className="f3 fw4 hover-red no-underline black-70 dib pv2 ph3 ba" to="/signup" >Register Now!</Link>
    } else {
      return <Link className="f3 fw4 hover-red no-underline black-70 dib pv2 ph3 ba" to="/Photo" >View all photos</Link>
    }
  }

  _showText() {
    if (!this.props.data.user) {
      return <h3 className="f3">1. Sign-up</h3>
    } else {
      return <h3 className="f3">2. Add photos</h3>
    }
  }
}

export default IntroBlock
