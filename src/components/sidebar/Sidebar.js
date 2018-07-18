import React from 'react'
import Loadable from 'react-loadable'

import {
  CognitoUserPool,
} from "amazon-cognito-identity-js"

import LoadingModal from '_miscellaneous/LoadingModal'

const SidebarOption = Loadable({
  loader: () => import('_sidebar/SidebarOption'),
  loading: LoadingModal,
})

const SidebarOptionWithDropdown = Loadable({
  loader: () => import('_sidebar/SidebarOptionWithDropdown'),
  loading: LoadingModal,
})

const Button = Loadable({
  loader: () => import('_buttons/Button'),
  loading: LoadingModal,
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

export default Sidebar
