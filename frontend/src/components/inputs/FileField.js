import React from 'react'
import PropTypes from 'prop-types'

const FileField = ({
  onChange,
  error,
  text,
  file,
  containerClassName,
  ...others
}) => {
  
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

  return (
    <label className={`file-field-container ${error ? 'with-error' : ''} ${containerClassName}`}>
      <span className='file-field-label'>{text} - {file ? file.name : ''}</span>
      <input
        type="file"
        onChange={onChange}
        {...others}/>
      <div className={`error-container ${error ? 'not-empty' : ''}`}>
        <label className='error'>{error}</label>
      </div>
    </label>
  )
}

FileField.propTypes = {
  name: PropTypes.string.isRequired,
  containerClassName: PropTypes.string,
  file: PropTypes.object,
  error: PropTypes.string,
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default FileField
