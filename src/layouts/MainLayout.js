/**
 * Component that lists all Posts
 */
import React from 'react'
import Header from '../components/Header'

class MainLayout extends React.Component {

  render () {
    return (
        <article>
          <Header />
          <section className='cf w-100 pa2-ns'>
            {this.props.children}
          </section>
        </article>
    )
  }
}

export default MainLayout
