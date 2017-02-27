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
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
  }

  
  render () {
    // const outputUrl = "http://placehold.it/400x400";
    // var myText = this.props.params.id;

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

     if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    console.log(this.props.data.Photo.imageUrl)
    // const Photo = this.props.data.Photo

    return (
        <article>
            <div className="pa4 ph7-l georgia mw9-l center">
                <img src={this.props.data.Photo.imageUrl} alt={this.props.data.Photo.name} />
                <h3 className="f3">{this.props.data.Photo.name} </h3>
                <p className="mid-gray f3 lh-copy">
                    {this.props.data.Photo.description}
                </p>
            </div>
        </article>
    )
  }
}


const PhotoQuery = gql`
query PhotoQuery($id: ID!) {
    Photo(id: $id) {
      id
      imageUrl
      name
      description
    }
  }
`

const PhotoPageWithQuery = graphql(PhotoQuery,{
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

export default PhotoPageWithQuery
