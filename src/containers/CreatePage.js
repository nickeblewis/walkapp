/**
 * Component for Post creation
 */
import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Dropzone from 'react-dropzone'
import request from 'superagent'

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
        let upload = request.post(
            CLOUDINARY_UPLOAD_URL).field('upload_preset', 
            CLOUDINARY_UPLOAD_PRESET).field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url,
                    imageUrl: response.body.secure_url
                });
            }
        });
    }
  static propTypes = {
    router: React.PropTypes.object,
    addPost: React.PropTypes.func,
  }

  state = {
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
                            <img alt={this.state.uploadedFileCloudinaryUrl} src={this.state.uploadedFileCloudinaryUrl} />
                        </div>}
                </div>
            </Dropzone>   
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
          {this.state.imageUrl &&
            <img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
          }
          {this.state.description && this.state.imageUrl &&
            <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handlePost}>Post</button>
          }
        </div>
      </div>
    )
  }

  handlePost = () => {
    const {description, imageUrl} = this.state
    this.props.addPost({ description, imageUrl })
      .then(() => {
        this.props.router.push('/posts')
      })
  }
}

const addMutation = gql`
  mutation addPost($description: String!, $imageUrl: String!) {
    createPost(description: $description, imageUrl: $imageUrl) {
      id
      description
      imageUrl
    }
  }
`

const PageWithMutation = graphql(addMutation, {
  props: ({ ownProps, mutate }) => ({
    addPost: ({ description, imageUrl }) =>
      mutate({
        variables: { description, imageUrl },
        updateQueries: {
          allPosts: (state, { mutationResult }) => {
            const newPost = mutationResult.data.createPost
            return {
              allPosts: [...state.allPosts, newPost]
            }
          },
        },
      })
  })
})(withRouter(CreatePage))

export default PageWithMutation