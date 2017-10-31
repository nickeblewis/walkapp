/**
 * Component that lists all Posts
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
// import { Link } from 'react-router'
import { withRouter } from 'react-router'
import { CloudinaryContext, Transformation, Image } from'cloudinary-react'

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
    // console.log(this.props.data.Photo)
    // let outputUrl = '';
    
    // if(this.props.data.Photo.publicId === null) {
    //   outputUrl = this.props.data.Photo.imageUrl;
    // } else {
    //   outputUrl = 'http://res.cloudinary.com/dqpknoetx/image/upload/c_scale,w_1200/v1489441520/' + this.props.data.Photo.publicId;
    // }

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

     if (this.props.data.error) {
      console.log(this.props.data.error)
      return (<div>An unexpected error occurred</div>)
    }

    // const Photo = this.props.data.Photo

    return (
        <article className="avenir">
            <div className="pa4 ph7-l mw9-l center">
                <CloudinaryContext cloudName="dqpknoetx">
            <Image publicId={this.props.data.Photo.publicId}>
              <Transformation width="800" crop="scale" />
            </Image>
            </CloudinaryContext>
                <h4 className="f1 ttu tracked-tight mt0">{this.props.data.Photo.name} </h4>
                <p className="f4 mid-gray lh-copy">
                    {this.props.data.Photo.description}
                    {/* {this.props.data.Photo.publicId} */}
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
      publicId
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
