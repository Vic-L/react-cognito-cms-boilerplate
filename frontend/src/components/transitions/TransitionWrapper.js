import React from 'react'

function TransitionWrapper(Component) {
  return class extends React.Component {
    render() {
      return (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}>
          
          <Component {...this.props}/>

        </div>
      );
    }
  }
}

export default TransitionWrapper