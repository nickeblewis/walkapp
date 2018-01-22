import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'react-router';

import media from '../css/media';

const Item = styled.p`
  margin: 0 0 0 50px;
  padding-top: 5px;
  border-top: 5px transparent solid;
  color: #2d2d2d;
  font-family: Lato, sans-serif;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: border-top 0.3s;

  @media (${media.tablet}) {
    margin: 0 0 20px;
    padding-top: 0;
    border-color: transparent;
  }


`;

class NavItem extends Component {
  render() {
    const { to: link, title, onClick, hasHover, pathname } = this.props;
    const isOutsideLink = link.indexOf('http') > -1;
    // const selected = pathname.indexOf(`/${title.toLowerCase()}/`) > -1;

    if (isOutsideLink) {
      return (
        <a href={link} target="_blank">
          <Item hasHover={hasHover}>
            {title}
          </Item>
        </a>
      );
    }
    return (
      <Link to={link} onClick={onClick}>
        <Item hasHover={hasHover}>
          {title}
        </Item>
      </Link>
    );
  }
}

export default NavItem;
