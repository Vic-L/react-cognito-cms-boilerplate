import * as actionTypes from "_actions/types"

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
  CookieStorage
} from "amazon-cognito-identity-js"

export function loginAdminUser(Username, Password) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.LOADING_START
    })

    const Pool = new CognitoUserPool({
      UserPoolId: process.env.COGNITO_ADMIN_USER_POOL_ID,
      ClientId: process.env.COGNITO_ADMIN_CLIENT_ID,
      Storage: new CookieStorage({domain: "localhost"})
    })
    const cognitoUser = new CognitoUser({ Username, Pool })

    const authenticationData = { Username, Password }
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        dispatch({
          type: actionTypes.LOADING_END
        })
      },
      onFailure: (err) => {
        console.log(err)
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.

        // the api doesn't accept this field back
        delete userAttributes.email_verified

        // Get these details and call
        cognitoUser.completeNewPasswordChallenge(Password, userAttributes, this)
      }
    })
  }
}