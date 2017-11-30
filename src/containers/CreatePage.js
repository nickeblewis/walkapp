/**
 * Upload a new photo and annotate it with name and description
 * We also capture the full metadata for the image that is taken from EXIF, IPTC and other information
 */
import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Dropzone from 'react-dropzone'
import request from 'superagent'

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

class CreatePage extends React.Component {
  constructor(props) {
    super(props);

    // Default our state - We shall discuss the difference between props and state at some point
    this.state = {
      open: true,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      publicId: null,
      metaData: null
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
                    metaData: response.body.image_metadata,
                    userId: this.props.data.user.id
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
    imageUrl: '',
    userId: 0,
    publicId: null,
    metaData: null
  }

  render () {
    if (!this.props.data.user) {
      console.warn('only logged in users can create new posts')
      this.props.router.replace('/photo')
    }

    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
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
          <input
            className='w-100 pa3 mv2'
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.description}
            placeholder='Description'
            onChange={(e) => this.setState({description: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            value={this.state.imageUrl}
            placeholder='Image Url'
            onChange={(e) => this.setState({imageUrl: e.target.value})}
          />
          {this.state.description && this.state.imageUrl && this.state.name &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handlePhoto}>Post</button>
          }
        </div>
      </div>
    )
  }

  // This piece of code looks after preparing the GraphQL Mutation
  handlePhoto = () => {
    this.setState({userId: this.props.data.user.id})
    const {name, description, userId, publicId, metaData} = this.state
    this.props.mutate({variables: {name, description, userId, publicId, metaData }})
      .then(() => {
        this.props.router.push('/photos')
      })
  }
}

const createPhoto = gql`
  mutation ($name: String!, $description: String!, $userId: ID!, $publicId: String, $metaData: Json) {
    createPhoto(name: $name, description: $description, userId: $userId, publicId: $publicId, metaData: $metaData) {
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

export default graphql(createPhoto)(
  graphql(userQuery, { options: { forceFetch: true }} )(withRouter(CreatePage))
)