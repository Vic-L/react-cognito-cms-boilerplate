import React from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import Auth from '@aws-amplify/auth'

const SidebarOption = Loadable({
  loader: () => import('_sidebar/SidebarOption'),
  loading: () => <div></div>,
})

const SidebarOptionWithDropdown = Loadable({
  loader: () => import('_sidebar/SidebarOptionWithDropdown'),
  loading: () => <div></div>,
})

const Button = Loadable({
  loader: () => import('_buttons/Button'),
  loading: () => <div></div>,
})

const ImageButton = Loadable({
  loader: () => import('_buttons/ImageButton'),
  loading: () => <div></div>,
})

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
            <Button
              text="Logout"
              className="button"
              onClick={() => {
                this.props.requestLogout()
                Auth.signOut()
                .then(() => {
                  this.props.succeedLogout()
                  this.props.history.push("/login")
                })
                .catch((err) => {
                  console.log(err)
                  this.props.failLogout(err.message || err)
                })
              }}/>
          </div>
          <SidebarOption
            text="Dashboard"
            dst="/"/>
          <SidebarOption
            text="Form"
            dst="/form"/>
          <SidebarOption
            text="Table"
            dst="/table"/>
          <SidebarOption
            text="Cards"
            dst="/cards"/>
          <SidebarOption
            text="Charts"
            dst="/charts"/>
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
        </div>

        <ImageButton
          className='sidebar-button'
          imageUri='https://cdn1.iconfinder.com/data/icons/simple-icons/4096/github-4096-black.png'
          onClick={() =>{
            this.setState({ isShown: !isShown })
          }}/>
      </div>
    )
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
