/**
 * Single Photo item
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Thumbnail, Col, Button } from 'react-bootstrap'
class Photo extends React.Component {

  static propTypes = {
    photo: React.PropTypes.object,
    mutate: React.PropTypes.func,
    refresh: React.PropTypes.func,
  }

  render () {
    return (
      <Col xs={6} md={4}>
        <Thumbnail src={this.props.photo.imageUrl} alt="242x200">
          <h3>{this.props.photo.name}</h3>
          <p>{this.props.photo.description}</p>
          <p>
            <Button bsStyle="primary">Button</Button>&nbsp;
            <Button bsStyle="default">Button</Button>
            <span className='red f6 pointer dim' onClick={this.handleDelete}>Delete</span>
          </p>
        </Thumbnail>
      </Col>
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
