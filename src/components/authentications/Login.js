import React from 'react'
import { AnimationWrapper } from '_animationWrappers'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = { in: true }
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
            %main.grid-container
              .grid-x.grid-margin-x
                .cell.auto
                .cell.small-10
                  Login Page
                .cell.auto
          ~)
        }})
    ~)
  }
}

export { Login }
