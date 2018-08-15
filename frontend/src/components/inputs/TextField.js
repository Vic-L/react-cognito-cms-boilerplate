import React from 'react'

const TextField = ({label, placeholder, type, name, onChange, value, error, ...others}) => {
  return (
    <React.Fragment>
      <div className='input-container'>
        <input
          className={`input ${error ? 'with-error' : ''}`}
          name={name}
          value={value || ""}
          type={type}
          onChange={onChange}
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
    </React.Fragment>
  )
}

export default TextField
