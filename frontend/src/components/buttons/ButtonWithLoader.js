import React from 'react'
import styled, { css } from 'styled-components'
import LaddaButton, { XL, EXPAND_LEFT } from 'react-ladda'
import PropTypes from 'prop-types'

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

const Button = styled.div`
  text-align: center;
  margin: auto;
  vertical-align: middle;
  border: 1px solid transparent;
  border-radius: 0;
  transition: background-color 0.25s ease-out, color 0.25s ease-out;
  font-family: inherit;
  font-size: 0.9rem;
  -webkit-appearance: none;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  color: white;
  display: inline-block;
  padding: 0.85em 1em;
  background-color: ${PRIMARY_COLOR};
  border-radius: 0.25rem;
  ${props => props.isLoading && css`
     cursor: progress;
  `}
`

const ButtonWithLoader = ({
  text,
  isLoading,
  onClick,
  ...others
}) => {
  return (
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
        borderRadius: '0.25rem',
        cursor: isLoading ? 'progress' : 'pointer',
        backgroundColor: PRIMARY_COLOR,
      }}
      {...others}>

      <Button
        isLoading={isLoading}>
          {text}
      </Button>

    </LaddaButton>
  )
}

ButtonWithLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ButtonWithLoader
