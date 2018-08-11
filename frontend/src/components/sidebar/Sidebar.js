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
        text="Form"
        dst="/form")
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

export default Sidebar
