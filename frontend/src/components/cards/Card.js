import React from 'react'
import Loadable from 'react-loadable'

class Card extends React.Component {
  render() {
    return (
      <div className={`card cell medium-${this.props.cellSize}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Card