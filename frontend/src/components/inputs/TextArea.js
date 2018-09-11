import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({
  placeholder,
  rows,
  value,
  error,
  ...others
}) => {
  return (
    <div className='textarea-container'>
      <textarea
        rows={rows || '4'}
        placeholder={placeholder}
        className={`textarea ${error ? 'with-error' : ''}`}
        value={value || ""}
        {...others}/>
      
      <div className={`error-container ${error ? 'not-empty' : ''}`}>
        <label className='error'>{error}</label>
      </div>
    </div>
  )
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  rows: PropTypes.number,
}

export default TextArea
