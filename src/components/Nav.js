import React, { Component } from 'react';
import styled from 'styled-components';

import media from '../css/media';

import NavItem from './NavItem';
import MobileMenu from './MobileMenu';

const Container = styled.nav`
  display: flex;
  align-items: center;
`;

const DesktopMenu = styled.div`
  display: flex;

  @media (${media.tablet}) {
    display: none;
  }
`;

class Nav extends Component {
  render() {
    const { pathname } = this.props;
    return (
      <Container role="navigation">
        <DesktopMenu>
          { /* }<NavItem
            title="how"
            to="/docs/GettingStarted"
            hasHover
            pathname={pathname}
          /> */ }
          <NavItem title="home" to="/" hasHover pathname={pathname} />
          <NavItem title="events" to="/events" hasHover pathname={pathname} />
          <NavItem title="about" to="/about" hasHover pathname={pathname} />
        </DesktopMenu>
        <MobileMenu {...this.props} />
      </Container>
    );
  }
}

export default Nav;
