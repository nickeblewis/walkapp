/**
 * Single Photo item
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router'

class Place extends React.Component {

  static propTypes = {
    Place: React.PropTypes.object,
    mutate: React.PropTypes.func,
    refresh: React.PropTypes.func,
  }

  // http://res.cloudinary.com/dqpknoetx/image/upload/v1489441520/odtitxnfqdjzfygvuvls.jpg

  render () {
    let outputUrl = '';
    
    // if(this.props.place.publicId === null) {
      outputUrl = this.props.place.banner;
    // } else {
    //   outputUrl = 'http://res.cloudinary.com/dqpknoetx/image/upload/c_scale,w_640/v1489441520/' + this.props.place.publicId;
    // }

    const place = this.props.place;
    var slug = this.props.place.slug;
    const linkTo = '/places/' + slug;
    return (
     <div className='grid'>
      <div className='grid-cell fl w-50 w-25-m w-20-l pa2 '>
        <div className='tile'>
         {/* <Link className='ph2 ph0-ns pb3 link db' to={linkTo}> 
            <img style={{ backgroundImage: `url(${outputUrl})` }} className='db bg-center cover aspect-ratio--object' role='presentation' 
            />
         </Link> */}

          <div className='tile-tags'></div>
            <div className='tile-inner'></div>
              <div className='tile-icon'>
                <Link className='tile-link' to={linkTo}>  
                  <img class="tile-logo" role="presentation" src={outputUrl}/>
                </Link>
                  
                    <div className='tile-group'>
                    <div className='tile-title'>
                      {place.title}
                    </div>
                      <div className='tile-subtitle'>
                        {place.summary}
                      </div>
                      </div>
                </div>  
            </div>
          </div>
        
   {/* <h3 className="f5 f5-ns mb0 black-90">{place.title}</h3> */}
  {/* <h3 className="f6 f5 fw4 mt2 black-60">{place.summary}</h3> */} 
    
        {/*<span onClick={this.handleDelete}>Delete</span>*/}
      </div>
      
    )
  }

  handleDelete = () => {
    this.props.mutate({variables: {id: this.props.place.id}})
      .then(this.props.refresh)
  }
}

const deleteMutation = gql`
  mutation deletePlace($id: ID!) {
    deletePlace(id: $id) {
      id
    }
  }
`

const PlaceWithMutation = graphql(deleteMutation)(Place)

export default PlaceWithMutation
