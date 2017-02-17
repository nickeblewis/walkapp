/**
 * Component for Post creation
 */
import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Dropzone from 'react-dropzone'
import request from 'superagent'

const GC_PROJECT_CODE = "cixraxev60e4c0121krsia44h";
const GC_UPLOAD_URL = "https://api.graph.cool/file/v1/cixraxev60e4c0121krsia44h";
const CLOUDINARY_UPLOAD_PRESET = 'gec3tjz3';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dqpknoetx/upload';


class CreatePage extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
            open: true,
            uploadedFile: null,
            uploadedFileCloudinaryUrl: ''
        };
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    handleImageUpload(file) {
        // let upload = request.post(
        //     CLOUDINARY_UPLOAD_URL).field('upload_preset', 
        //     CLOUDINARY_UPLOAD_PRESET).field('file', file);

        let upload = request.post(
            GC_UPLOAD_URL).field('data', file);

        upload.end((err, response) => {
            if (err) {
                console.error("ERR1",err);
            }

            console.log("RESPONSE", response.body);

            if (response.body.url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.url,
                    imageUrl: response.body.url
                });
            }
        });
    }
  static propTypes = {
    router: React.PropTypes.object,
    addPhoto: React.PropTypes.func,
  }

  state = {
    name: '',
    description: '',
    imageUrl: '',
  }

  render () {
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
                          {/*<img alt={this.state.uploadedFileCloudinaryUrl} src={this.state.uploadedFileCloudinaryUrl} />*/}
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
    const {name, description, imageUrl} = this.state
    this.props.addPhoto({ name, description, imageUrl })
      .then(() => {
        this.props.router.push('/photos')
      })
  }
}

const addMutation = gql`
  mutation addPhoto($name: String!, $description: String!, $imageUrl: String!) {
    createPhoto(name: $name, description: $description, imageUrl: $imageUrl) {
      id
      name
      description
      imageUrl
    }
  }
`

const PageWithMutation = graphql(addMutation, {
  props: ({ ownProps, mutate }) => ({
    addPhoto: ({ name, description, imageUrl }) =>
      mutate({
        variables: { name, description, imageUrl },
        updateQueries: {
          allPhotos: (state, { mutationResult }) => {
            const newPhoto = mutationResult.data.createPhoto
            return {
              allPhotos: [...state.allPhotos, newPhoto]
            }
          },
        },
      })
  })
})(withRouter(CreatePage))

export default PageWithMutation