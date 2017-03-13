/**
 * Component for Post creation
 */
import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Dropzone from 'react-dropzone'
import request from 'superagent'

// TODO: Should move these to environment variables, this is that not secure
const CLOUDINARY_UPLOAD_PRESET = 'bqzvryde';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dqpknoetx/upload';

class CreatePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      publicId: null,
      metaData: null
      };
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        let upload = request.post(
            CLOUDINARY_UPLOAD_URL).field('upload_preset', 
            CLOUDINARY_UPLOAD_PRESET).field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error("ERR1",err);
            }
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

  handlePhoto = () => {
    this.setState({userId: this.props.data.user.id})
    const {name, description, imageUrl, userId, publicId, metaData} = this.state
    this.props.mutate({variables: {name, description, imageUrl, userId, publicId, metaData }})
      .then(() => {
        this.props.router.push('/photo')
      })
  }
}

const createPhoto = gql`
  mutation ($name: String!, $description: String!, $imageUrl: String!, $userId: ID!, $publicId: String, $metaData: Json) {
    createPhoto(name: $name, description: $description, imageUrl: $imageUrl, userId: $userId, publicId: $publicId, metaData: $metaData) {
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