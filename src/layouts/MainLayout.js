/**
 * Component that lists all Posts
 */
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Nav from '../components/Nav'

class MainLayout extends React.Component {

  render () {
    return (
        <main>
          <Nav/>
          <Header />
          {this.props.children}
          { /* We need a footer to go here */ }          
        </main>
    )
  }
}

export default MainLayout
