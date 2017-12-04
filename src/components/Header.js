/**
 * Component that lists all Posts
 */
import React from "react";
// import { Link } from 'react-router'
// import bg from '../assets/NIC_0713.jpg'

class Header extends React.Component {
  render = () => {
    return (
      // <section className="hero is-warning " style={{ backgroundImage: `url(${bg})` }}>
      <section className="homepage-hero">
        <header className="hero is-dark">
          <div className="hero-body has-text-centered">
            <div className="container">
              <h1 className="title is-2 has-text-weight-light">
                Farnborough Guide
              </h1>
              <h2 className="title is-5 has-text-weight-light is-light">
                The Guide to Your Town
              </h2>
            </div>
          </div>
        </header>
      </section>
    );
  };
}

export default Header;
