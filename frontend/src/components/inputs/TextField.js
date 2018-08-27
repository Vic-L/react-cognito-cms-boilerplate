import React from 'react'

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

export default TextField
