/**
 * Single Post item
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid, Thumbnail, Col, Row, Button, Jumbotron } from 'react-bootstrap'
class Post extends React.Component {

  static propTypes = {
    post: React.PropTypes.object,
    mutate: React.PropTypes.func,
    refresh: React.PropTypes.func,
  }

  render () {
    return (
      
      <Col xs={6} md={4}>
        <Thumbnail src={this.props.post.imageUrl} alt="242x200">
          <h3>Thumbnail label</h3>
          <p>{this.props.post.description}</p>
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
    this.props.mutate({variables: {id: this.props.post.id}})
      .then(this.props.refresh)
  }
}

const deleteMutation = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

const PostWithMutation = graphql(deleteMutation)(Post)

export default PostWithMutation
