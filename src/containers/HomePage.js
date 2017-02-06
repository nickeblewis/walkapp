/**
 * Component that lists all Posts
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class HomePage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    return (
       <article>
          <header className='bg-gold sans-serif'>
            <nav className="dt w-100 mw8 center"> 
              
              <div className="dtc v-mid tr pa3">
                <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Events</a> 
                <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Walks</a> 
                <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >Media</a> 
                <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >Contacts</a> 
                <a className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" href="/" >Sign Up</a> 
              </div>
            </nav>
            <div className='mw9 center pa4 pt5-ns ph7-l'>
              <time className="f6 mb2 dib ttu tracked"><small>06 February, 2017</small></time>
              <h3 className="f2 f1-m f-headline-l measure-narrow lh-title mv0">
                <span className="bg-black-90 lh-copy white pa1 tracked-tight">
                  Farnborough Guide
                </span>
              </h3>
              <h4 className="f3 fw1 georgia i">The definitive guide to your town.</h4>
              <h5 className="f6 ttu tracked black-80">By Nick Lewis, Dan Davis &amp; Tina Lewis</h5>
            </div>
          </header>
          <div className="pa4 ph7-l georgia mw9-l center">
            <p className="f5 f3-ns lh-copy measure georgia">
              Theodore Sturgeon was a science fiction author, critic, and the basis for Kurt Vonnegut's recurring character Kilgore Trout. He was prolific, authoring over 200 pieces himself and critiquing around 400 others.
            </p>
            <p className="f5 f3-ns lh-copy measure georgia">
              In 1958 he published a piece in Venture proclaiming what he called "Sturgeon's Revelation"
            </p>
            <p className="f6 f5-ns lh-copy measure i pl4 bl bw1 b--gold mb4">
              I repeat Sturgeon's Revelation, which was wrung out of me after twenty years of wearying defense of science fiction against attacks of people who used the worst examples of the field for ammunition, and whose conclusion was that ninety percent of SF is crud. Using the same standards that categorize 90% of science fiction as trash, crud, or crap, it can be argued that 90% of film, literature, consumer goods, etc. is crap. In other words, the claim (or fact) that 90% of science fiction is crap is ultimately uninformative, because science fiction conforms to the same trends of quality as all other artforms.
            </p>
            <p className="f5 f4-ns lh-copy measure mb4">
              You don't have to bounce a tennis ball very far in San Francisco before it will hit two developers complaining about how many js tools/frameworks there are for development in 2015 and how much unneccessary complexity they add. Doing a search on twitter for 'too many js tools' or 'yet another js framework' returns... a lot of people lamenting the current state of affairs.
            </p>
            <p className="f5 f4-ns lh-copy measure">
              This is most likely, the wrong conversation for us as a community, to be having. The presence of bad tools - shouldn't discourage us from wanting more tools or frameworks. There are more books published in a single day than I will ever be able to read in my lifetime. But this does not make me sad. Or overwhelm me. Mostly I think about how excited I am to read the best books that are being published. And this is where we should push the conversation. How do we build better tools? What does that look like?
            </p>
          </div>
          
        </article>
    )
  }
}

const FeedQuery = gql`query allPosts {
  allPosts(orderBy: createdAt_DESC) {
    id
    imageUrl
    description
  }
}`

const HomePageWithData = graphql(FeedQuery)(HomePage)

export default HomePageWithData
