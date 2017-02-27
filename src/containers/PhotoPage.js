/**
 * Component that lists all Posts
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
// import { Link } from 'react-router'
import { withRouter } from 'react-router'

class PhotoPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Photo: React.PropTypes.object,
    }).isRequired,
    params: React.PropTypes.object.isRequired
  }

  render () {
    // const outputUrl = "http://placehold.it/400x400";
    var myText = this.props.params.id;

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

     if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    // const Photo = this.props.data.Photo

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


const PhotoQuery = gql`query PhotoQuery($id: ID!) {
    Photo(id: $id) {
      id
      imageUrl
    }
  }
`

const PhotoPageWithData = graphql(PhotoQuery,{
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.id
    }
  })
})(withRouter(PhotoPage))

// Nilan suggests....

// const PhotoQuery = gqlquery PhotoQuery($id: ID!) { Photo(id: $id) { id file { url } } }
// const PhotoComponentWithData = graphql(PhotoQuery, {
// options: (ownProps) => ({
// variables: {
// id: ownProps.params.id
// }
// })
// }
// )(withRouter(Photo))

export default PhotoPageWithData
