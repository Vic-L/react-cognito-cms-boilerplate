import React from 'react'

import styled from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

function TransitionWrapper(Component) {
  return class extends React.Component {
    render() {
      return (
        <Wrapper>
          <Component {...this.props}/>
        </Wrapper>
      );
    }
  }
}

export default TransitionWrapper