import React from 'react'

import { AnimationWrapper } from '_animationWrappers'
import { TextField } from '_inputs'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      in: true,
      email: "",
      password: ""
    }
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
                  %TextField(
                    name="email"
                    placeholder="Email"
                    type="text"
                    value={this.state.email}
                    onChange={(event) => {
                      this.setState({
                        email: event.target.value
                      })
                    }})

                  %TextField(
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={this.state.password}
                    onChange={(event) => {
                      this.setState({
                        password: event.target.value
                      })
                    }})
                .cell.auto
          ~)
        }})
    ~)
  }
}

export { Login }
