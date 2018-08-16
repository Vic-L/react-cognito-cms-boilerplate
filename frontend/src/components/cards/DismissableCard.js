import React from 'react'
import Loadable from 'react-loadable'

class DismissableCard extends React.Component {
  render() {
    return (
      <div className='card dismissable-card cell medium-6'>
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

export default DismissableCard