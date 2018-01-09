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
                Rushmoor Life
              </h1>
              <h2 className="title is-5 has-text-weight-light is-light">
                Farnborough / North Camp / Aldershot
              </h2>
            </div>
          </div>
        </header>
      </section>
    );
  };
}

export default Header;
