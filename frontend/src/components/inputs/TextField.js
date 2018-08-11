import React from 'react'

const TextField = ({label, placeholder, type, name, onChange, value, error, ...others}) => {
  return (~
    .input-group
      .input-group-label
        {label}
      %input(
        className="input-group-field"
        name={name}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        {...others})
      .input-group-error
        {error}
  ~)
}

export default TextField
