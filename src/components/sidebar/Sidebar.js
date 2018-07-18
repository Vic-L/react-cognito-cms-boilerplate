import React from 'react'
import Loadable from 'react-loadable'

import {
  CognitoUserPool,
} from "amazon-cognito-identity-js"

import {
  LoadingModal
} from '_miscellaneous'

const SidebarOption = Loadable({
  loader: () => import('_sidebar'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.SidebarOption
    return <Component {...props}/>
  }
})

const SidebarOptionWithDropdown = Loadable({
  loader: () => import('_sidebar'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.SidebarOptionWithDropdown
    return <Component {...props}/>
  }
})

const Button = Loadable({
  loader: () => import('_buttons'),
  loading: LoadingModal,
  render(loaded, props) {
    let Component = loaded.Button
    return <Component {...props}/>
  }
})

const Sidebar = ({ dispatch }) => {
  return (~
    .sidebar
      %Button(
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
        }})
      %SidebarOption(
        text="Link1"
        dst="#")
      %SidebarOptionWithDropdown(
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
        ]})
  ~)
}

export { Sidebar }
