import React from 'react'
import Loadable from 'react-loadable'

class Card extends React.Component {
  render() {
    return (
      <div className='card cell medium-6'>
        {this.props.children}
      </div>
    )
  }
}

export default Card