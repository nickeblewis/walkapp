import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'react-router';

import media from '../css/media';

const Wrapper = styled.div`
  display: flex;
  padding-right: 2em;
  flex-direction: column;
  flex-basis: 50%;

  @media (${media.tablet}) {
    padding-right: 0;
    flex-basis: 100%;
  }
`;

const Title = styled.h2`
  color: ${props => props.theme.intro.colors.title};
  background-color: ${props => props.theme.intro.backgrounds.wrapper};
//   border: ${props => props.theme.intro.backgrounds.wrapper} 5px solid;
  padding-left: 10px;
  font-size: 37px;
  font-weight: bold;
  letter-spacing: -1px;
  border-radius: 10px;

  @media (${media.tablet}) {
    margin-bottom: 0.5em;
    font-size: 28px;
  }
`;

const SubTitle = styled.p`
  color: ${props => props.theme.post.colors.text};
  font-size: 20px;
  line-height: 1.6;
//   border: ${props => props.theme.post.colors.primary} 5px solid;
  padding-left: 10px;
  
  ${props => props.bold === true
    ? 'font-weight: normal; font-size: 28px'
    : 'font-weight: normal;'};

  @media (${media.tablet}) {
    font-size: 16px;
  }
`;

const ReadMore = styled.p`
color: #ffffff;
font-size: 17px;
font-weight: bold;
letter-spacing: -1px;
text-align: right;
background-color: #df3c3c;
border-radius: 30px;
padding: 8px;
padding-right:20px;

@media (${media.tablet}) {
  margin-bottom: 0.5em;
  font-size: 28px;
}
`;
class BlockItem extends Component {
  render() {
    const { title, subTitle, bold, linkTo } = this.props;
    return (
      <Wrapper>
        <Title>{title}</Title>
        { /*picture && 
          <img
            src={`https://media.graphcms.com/resize=w:512,h:512,a:top,fit:scale/${picture}`}
            alt={title}
            title={title}
            width="256" 
          /> */
        }
        <SubTitle bold={bold}>{subTitle}</SubTitle>

        {linkTo &&
          <ReadMore>
            <Link to={linkTo}>Read more...</Link>
          </ReadMore>
        }

      </Wrapper>
    );
  }
}

export default BlockItem;
