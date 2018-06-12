import React from 'react'
import { Link } from 'react-router-dom'

import AnimationWrapper from '_animationWrappers/AnimationWrapper'

class Content extends React.Component {
  constructor(props) {
    super(props)

    this.state = { in: true }
  }

  componentWillUnmount() {
    this.setState({in: false})
  }

  render() {
    const { path, params } = this.props.match

    return (~
      %AnimationWrapper(
        timeout={350}
        classNames="fade"
        shouldShow={this.state.in}
        render={() => {
          return (~
            .cell.text-center
              %h1 This is {params.contentId} page !!
              
              %Link(to="/") Back
          ~)
        }}
      )
    ~)
  }
}

export default Content