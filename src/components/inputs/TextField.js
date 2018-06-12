import React from 'react'

const TextField = ({className, placeholder, type, name, onChange, value, ...others}) => {
  return (~
    %input(
      className={className}
      name={name}
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
      {...others})
  ~)
}

export { TextField }
