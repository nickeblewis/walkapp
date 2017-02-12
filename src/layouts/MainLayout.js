/**
 * Component that lists all Posts
 */
import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'

class MainLayout extends React.Component {

  render () {
    return (
        <main>
          <Nav/>
          <Header />
          {this.props.children}
        </main>
    )
  }
}

export default MainLayout
