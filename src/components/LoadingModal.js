import React from 'react'

import { AnimationWrapper } from '_animationWrappers'

class LoadingModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = { in: true}
  }

  componentWillUnmount() {
    this.setState({in: false})
  }

  render() {
    return (~
      %AnimationWrapper(
        classNames="fade"
        shouldShow={this.state.in}
        render={() => {
          return (~
            .loading-overlay
              %h1 Loading...
          ~)
        }}
      )
    ~)
  }
}

export default LoadingModal
