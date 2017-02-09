/**
 * Single Photo item
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router'

class Business extends React.Component {

  static propTypes = {
    business: React.PropTypes.object,
    mutate: React.PropTypes.func,
    refresh: React.PropTypes.func,
  }

  render () {

    return (
      <article className='fl w-100 w-50-m  w-25-ns pa2-ns'>
        <Link className='ph2 ph0-ns pb3 link db' to='/'>
          <h3 className='f5 f4-ns mb0 black-90'>{this.props.business.businessName}</h3>
          <h3 className='f6 f5 fw4 mt2 black-60'>{this.props.business.contactName}</h3>
        </Link>
      </article>
    )
  }

  handleDelete = () => {
    this.props.mutate({variables: {id: this.props.business.id}})
      .then(this.props.refresh)
  }
}

const deleteMutation = gql`
  mutation deleteBusiness($id: ID!) {
    deleteBusiness(id: $id) {
      id
    }
  }
`

const BusinessWithMutation = graphql(deleteMutation)(Business)

export default BusinessWithMutation
