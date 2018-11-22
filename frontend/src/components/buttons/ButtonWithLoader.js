import React from 'react'
import styled, { css } from 'styled-components'
import LaddaButton, { XL, EXPAND_LEFT } from 'react-ladda'
import PropTypes from 'prop-types'

const Button = React.lazy(() => import('_buttons/Button'))

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

const _Button = styled(Button)`
  padding: 0 !important;
  ${props => props.isLoading && css`
    cursor: progress;
  `}
`

const ButtonWithLoader = ({
  text,
  isLoading,
  onClick,
  style,
  ...others
}) => {
  return (

    <_Button
      isLoading={isLoading}>
      <LaddaButton
        loading={isLoading}
        data-color="#eee"
        data-size={XL}
        data-style={EXPAND_LEFT}
        data-spinner-size={30}
        data-spinner-color="#ddd"
        data-spinner-lines={12}
        onClick={onClick}
        className='ladda-button'
        style={{
          paddingTop: '0.85em',
          paddingBottom: '0.85em',
          paddingRight: '1em',
          paddingLeft: isLoading ? '' : '1em',
          color: 'inherit',
          cursor: 'inherit',
          backgroundColor: 'none',
          ...style
        }}
        {...others}>

        {text}

      </LaddaButton>
    </_Button>

  )
}

ButtonWithLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ButtonWithLoader
