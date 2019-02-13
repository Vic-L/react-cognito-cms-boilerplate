import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

const ErrorContainer = React.lazy(() => import('_elements/ErrorContainer'));
const Button = React.lazy(() => import('_elements/Button'));

const Wrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  display: none;
`;

const errorTheme = {
  borderBottomColor: ERROR_COLOR,
  errorContainerHeight: 'auto',
  errorContainerPaddingTop: '5px',
  errorContainerPaddingBottom: '5px',
};

const noErrorTheme = {
  errorContainerHeight: 0,
  errorContainerPaddingTop: 0,
  errorContainerPaddingBottom: 0,
};

class FileField extends React.Component {
  @autobind
  onClick() {
    this.refs.fileInput.click();
  }

  render() {
    const {
      onChange,
      error,
      text,
      file,
      ...others
    } = this.props;

    return (
      <Wrapper>
        <Button onClick={this.onClick}>{file ? `Uploaded: ${file.name}` : 'Upload file'}</Button>
        <Input
          ref='fileInput'
          type="file"
          onChange={onChange}
          {...others}
        />
        <ThemeProvider theme={error ? errorTheme : noErrorTheme}>
          <ErrorContainer>{error}</ErrorContainer>
        </ThemeProvider>
      </Wrapper>
    );
  }
}

//** code sample to upload file
// fileUpload(file){
//   const url = 'http://example.com/file-upload';
//   const formData = new FormData();
//   formData.append('file',file)
//   const config = {
//     headers: {
//       'content-type': 'multipart/form-data'
//     }
//   }
//   return  post(url, formData,config)
// }

FileField.propTypes = {
  name: PropTypes.string.isRequired,
  file: PropTypes.object,
  error: PropTypes.string,
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default FileField;
