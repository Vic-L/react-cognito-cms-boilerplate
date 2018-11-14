import React from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider } from 'styled-components'

const theme = {
  backgroundColor: PRIMARY_COLOR,
  hoverBackgroundColor: SECONDARY_COLOR,
}

const Header = styled.th`
  background-color: ${props => props.theme.backgroundColor};
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.hoverBackgroundColor};
  }
`

const SortingArrow = styled.img`
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
`

const ClickableTableHeader = ({
  onClick,
  title,
}) => {

  return (
    <ThemeProvider theme={theme}>
      <Header
        onClick={onClick}>

        {title}

        <SortingArrow src='https://upload.wikimedia.org/wikipedia/commons/f/f5/Sort_both_small.svg'/>

      </Header>
    </ThemeProvider>
  )
}

ClickableTableHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default ClickableTableHeader
