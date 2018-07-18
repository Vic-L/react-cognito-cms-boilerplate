import React from 'react'
import Loadable from 'react-loadable'

const AnimationWrapper = Loadable({
  loader: () => import('_animationWrappers'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.AnimationWrapper
    return <Component {...props}/>
  }
})

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

export { LoadingModal }
