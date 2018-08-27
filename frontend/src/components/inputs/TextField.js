import React from 'react'
import PropTypes from 'prop-types'

const TextField = ({
  label,
  placeholder,
  value,
  error,
  ...others
}) => {
  return (
    <div className='input-container'>
      <input
        className={`input ${error ? 'with-error' : ''}`}
        value={value || ""}
        {...others}/>
      <label className={`placeholder ${value ? 'not-empty' : ''}`}>
        {placeholder}
      </label>
      <label className={`label ${value ? 'not-empty' : ''}`}>
        {label}
      </label>
      <div className={`error-container ${error ? 'not-empty' : ''}`}>
        <label className='error'>{error}</label>
      </div>
    </div>
  )
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
}

export default TextField
