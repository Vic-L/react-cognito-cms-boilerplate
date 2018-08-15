import React from 'react'

const ImageButton = ({className, onClick, imageUri, ...others}) => {
  return (
    <div
      className={`image-button ${className}`}
      onClick={onClick}
      {...others}>
      <img src={imageUri} />
    </div>
  )
}

export default ImageButton
