/**
 * Single Photo item
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router'

class Photo extends React.Component {

  static propTypes = {
    photo: React.PropTypes.object,
    mutate: React.PropTypes.func,
    refresh: React.PropTypes.func,
  }

  // http://res.cloudinary.com/dqpknoetx/image/upload/v1489441520/odtitxnfqdjzfygvuvls.jpg

  render () {
    let outputUrl = '';
    
    if(this.props.photo.publicId === null) {
      outputUrl = this.props.photo.imageUrl;
    } else {
      outputUrl = 'http://res.cloudinary.com/dqpknoetx/image/upload/c_scale,w_640/v1489441520/' + this.props.photo.publicId;
    }

    var photo = this.props.photo.id;
    const linkTo = '/photos/view/' + photo;
    return (
      <article className='fl w-50 w-25-m w-20-l pa2'>
        <div className='aspect-ratio aspect-ratio--1x1'>
          <Link className='ph2 ph0-ns pb3 link db' to={linkTo}>
            <img style={{ backgroundImage: `url(${outputUrl})` }} className='db bg-center cover aspect-ratio--object' role='presentation' 
            />
            </Link>  
        </div>
        {/*<span onClick={this.handleDelete}>Delete</span>*/}
      </article>
    )
  }

  handleDelete = () => {
    this.props.mutate({variables: {id: this.props.photo.id}})
      .then(this.props.refresh)
  }
}

const deleteMutation = gql`
  mutation deletePhoto($id: ID!) {
    deletePhoto(id: $id) {
      id
    }
  }
`

const PhotoWithMutation = graphql(deleteMutation)(Photo)

export default PhotoWithMutation
