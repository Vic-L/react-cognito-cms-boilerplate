import React from 'react'

const Button = ({className, onClick, text, ...others}) => {
  return (
    <div className='button-container'>
      <div
        className={className}
        onClick={onClick}
        {...others}>
        {text}
      </div>
    </div>
  )
}

export default Button
