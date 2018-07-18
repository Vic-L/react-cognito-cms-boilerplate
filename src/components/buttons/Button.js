import React from 'react'

const Button = ({className, onClick, text, ...others}) => {
  return (~
    %div(
      className={className}
      onClick={onClick}
      {...others}
    )
      {text}
  ~)
}

export default Button
