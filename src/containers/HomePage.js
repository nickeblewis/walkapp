/**
 * Component that lists all Posts
 */
import React from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Grid, Thumbnail, Col, Row, Button, Jumbotron } from 'react-bootstrap'

class HomePage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    return (
       <Grid>
        <Jumbotron>
          <h1>Farnborough Guide</h1>
          <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <p><Button bsStyle="primary">Learn more</Button></p>
        </Jumbotron>
        <Row>
          <Col xs={6} md={4}>
            <Thumbnail src="http://placehold.it/242x200" alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col xs={6} md={4}>
            <Thumbnail src="http://placehold.it/242x200" alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
          <Col xs={6} md={4}>
            <Thumbnail src="http://placehold.it/242x200" alt="242x200">
              <h3>Thumbnail label</h3>
              <p>Description</p>
              <p>
                <Button bsStyle="primary">Button</Button>&nbsp;
                <Button bsStyle="default">Button</Button>
              </p>
            </Thumbnail>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const FeedQuery = gql`query allPosts {
  allPosts(orderBy: createdAt_DESC) {
    id
    imageUrl
    description
  }
}`

const HomePageWithData = graphql(FeedQuery)(HomePage)

export default HomePageWithData
