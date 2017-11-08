/**
 * Single Photo item
 */
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router'
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react'

class Event extends React.Component {

  static propTypes = {
    event: React.PropTypes.object,
    mutate: React.PropTypes.func,
    refresh: React.PropTypes.func,
  }

  // http://res.cloudinary.com/dqpknoetx/image/upload/v1489441520/odtitxnfqdjzfygvuvls.jpg

  render () {
    // let outputUrl = '';
    
    // if(this.props.event.publicId === null) {
    //   outputUrl = this.props.event.imageUrl;
    // } else {
    //   outputUrl = 'http://res.cloudinary.com/dqpknoetx/image/upload/c_scale,w_640/v1489441520/' + this.props.event.publicId;
    // }

    var event = this.props.event.slug;
    const linkTo = '/events/' + event;

    console.log(linkTo)

    return (
      <div className='fl w-50 w-25-m w-20-l pa2'>
        {/* <div className='aspect-ratio aspect-ratio--1x1'> */}
          <Link className='db link dim tc' to={linkTo}>
            {/* <img style={{ backgroundImage: `url(${outputUrl})` }} className='db bg-center cover aspect-ratio--object' role='presentation'  */}
         
            <CloudinaryContext cloudName="dqpknoetx">
                  <Image publicId={this.props.event.publicId} className="w-100 db outline black-10">
                  <Transformation height="400" width="400" crop="fit" />
                  </Image>
                </CloudinaryContext>
            </Link>  
            
        {/* </div> */}
        {/*<span onClick={this.handleDelete}>Delete</span>*/}
      </div>
    )
  }

  handleDelete = () => {
    this.props.mutate({variables: {id: this.props.event.id}})
      .then(this.props.refresh)
  }
}

const deleteMutation = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
    }
  }
`

const EventWithMutation = graphql(deleteMutation)(Event)

export default EventWithMutation
