import React from 'react'
import Loadable from 'react-loadable'
import PropTypes from 'prop-types'

class DismissableCard extends React.Component {
  render() {
    return (
      <div className={`card dismissable-card cell medium-${this.props.cellSize} ${this.props.className}`}>
        {this.props.children}
        {
          this.props.isDismissable ? (
            <div className="card-dismiss-button" onClick={this.props.onDismiss}>
              <span>&times;</span>
            </div>
          ) : null
        }
      </div>
    )
  }
}

DismissableCard.propTypes = {
  cellSize: PropTypes.number.isRequired,
  isDismissable: PropTypes.bool,
}

export default DismissableCard
