import React from 'react'

class Card extends React.Component {
  render() {
    return (
      <div className={`card cell medium-${this.props.cellSize} ${this.props.className}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Card