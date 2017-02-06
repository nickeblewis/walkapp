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

  render () {
    const outputUrl = this.props.photo.imageUrl;

    return (
      <article className='fl w-100 w-50-m  w-25-ns pa2-ns'>
        <div className='aspect-ratio aspect-ratio--1x1'>
          <img style={{ backgroundImage: `url(${outputUrl})` }} className='db bg-center cover aspect-ratio--object' role='presentation' />  
        </div>
        <Link className='ph2 ph0-ns pb3 link db' to='/'>
          <h3 className='f5 f4-ns mb0 black-90'>{this.props.photo.name}</h3>
          <h3 className='f6 f5 mt2 black-60'>{this.props.photo.description}</h3>
        </Link>
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
