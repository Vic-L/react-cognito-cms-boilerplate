import React from 'react'

const SidebarOptionContainer = React.lazy(() => import('_sidebar/SidebarOptionContainer'))
const SidebarLink = React.lazy(() => import('_sidebar/SidebarLink'))

class SidebarOption extends React.Component {
  render() {
    return (
      <React.Suspense fallback={<div/>}>
        <SidebarOptionContainer>
          <React.Suspense fallback={<div/>}>
            <SidebarLink to={this.props.dst}>
              {this.props.text}
            </SidebarLink>
          </React.Suspense>
        </SidebarOptionContainer>
      </React.Suspense>
    )
  }
}

export default SidebarOption
