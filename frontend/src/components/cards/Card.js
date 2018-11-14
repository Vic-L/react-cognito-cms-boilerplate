import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const _Card = styled.div`
  border-radius: 5px
  box-shadow: rgba(0, 0, 0, 0.75) 0px 0px 20px -5px
  background-color: ${PRIMARY_COLOR}
  padding: 1rem
`

const Card = ({
  cellSize,
  children,
}) => {
  return (
    <_Card className={`cell medium-${cellSize}`}>
      {children}
    </_Card>
  )
}

Card.propTypes = {
  cellSize: PropTypes.number.isRequired,
}

export default Card