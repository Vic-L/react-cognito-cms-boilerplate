import React from 'react'
import autobind from 'autobind-decorator'
import Auth from '@aws-amplify/auth'
import styled, { css } from 'styled-components'
import * as ContentLoaders from '_contentLoaders'

const SidebarOption = React.lazy(() => import('_sidebar/SidebarOption'))
const SidebarOptionWithDropdown = React.lazy(() => import('_sidebar/SidebarOptionWithDropdown'))
const Button = React.lazy(() => import('_buttons/Button'))

const SidebarContainer = styled.div`
  width: 16.66666667%;
  display: block;
  height: 100vh;
  position: fixed;
  transition: margin 350ms ease-in-out;
  z-index: 1;
  margin-left: ${props => props.isShown ? '0' : '-16.66666667%'};
`

const SidebarBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${PRIMARY_COLOR};
  opacity: 0.9;
  z-index: -1;
`

const SidebarWrapper = styled.div`
  position: relative
  height: 100%
  overflow-y: scroll
`

const SidebarTopSection = styled.div`
  padding: 20px
`

const SidebarButton = styled.div`
  border-radius: 5000px;
  background-color: ${PRIMARY_COLOR};
  cursor: pointer;
  transition: all 350ms ease-in-out;
  position: absolute;
  left: ${props => props.isShown ? '0' : '100%'};
  width: 44px;
  height: 44px;
  margin-left: ${props => props.isShown ? 'calc(100% - 22px)' : '-22px'};
  top: 50%;
  border: 1px ${SECONDARY_COLOR} solid;
  text-align: center;
  &:hover {
    background-color: ${SECONDARY_COLOR};
    opacity: 1;
  }
`

const SidebarButtonContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const SidebarButtonImage = styled.img`
  max-width:100%;
  max-height:100%;
`

class Sidebar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isShown: false
    }
  }

  componentDidMount() {
    this.props.history.listen((location, action) => {
      this.setState({ isShown: false })
    })
  }

  render() {
    const { isShown } = this.state

    return (
      <SidebarContainer isShown={isShown}>
        <SidebarBackground/>
        <SidebarWrapper>
          <SidebarTopSection>
            <React.Suspense fallback={<ContentLoaders.Button/>}>
              <Button onClick={this.onLogout}>
                Logout
              </Button>
            </React.Suspense>
          </SidebarTopSection>
          <React.Suspense fallback={<div/>}>
            <SidebarOption
              text="Dashboard"
              dst="/"/>
          </React.Suspense>
          <React.Suspense fallback={<div/>}>
            <SidebarOption
              text="Form"
              dst="/form"/>
          </React.Suspense>
          <React.Suspense fallback={<div/>}>
            <SidebarOption
              text="Table"
              dst="/table"/>
          </React.Suspense>
          <React.Suspense fallback={<div/>}>
            <SidebarOption
              text="Cards"
              dst="/cards"/>
          </React.Suspense>
          <React.Suspense fallback={<div/>}>
            <SidebarOption
              text="Charts"
              dst="/charts"/>
          </React.Suspense>
          <React.Suspense fallback={<div/>}>
            <SidebarOption
              text="Multi Highlight Example"
              dst="/"
              shouldHighlight={/^\/(cards|table)/.test(this.props.location.pathname)}/>
          </React.Suspense>
          <React.Suspense fallback={<div/>}>
            <SidebarOptionWithDropdown
              text="Link2"
              dropdown={[
                {
                  text: "Link2A",
                  dst: "#"
                },
                {
                  text: "Link2B",
                  dst: "#"
                }
              ]}/>
          </React.Suspense>
        </SidebarWrapper>

        <SidebarButton
          isShown={isShown}
          onClick={() =>{
            this.setState({ isShown: !isShown })
          }}>
          <SidebarButtonContent>
            <SidebarButtonImage src='https://cdn1.iconfinder.com/data/icons/simple-icons/4096/github-4096-black.png'/>
          </SidebarButtonContent>
        </SidebarButton>
      </SidebarContainer>
    )
  }

  @autobind
  async onLogout() {
    try {
      await Auth.signOut()
      this.props.history.push("/login")
    } catch (err) {
      console.log('logout failed: ', JSON.stringify(err))
    }
  }
}

export default Sidebar
