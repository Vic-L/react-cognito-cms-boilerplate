import _ from 'lodash'
import {
  CognitoUserPool,
} from "amazon-cognito-identity-js"

export default function* GetAdminJwt() {
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.COGNITO_ADMIN_USER_POOL_ID,
    ClientId: process.env.COGNITO_ADMIN_CLIENT_ID,
  });
  const cognitoUser = userPool.getCurrentUser()

  if (_.isNull(cognitoUser)) {
    yield null
  } else {
    const jwt = cognitoUser.getSession(function(err, result) {
      if (err) {
          alert(err.message || JSON.stringify(err))
          return null
      }

      if (result) {
        return result.getIdToken().getJwtToken()
      } else {
        return null
      }
    })

    yield jwt
  }
  return
}