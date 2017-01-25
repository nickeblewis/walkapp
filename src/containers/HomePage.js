/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class HomePage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    return (
      <div className="bg-green white-90 pa4">
        <div className='w-100 flex justify-center'>
          <div className="ba pa2 br4 bw1 bg-black-60 b--solid fixed">
            <h2 className="i f4 tl">Demo Site</h2>
          </div>
          <div className="ba pa2 bw1 bg-black-80 b--solid tr">
            <Link src="file:///C:/Users/Dan%20Davis%20(Work)/demo/demo/Contact%20Page.html" className="link dim light-silver">Contact</Link>
          </div>
          <h1 className="f1 tc underline">Walks</h1>
          <p className="underline f3 b">Select Your Difficulty:</p>
          <div className="ba bw2 b--solid pa1 tc br4">
              <p>Easy</p>
          </div>        
          <div className=" fw4 ba bw2 b--solid pa1 tc br4">
              <p>Medium</p>
          </div>
          <div className="ba bw2 b--solid pa1 tc br4">
            <p>Hard</p>
          </div>
        </div>
      </div>
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
