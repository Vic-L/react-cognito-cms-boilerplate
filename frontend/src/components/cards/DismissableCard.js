import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Card = styled.div`
  border-radius: 5px
  box-shadow: rgba(0, 0, 0, 0.75) 0px 0px 20px -5px
  background-color: ${PRIMARY_COLOR}
  padding: 1rem
  position: relative
  margin-bottom: 1rem
`

const DismissButton = styled.div`
  position: absolute;
  cursor: pointer;
  outline: none;
  position: absolute;
  top: 0;
  right: 1rem;
  font-size: 2rem;
`

const DismissableCard = ({
  cellSize,
  children,
  isDismissable,
  onDismiss,
}) => {
  return (
    <Card className={`cell medium-${cellSize}`}>

      {children}

      {
        isDismissable ? (
          <DismissButton
            onClick={onDismiss}>
            <span>&times;</span>
          </DismissButton>
        ) : null
      }
    </Card>
  )
}

DismissableCard.propTypes = {
  cellSize: PropTypes.number.isRequired,
  onDismiss: PropTypes.func.isRequired,
  isDismissable: PropTypes.bool,
}

export default DismissableCard
