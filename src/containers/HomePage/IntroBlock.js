import React from 'react'
import styled from 'styled-components';

import { rhythm } from '../../utils/typography';
import media from '../../css/media';

import BlockItem from '../../components/BlockItem';

import {
    Link
} from 'react-router'
// import BulletinItem from '../../components/BulletinItem';

const Wrapper = styled.section`
  display: flex;
  height: auto;
  padding: 50px 0;
  justify-content: center;
  background-color: ${props => props.theme.intro.backgrounds.wrapper};

  @media (${media.tablet}) {
    padding: 20px 0;
  }
`;

const Container = styled.div`
  display: flex;
  width: calc(1024px + ${rhythm(0.5)});
  height: 100%;
  margin: 0 ${rhythm(0.5)};
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  margin: ${rhythm(0.5)} 0;

  @media (${media.tablet}) {
    margin: 0;
    flex-wrap: wrap;
  }
`;

class NavJump extends React.Component {

    static propTypes = {
        data: React.PropTypes.object,
    }

    render() {
        console.log('introblock', this.props.data)
        return (
            <Wrapper>
                <Container>
                    <Row>
                        <BlockItem
                            bold={false}
                            title="Business"
                            subTitle="Business listings cost just £100 per year and bring many benefits such as automated promotion via social media each time you submit a 'bulletin'."
                        />
                        <BlockItem
                            bold={false}
                            title="Bulletins"
                            subTitle="We are creating a modern day 'bulletin board' for the future web which you can search and that is always up-to-date!"
                        />
                        <BlockItem
                            bold={false}
                            title="Discounts"
                            subTitle="Want to grab a bargain? Dinner for two but half the price? Discounted memberships? We will showcase the latest discounts for you to enjoy!"
                        />
                        <BlockItem
                            bold={false}
                            title="Community"
                            subTitle="More and more people are moving into the area or maybe there are many places around here you never knew about. Our guide will help everyone find their way!"
                        />
                    </Row>
                   
                </Container>
            </Wrapper>

        )
    }

    // Dan, If not logged in show the Register button, otherwise show the view all photos button
    _renderButton() {
        if (!this.props.data.user) {
            return <Link className="f3 fw4 hover-red no-underline black-70 dib pv2 ph3 ba" to="/signup" >Register Now!</Link>
        } else {
            return <Link className="f3 fw4 hover-red no-underline black-70 dib pv2 ph3 ba" to="/Photo" >View all photos</Link>
        }
    }

    _showText() {
        if (!this.props.data.user) {
            return <h3 className="f3">1. Sign-up</h3>
        } else {
            return <h3 className="f3">2. Add photos</h3>
        }
    }
}

export default NavJump
