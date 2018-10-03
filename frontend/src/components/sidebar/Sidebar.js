import React from 'react'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'

import {
  CognitoUserPool,
} from "amazon-cognito-identity-js"

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
                const Pool = new CognitoUserPool({
                  UserPoolId: process.env.COGNITO_ADMIN_USER_POOL_ID,
                  ClientId: process.env.COGNITO_ADMIN_CLIENT_ID
                })
                const cognitoUser = Pool.getCurrentUser()
                if (cognitoUser != null) {
                  cognitoUser.signOut()
                  this.props.succeedLogout()
                  this.props.history.push("/login")
                } else {
                  this.props.failLogout()
                }
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
    failLogout: () => {
      dispatch({type: 'LOGOUT_FAILURE'})
    }
  }
}

export default connect(null, mapDispatchToProps)(Sidebar)
