import React from 'react'

import {
  CognitoUserPool,
} from "amazon-cognito-identity-js"

import {
  SidebarOption,
  SidebarOptionWithDropdown
} from '_sidebar'

import { Button } from '_buttons'

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
