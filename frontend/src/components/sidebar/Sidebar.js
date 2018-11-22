import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import Auth from '@aws-amplify/auth'

import * as ContentLoaders from '_contentLoaders'

const SidebarOption = React.lazy(() => import('_sidebar/SidebarOption'))
const SidebarOptionWithDropdown = React.lazy(() => import('_sidebar/SidebarOptionWithDropdown'))
const Button = React.lazy(() => import('_buttons/Button'))
const ImageButton = React.lazy(() => import('_buttons/ImageButton'))

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
      <div className={`sidebar ${isShown ? '' : 'inactive'}`}>
        <div className='sidebar-background'/>
        <div className='sidebar-container'>
          <div className='top-section'>
            <React.Suspense fallback={<ContentLoaders.Button/>}>
              <Button onClick={this.onLogout}>
                Logout
              </Button>
            </React.Suspense>
          </div>
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
        </div>

        <React.Suspense fallback={<div></div>}>
          <ImageButton
            className='sidebar-button'
            imageUri='https://cdn1.iconfinder.com/data/icons/simple-icons/4096/github-4096-black.png'
            onClick={() =>{
              this.setState({ isShown: !isShown })
            }}/>
        </React.Suspense>
      </div>
    )
  }

  @autobind
  async onLogout() {
    this.props.requestLogout()
    try {
      await Auth.signOut()

      this.props.succeedLogout()
      this.props.history.push("/login")
    } catch (err) {
      console.log(err)
      this.props.failLogout(err.message || err)
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestLogout: () => {
      dispatch({type: 'LOGOUT_REQUEST'})
    },
    succeedLogout: () => {
      dispatch({type: 'LOGOUT_SUCCESS'})
    },
    failLogout: (message) => {
      dispatch({
        type: 'LOGOUT_FAILURE',
        message
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(Sidebar)
