import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'

class AnimationWrapper extends React.Component {

  render() {
    return (
      <CSSTransition
        timeout={this.props.timeout || 400}
        classNames={this.props.classNames}
        in={this.props.shouldShow}>

        {this.props.children}

      </CSSTransition>
    )
  }
}

export default AnimationWrapper
