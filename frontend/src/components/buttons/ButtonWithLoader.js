import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ChasingDots } from 'styled-spinkit';

const Button = React.lazy(() => import('_buttons/Button'))

const ButtonContainer = styled(Button)`
  position: relative;
  transition: 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275) all !important;
  overflow: hidden;
  box-shadow: ${props => props.isLoading ? '0px 0px 0px 2000px rgba(0, 0, 0, 0.8)' : '0px 0px 0px 2000px rgba(0, 0, 0, 0)'};
  background-color: ${props => props.isLoading ? '#999 !important' : `${PRIMARY_COLOR} !important`};
  box-sizing: border-box;
  ${props => props.isLoading && css`
    display: inline-block;
    margin-top: 0;
    pointer-events: none;
    border-radius: 50% !important;
    max-width: 50px;
    max-height: 50px;
    width: 50px;
    height: 50px;
  `}
`

const Label = styled.span`
  transition: 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275) all !important;
  position: relative;
  z-index: 3;
  opacity: ${props => props.isLoading ? 0 : 1};
`

const Spinner = styled(ChasingDots)`
  height: 30px !important;
  position: absolute !important;
  z-index: 2;
  display: inline-block;
  width: 30px !important;
  pointer-events: none;
  opacity: ${props => props.isLoading ? 1 : 0};
  top: ${props => props.isLoading ? '10px !important' : 0};
  left: ${props => props.isLoading ? '10px !important' : 0};
  margin: 0 !important;
`

const ButtonWithLoader = ({
  text,
  isLoading,
  onClick,
  style,
  ...others
}) => {
  return (
    <ButtonContainer
      isLoading={isLoading}
      onClick={onClick}
      style={{...style}}
      {...others}>

      <Label isLoading={isLoading}>
        {text}
      </Label>

      <Spinner isLoading={isLoading} color={PRIMARY_COLOR}/>

    </ButtonContainer>
  )
}

ButtonWithLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ButtonWithLoader
