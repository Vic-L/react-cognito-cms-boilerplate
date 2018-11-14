import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const theme = {
  backgroundColor: PRIMARY_COLOR,
  hoverBackgroundColor: SECONDARY_COLOR,
}

const Header = styled.th`
  background-color: ${PRIMARY_COLOR};
  position: relative;
  cursor: pointer;
  padding: 0.5rem 0.625rem 0.625rem;
  font-weight: bold;
  text-align: left;
  line-height: 1.5;
  &:hover {
    background-color: ${SECONDARY_COLOR};
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
    <Header
      onClick={onClick}>

      {title}

      <SortingArrow src='https://upload.wikimedia.org/wikipedia/commons/f/f5/Sort_both_small.svg'/>

    </Header>
  )
}

ClickableTableHeader.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default ClickableTableHeader
