/**
 * Component that lists all Posts
 */
import React from 'react'
import { Link } from 'react-router'
import Place from '../components/Place'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

class PlaceListPage extends React.Component {

  constructor() {
    super();
    this.state = {      
      lat: 51.27985,
      lng: -0.75159,
      zoom: 15,
    };
  }

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    const position = [this.state.lat, this.state.lng];

    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <main>
      <Map center={position} zoom={this.state.zoom}>
    <TileLayer
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker position={position}>
      <Popup>
        <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
      </Popup>
    </Marker>
  </Map>
      <section className='cf w-100 pa2-ns'>
        <Link to='/places/create' className='fixed bg-white top-0 right-0 pa4 ttu dim black no-underline'>
          + New Place
        </Link>
        
          {this.props.data.allPlaces.map((place) =>
            <Place key={place.id} place={place} refresh={() => this.props.data.refetch()} />
          )}
        
      </section>
      </main>
    )
  }
}

const FeedQuery = gql`query allPlaces {
  allPlaces(filter: {published:true}, orderBy: createdAt_DESC) {
    id
    banner
    title
    slug
    summary
  }
}`

const PlaceListPageWithData = graphql(FeedQuery)(PlaceListPage)

export default PlaceListPageWithData
