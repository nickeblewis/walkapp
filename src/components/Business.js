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
      <article className='fl pv2 w-100 w-third-l pr4-l'>
        <Link className='ph2 ph0-ns pb3 link db' to='/'>
          <h2 className='f5 f4-ns fw6 mb0'>{this.props.business.businessName}</h2>
          <p className='f6 f5-ns measure lh-copy mt0'>{this.props.business.contactName}</p>
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
