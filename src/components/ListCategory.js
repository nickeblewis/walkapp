import React from 'react'
import { Link } from 'react-router'
import Category from '../components/Category'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListCategory extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div className='w-100 flex justify-center'>
        <Link to='/createcategory' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New Category
        </Link>
        <div className='w-100' style={{ maxWidth: 400 }}>
          {this.props.data.allCategories.map((category) =>
            <Category key={category.id} category={category} refresh={() => this.props.data.refetch()} />
          )}
        </div>
      </div>
    )
  }
}

const FeedQuery = gql`query allCategories {
  allCategories(orderBy: createdAt_DESC) {
    id
    name
  }
}`

const ListCategoryWithData = graphql(FeedQuery)(ListCategory)

export default ListCategoryWithData
