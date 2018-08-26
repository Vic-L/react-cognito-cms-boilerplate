import React from 'react'

const ImageButton = ({containerClassName = "", className, onClick, imageUri, ...others}) => {
  return (
    <div className={`button-container ${containerClassName}`}>
      <div
        className={`image-button ${className}`}
        onClick={onClick}
        {...others}>
        <img src={imageUri} />
      </div>
    </div>
  )
}

export default ImageButton
