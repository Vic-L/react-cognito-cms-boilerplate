import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Box } from '@rebass/grid'

const Card = ({
  cellSize,
  children,
}) => {
  return (
    <Box
      mx='1rem'
      width={cellSize}
      css={{
        borderRadius: '5px',
        boxShadow: 'rgba(0, 0, 0, 0.75) 0px 0px 20px -5px',
        padding: '1rem',
        position: 'relative',
        marginBottom: '1rem'
      }}>
      {children}
    </Box>
  )
}

Card.propTypes = {
  cellSize: PropTypes.number.isRequired,
}

export default Card