import React from 'react'
import CSSTransition from 'react-transition-group/CSSTransition'

class AnimationWrapper extends React.Component {

  render() {
    const { shouldShow, timeout, classNames } = this.props
    return (
      <CSSTransition
        timeout={timeout || 400}
        classNames={classNames}
        in={shouldShow}>

        {this.props.render()}

      </CSSTransition>
    )
  }
}

export default AnimationWrapper