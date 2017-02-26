/**
 * Component that lists all Posts
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router'

class PhotoPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object
  }

  render () {
    const outputUrl = "http://placehold.it/400x400";
    var myText = this.props.params.id;
    return (
      <article>
        <div className="pa4 ph7-l georgia mw9-l center">
          <p className="f5 f3-ns lh-copy measure georgia">
            {myText} Photo pagecome to our Walks section where you can find a number of areas of Farnborough to explore through a series of interesting walks that you can follow. There is something for everyone here, whether you are new to the area and want to find the important things or whether you want to delve into the fascinating history of the town. You should find something that is up your street!
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

const photoQuery = gql`
  query Photo($id: ID!) {
    Photo(id: $id) {
      id
      imageUrl
    }
  }
`

const PhotoPageWithData = graphql(photoQuery)(PhotoPage)

export default PhotoPageWithData
