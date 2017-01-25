/**
 * Component for category creation
 */
import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateCategory extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,
    addName: React.PropTypes.func,
  }

  state = {
    name: '',
  }

  render () {
    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          {this.state.name &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handleCategory}>Category</button>
          }
        </div>
      </div>
    )
  }

  handleCategory = () => {
    const {name} = this.state
    this.props.addCategory({ name })
      .then(() => {
        this.props.router.push('/categories')
      })
  }
}

const addMutation = gql`
  mutation addCategory($name: String!) {
    createCategory(name: $name) {
      id
      name
    }
  }
`

const CategoryWithMutation = graphql(addMutation, {
  props: ({ ownProps, mutate }) => ({
    addCategory: ({ name }) =>
      mutate({
        variables: { name },
        updateQueries: {
          allCategories: (state, { mutationResult }) => {
            const newCategory = mutationResult.data.createCategory
            return {
              allCategories: [...state.allCategories, newCategory]
            }
          },
        },
      })
  })
})(withRouter(CreateCategory))

export default CategoryWithMutation