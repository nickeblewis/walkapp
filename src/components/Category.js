/**
 * Component that displays one category item
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Category extends React.Component {

  static propTypes = {
    category: React.PropTypes.object,
    mutate: React.PropTypes.func,
    refresh: React.PropTypes.func,
  }

  render () {
    return (
      <div className='pa3 bg-black-05 ma3'>
        <div
          className='w-100'
          style={{
            backgroundSize: 'cover',
            paddingBottom: '10%',
          }}
        />
        <div className='pt3'>
          {this.props.category.name}&nbsp;
          <span className='red f6 pointer dim' onClick={this.handleDelete}>Delete</span>
        </div>
      </div>
    )
  }

  handleDelete = () => {
    this.props.mutate({variables: {id: this.props.category.id}})
      .then(this.props.refresh)
  }
}

const deleteMutation = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

const CategoryWithMutation = graphql(deleteMutation)(Category)

export default CategoryWithMutation
