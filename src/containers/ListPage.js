/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'
import Photo from '../components/Photo'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class ListPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <article>
      <header className='bg-gold sans-serif'>
            <nav className="dt w-100 mw8 center"> 
              
              <div className="dtc v-mid tr pa3">
                <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Home</Link> 
                <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Events</Link> 
                <Link className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Walks</Link> 
                <Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/photos" >Media</Link> 
                <Link className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >Contacts</Link> 
                <Link className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" href="/" >Sign Up</Link> 
              </div>
            </nav>
            <div className='mw9 center pa4 pt5-ns ph7-l'>
              <time className="f6 mb2 dib ttu tracked"><small>06 February, 2017</small></time>
              <h3 className="f2 f1-m f-headline-l measure-narrow lh-title mv0">
                <span className="bg-black-90 lh-copy white pa1 tracked-tight">
                  Farnborough Guide
                </span>
              </h3>
              <h4 className="f3 fw1 georgia i">Photography.</h4>
              <h5 className="f6 ttu tracked black-80">By Nick Lewis, Dan Davis &amp; Tina Lewis</h5>
            </div>
          </header>
      <section className='cf w-100 pa2-ns'>
        <Link to='/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New Photo
        </Link>
        
          {this.props.data.allPhotos.map((photo) =>
            <Photo key={photo.id} photo={photo} refresh={() => this.props.data.refetch()} />
          )}
        
      </section>
      </article>
    )
  }
}

const FeedQuery = gql`query allPhotos {
  allPhotos(orderBy: createdAt_DESC) {
    id
    imageUrl
    name
    description
  }
}`

const ListPageWithData = graphql(FeedQuery)(ListPage)

export default ListPageWithData
