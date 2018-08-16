import React from 'react'
import Loadable from 'react-loadable'

class DismissableCard extends React.Component {
  render() {
    return (
      <div className='card dismissable-card cell medium-6'>
        <p>Dismissable Card</p>
        <div className="card-close-button" onClick={this.props.onClose}>
          <span>&times;</span>
        </div>
      </div>
    )
  }
}

export default DismissableCard