/**
 * Send a message to the contact@farnboroughguide.com address
 */
import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
  
class MessagePage extends React.Component {
  constructor(props) {
    super(props);

    // Default our state - We shall discuss the difference between props and state at some point
    this.state = {
      subject: null,
      fromName: null,
      toName: 'Farnborough Guide',
      fromEmail: null,
      toEmail: 'contact@farnboroughguide.com',
      body: null
      };
    }

  
    
  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object,
  }

  state = {
    subject: '',
    fromName: '',
    toName: 'Farnborough Guide',
    fromEmail: '',
    toEmail: 'contact@farnboroughguide.com',
    body: ''
  }

  render () {
  

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.subject}
            placeholder='Subject'
            onChange={(e) => this.setState({subject: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.fromName}
            placeholder='From Name'
            onChange={(e) => this.setState({fromName: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.fromEmail}
            placeholder='Your Email'
            onChange={(e) => this.setState({fromEmail: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.body}
            placeholder='Your Message'
            onChange={(e) => this.setState({body: e.target.value})}
          />
          {this.state.fromName && this.state.fromEmail && this.state.subject && this.state.body &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handleMsg}>Post</button>
          }
        </div>
      </div>
    )
  }

  handleMsg = () => {
    const {subject, body, fromName, toName, fromEmail, toEmail} = this.state
    this.props.mutate({variables: {subject, body, fromName, toName, fromEmail, toEmail }})
      .then(() => {
        this.props.router.push('/thankyou')
      })
  }
}

const createMessage = gql`
  mutation ($subject: String!, $body: String!, $fromName: String!, $toName: String!, $fromEmail: String!, $toEmail: String!) {
    createMessage(subject: $subject, body: $body, fromName: $fromName, toName: $toName, fromEmail: $fromEmail, toEmail: $toEmail ) {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createMessage)(
  graphql(userQuery, { options: { forceFetch: true }} )(withRouter(MessagePage))
)