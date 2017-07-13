/**
 * Component that lists all Posts
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
// import { Link } from 'react-router'
import { withRouter } from 'react-router'

class PlacePage extends React.Component {

  static propTypes = {
    data: React.PropTypes.shape({
      loading: React.PropTypes.bool,
      error: React.PropTypes.object,
      Place: React.PropTypes.object,
    }).isRequired,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
  }

  
  render () {
    // const outputUrl = "http://placehold.it/400x400";
    // var myText = this.props.params.id;
    // console.log(this.props.data.Place)
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
        <article>
            <div className="pa4 ph7-l georgia mw9-l center">
                {/*{ this.props.data.Place.publicId ? 
                  <img src={`http://res.cloudinary.com/dqpknoetx/image/upload/c_scale,w_1200/v1489441520/${this.props.data.Place.publicId}`} alt={this.props.data.Place.name} />  :*/}
                  <img src={this.props.data.Place.banner} alt={this.props.data.Place.name} /> 
                {/*}*/}
                <h3 className="f3">{this.props.data.Place.title} </h3>
                <p className="mid-gray f3 lh-copy">
                    {this.props.data.Place.description}
                    {this.props.data.Place.publicId}
                </p>
            </div>
        </article>
    )
  }
}


const PlaceQuery = gql`
query PlaceQuery($id: String!) {
    Place(slug: $id) {
      id
      title
      description
      banner
    }
  }
`

const PlacePageWithQuery = graphql(PlaceQuery,{
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.id
    }
  })
})(withRouter(PlacePage))

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

export default PlacePageWithQuery

// {
//   "data": {
//     "allPlaces": [
//       {
//         "latitude": 51.28713483634396,
//         "headerPhoto": null,
//         "slug": "the-village-hotel",
//         "longitude": -0.7598671620375594,
//         "banner": "http://res.cloudinary.com/dqpknoetx/image/upload/v1491500559/yijqgts36gsa7sdstjly.jpg",
//         "id": "cj16oyl2mlp620162tqwi4ffe",
//         "createdAt": "2017-04-06T17:43:41.000Z",
//         "title": "The Village Hotel",
//         "summary": "Todo add full details later "
//       }
//     ]
//   }
// }