import React from 'react'
import LaddaButton, { XL, EXPAND_LEFT } from 'react-ladda'

/*
Sizes
- XS
- S
- L
- XL
Styles
- CONTRACT
- CONTRACT_OVERLAY
- EXPAND_LEFT
- EXPAND_RIGHT
- EXPAND_UP
- EXPAND_DOWN
- SLIDE_LEFT
- SLIDE_RIGHT
- SLIDE_UP
- SLIDE_DOWN
- ZOOM_IN
- ZOOM_OUT
*/

const ButtonWithLoader = ({containerClassName = "", text, isLoading, ...others}) => {
  return (
    <div className={`button-container ${containerClassName}`}>
      <LaddaButton
        loading={isLoading}
        data-color="#eee"
        data-size={XL}
        data-style={EXPAND_LEFT}
        data-spinner-size={30}
        data-spinner-color="#ddd"
        data-spinner-lines={12}
        {...others}>
        {text}
      </LaddaButton>
    </div>
  )
}

export default ButtonWithLoader
