import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

/* In the absence of an official PCL back-end for image handling, 
   I have created a Cloudinary (free) account to be able to test this functionality out 
   */
const CLOUDINARY_UPLOAD_PRESET = 'gec3tjz3';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dqpknoetx/upload';

class Upload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: true,
            uploadedFile: null,
            uploadedFileCloudinaryUrl: '',
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
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }


    render() { 
        return (
            <Dropzone
                onDrop={this.onImageDrop.bind(this)}
                multiple={false}
                accept="image/*">
                <div>
                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                        <div>
                            <p>{this.state.uploadedFile.name}</p>
                            <img src={this.state.uploadedFileCloudinaryUrl} />
                        </div>}
                </div>
            </Dropzone>                                  
                             
        )
   }
};

Upload.prototypes = {
    hidden: React.PropTypes.bool,
    data: React.PropTypes.object,
    onSelect:React.PropTypes.func,
};

// TODO: I could add brandColour here in props rather than state???
Upload.defaultProps = {
    hidden:true,
};

export default Upload;