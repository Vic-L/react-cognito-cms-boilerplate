import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Card = React.lazy(() => import('_cards/Card'))

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
    <React.Suspense fallback={<div></div>}>
      <Card cellSize={1/2}>
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
    </React.Suspense>
  )
}

DismissableCard.propTypes = {
  cellSize: PropTypes.number.isRequired,
  onDismiss: PropTypes.func.isRequired,
  isDismissable: PropTypes.bool,
}

export default DismissableCard
