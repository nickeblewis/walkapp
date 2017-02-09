/**
 * Component that lists all Posts
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router'

class WalkPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    const outputUrl = "http://placehold.it/400x400";
    return (
      <article>
        <div className="pa4 ph7-l georgia mw9-l center">
          <p className="f5 f3-ns lh-copy measure georgia">
            Welcome Welcome to our Walks section where you can find a number of areas of Farnborough to explore through a series of interesting walks that you can follow. There is something for everyone here, whether you are new to the area and want to find the important things or whether you want to delve into the fascinating history of the town. You should find something that is up your street!
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
        <section className='cf w-100 pa2-ns'>
          <article className='fl w-100 w-50-m  w-25-ns pa2-ns'>
            <div className='aspect-ratio aspect-ratio--1x1'>
              <img style={{ backgroundImage: `url(${outputUrl})` }} className='db bg-center cover aspect-ratio--object' role='presentation' />  
            </div>
            <Link className='ph2 ph0-ns pb3 link db' to='/'>
              <h3 className='f5 f4-ns mb0 black-90'>Heading</h3>
              <h3 className='f6 f5 fw4 mt2 black-60'>This is the message</h3>
            </Link>
          </article>
          <article className='fl w-100 w-50-m  w-25-ns pa2-ns'>
            <div className='aspect-ratio aspect-ratio--1x1'>
              <img style={{ backgroundImage: `url(${outputUrl})` }} className='db bg-center cover aspect-ratio--object' role='presentation' />  
            </div>
            <Link className='ph2 ph0-ns pb3 link db' to='/'>
              <h3 className='f5 f4-ns mb0 black-90'>Heading</h3>
              <h3 className='f6 f5 fw4 mt2 black-60'>This is the message</h3>
            </Link>
          </article>
          <article className='fl w-100 w-50-m  w-25-ns pa2-ns'>
            <div className='aspect-ratio aspect-ratio--1x1'>
              <img style={{ backgroundImage: `url(${outputUrl})` }} className='db bg-center cover aspect-ratio--object' role='presentation' />  
            </div>
            <Link className='ph2 ph0-ns pb3 link db' to='/'>
              <h3 className='f5 f4-ns mb0 black-90'>Heading</h3>
              <h3 className='f6 f5 fw4 mt2 black-60'>This is the message</h3>
            </Link>
          </article>
          <article className='fl w-100 w-50-m  w-25-ns pa2-ns'>
            <div className='aspect-ratio aspect-ratio--1x1'>
              <img style={{ backgroundImage: `url(${outputUrl})` }} className='db bg-center cover aspect-ratio--object' role='presentation' />  
            </div>
            <Link className='ph2 ph0-ns pb3 link db' to='/'>
              <h3 className='f5 f4-ns mb0 black-90'>Heading</h3>
              <h3 className='f6 f5 fw4 mt2 black-60'>This is the message</h3>
            </Link>
          </article>
        </section>
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

const WalkPageWithData = graphql(FeedQuery)(WalkPage)

export default WalkPageWithData
