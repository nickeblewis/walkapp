/**
 * Upload a new photo and annotate it with name and description
 * We also capture the full metadata for the image that is taken from EXIF, IPTC and other information
 * 
 * NOTES FOR UNIT 212
 * 
 * 2.1 - Refers to coding standards such as comments, naming and layout. This file also serves as a good example.
 * 
 */
import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Dropzone from 'react-dropzone'
import request from 'superagent'
// import GoogleMap from '../components/GoogleMap'

/** 
 * TODO
 * Should move these to environment variables, so let's set some time aside to do that
 * The other option will be to move them to a file that is not checked into Github
 * Please ask me about this and why this matters :-)
 */
  
// Recently changed the preset to one that doesn't change the uploaded files, we want them to be stored as original
const CLOUDINARY_UPLOAD_PRESET = 'bqzvryde';

// This is essentially the prefix for all references to images stored on Cloudinary
// Please ask me to do a proper training session on how Cloudinary works
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dqpknoetx/upload';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    // Default our state - We shall discuss the difference between props and state at some point
    this.state = {
      open: true,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      publicId: null
      };
    }

    // This event function is fired when a file is dropped on a page that supports drag-n-drop
    onImageDrop(files) {

        // Store the uploaded file in our state, so it is no longer a null value at this point
        this.setState({
            uploadedFile: files[0]
        });

        // Fire off the image upload handler
        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        // These lines of code post the data to Cloudinary including the preset and the file data
        let upload = request.post(
            CLOUDINARY_UPLOAD_URL).field('upload_preset', 
            CLOUDINARY_UPLOAD_PRESET).field('file', file);

        // Handle the Response from the server, it may have failed, in which case log the error to the console
        upload.end((err, response) => {
            if (err) {
                console.error("ERR1",err);
            }

            // Not failed, good, it worked then!

            // 1. The following piece of code outputs the response we receive from Cloudinary when the image is uploaded OK
            //    you will see it is output in the browser console
            // 2. We also can see in this object that we extract metadata from the photo that was uploaded
            //    I've decided to capture that too

            // Please note that two new fields have been added to our Photo model on Graph.Cool
            console.log(response.body)

            // Dan, so some changes need to be made in order to capture the "public_id" as well as the imageUrl
            // so I have added this line below in the setState
            if (response.body.url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.url,
                    imageUrl: response.body.url,
                    publicId: response.body.public_id,
                    userId: 'cj1b7fnnxzllj0147oih4ai72' 
                });
            }
        });
    }
  static propTypes = {
    router: React.PropTypes.object,
    mutate: React.PropTypes.func,
    data: React.PropTypes.object,
  }

  state = {
    name: '',
    description: '',
    eventDate: new Date(),
    slug: '',
    socialMessage: '',
    website: '',
    imageUrl: '',
    userId: 0,
    publicId: null    
  }

  onChange = eventDate => this.setState({ eventDate })
  
  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    if (!this.props.data.user) {
      console.warn('only logged in users can create new events')
      this.props.router.replace('/events')
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
        <h2 className="f2">Create new Event</h2>
          <p className="f4">
            When creating a new event it will be shown on our pages and ordered based on the date it 
            will be taking place.
          </p>
          <p className="f4">
            Please add a flyer, graphic or other image that will represent your event on our website
            Your image will also be used in conjunction with automated social media campaigns
          </p>
          { /* The DropZone component handles file upload */ }
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*">
              <div>
                {this.state.uploadedFileCloudinaryUrl === '' ? null :
                  <div>
                      <p>{this.state.uploadedFile.name}</p>
                  </div>}
              </div>
          </Dropzone>   
          
          { /* Image URL - this is auto-populated by the action of uploading an image file */ }
          <input
            className='w-100 pa3 mv2'
            value={this.state.imageUrl}
            placeholder='Image Url'
            disabled={true}
            onChange={(e) => this.setState({imageUrl: e.target.value})}
          />

          <h4 className="f4">
            The title of your event
          </h4>
          <p className="f4">

          </p>

          { /* Event Name */ }
          <input
            className='w-100 pa3 mv2'
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <h4 className="f4">
            Event Description
          </h4>
          <p className="f4">
            
          </p>

          { /* Event description */ }
          <input
            className='w-100 pa3 mv2'
            value={this.state.description}
            placeholder='Description'
            onChange={(e) => this.setState({description: e.target.value})}
          />

          <h4 className="f4">
            Event Date
          </h4>
          <p className="f4">
            The date is used to automatically schedule social media messages for your event. 
            Please enter in a format of YYYY-MM-DDTHH:MM
          </p>

          { /* Event Date */ }
          <input
            className='w-100 pa3 mv2'
            value={this.state.eventDate}
            placeholder='Event Date'
            onChange={(e) => this.setState({eventDate: e.target.value})}
          />

          <h4 className="f4">
            Slug
          </h4>
          <p className="f4">
            A slug is a term that we use referring to the name appended to the end of a URL, so for 
            example www.farnboroughguide.com/events/farnborough-international-airshow and your event may be 
            "Christmas Carols in the Meads" would be written as christmas-carols-in-the-meads
          </p>

          { /* Slug */ }
          <input
            className='w-100 pa3 mv2'
            value={this.state.slug}
            placeholder='Slug'
            onChange={(e) => this.setState({slug: e.target.value})}
          />

          <h4 className="f4">
            Social Message
          </h4>
          <p className="f4">
            The message you wish to post via Farnborough Guide's Twitter and Facebook accounts
          </p>

          { /* Social message */ }
          <input
            className='w-100 pa3 mv2'
            value={this.state.socialMessage}
            placeholder='Social Message'
            onChange={(e) => this.setState({socialMessage: e.target.value})}
          />

          <h4 className="f4">
            Website Link
          </h4>
          <p className="f4">
            The official event website 
          </p>

          { /* Website */ }
          <input
            className='w-100 pa3 mv2'
            value={this.state.website}
            placeholder='Website'
            onChange={(e) => this.setState({website: e.target.value})}
          />





          { /* Can't get this bloody working yet!!!!! */ }
          { /* <GoogleMap /> */ }










          { /* Unit 212 - 2.2 */ }
          { /* The code below validates that all fields are populated, if so, the submit button is activated */ }
          {/* {this.state.description && this.state.imageUrl && this.state.name && */}
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handleEvent}>Create Event</button>
          {/* } */}
        </div>
      </div>
    )
  }

  // This piece of code looks after preparing the GraphQL Mutation
  handleEvent = () => {
    const userId = this.props.data.user.id
    const {name, description, publicId, eventDate, slug, socialMessage, website} = this.state
    this.props.mutate({variables: {name, description, userId, publicId, eventDate, slug, socialMessage, website }})
      .then(() => {
        this.props.router.push('/events')
      })
  }
}

const createEvent = gql`
  mutation (
    $name: String!, 
    $description: String!, 
    $eventDate: DateTime, 
    $slug: String,
    $socialMessage: String,
    $website: String,
    $userId: ID!, 
    $publicId: String) {
  createEvent(
    archived: false,
    name: $name, 
    description: $description, 
    eventDate: $eventDate, 
    slug: $slug,
    socialMessage: $socialMessage,
    website: $website,
    userId: $userId, 
    publicId: $publicId) {
      id
    }
  }
`

const userQuery = gql`
  query {
    user {
      id
    }
  }
`

export default graphql(createEvent)(
  graphql(userQuery, { options: { forceFetch: true }} )(withRouter(CreateEvent))
)