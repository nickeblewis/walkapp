import React from 'react'
import styled from 'styled-components'

import HeroSection from '../../components/about/HeroSection'

import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

class AboutPage extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,    
    data: React.PropTypes.object,
  }

  render () {
    return (
        <Wrapper>
            <HeroSection />
            <article className="fg">
                <div>Hello mate</div>        
            </article>
        </Wrapper>
    )
  }
}

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(userQuery, { options: { forceFetch: true }} )(withRouter(AboutPage))