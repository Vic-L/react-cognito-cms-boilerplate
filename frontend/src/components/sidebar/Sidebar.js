import React from 'react'
import Loadable from 'react-loadable'

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

  render() {
    const { dispatch } = this.props
    const { isShown } = this.state

    return (
      <div className={`sidebar ${isShown ? '' : 'inactive'}`}>
        <div className='top-section'>
          <Button
            text="Logout"
            className="button"
            onClick={() => {
              dispatch({type: 'LOADING_START'})
              const Pool = new CognitoUserPool({
                UserPoolId: process.env.COGNITO_ADMIN_USER_POOL_ID,
                ClientId: process.env.COGNITO_ADMIN_CLIENT_ID
              })
              const cognitoUser = Pool.getCurrentUser()
              cognitoUser.signOut()
              dispatch({type: 'LOADING_END'})
            }}/>
        </div>
        <SidebarOption
          text="Form"
          dst="/form"/>
        <SidebarOptionWithDropdown
          text="Link2"
          dst="#"
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

export default Sidebar
