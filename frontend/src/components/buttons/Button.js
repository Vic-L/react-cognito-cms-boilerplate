import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const _Button = styled.div`
  text-align: center;
  margin: auto;
  vertical-align: middle;
  padding: 0.85em 1em;
  border: 1px solid transparent;
  border-radius: 0;
  transition: background-color 0.25s ease-out, color 0.25s ease-out;
  font-family: inherit;
  font-size: 0.9rem;
  -webkit-appearance: none;
  line-height: 1;
  text-align: center;
  cursor: pointer;
  background-color: ${PRIMARY_COLOR};
  color: white;
  display: inline-block;
`

const Button = ({
  onClick,
  text,
}) => {
  return (
    <_Button
      onClick={onClick}>
      
      {text}
    </_Button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Button
