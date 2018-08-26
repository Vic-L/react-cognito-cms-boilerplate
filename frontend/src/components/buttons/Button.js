import React from 'react'

const Button = ({containerClassName = "", className, onClick, text, style, ...others}) => {
  return (
    <div className={`button-container ${containerClassName}`}>
      <div
        className={className}
        onClick={onClick}
        style={{...style}}
        {...others}>
        
        {text}
      </div>
    </div>
  )
}

export default Button
