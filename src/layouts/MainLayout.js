/**
 * Component that lists all Posts
 */
import React from 'react'
import Header from '../components/Header'

class MainLayout extends React.Component {

  render () {
    return (
        <main>
          <Header />
          {this.props.children}
        </main>
    )
  }
}

export default MainLayout
