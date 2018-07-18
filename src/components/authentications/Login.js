import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import Loadable from 'react-loadable'

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
  CookieStorage
} from "amazon-cognito-identity-js"

import LoadingModal from '_miscellaneous/LoadingModal'

const AnimationWrapper = Loadable({
  loader: () => import('_animationWrappers/AnimationWrapper'),
  loading: LoadingModal,
})
const TextField = Loadable({
  loader: () => import('_inputs/TextField'),
  loading: LoadingModal,
})
const Button = Loadable({
  loader: () => import('_buttons/Button'),
  loading: LoadingModal,
})

// utils
import validate from '_utils/validations'

class _Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      in: true,
      submittedFormBefore: false,
      formObject: {
        email: "",
        password: "",
      },
      formErrors: {
        email: "",
        password: ""
      }
    }
  }

  componentWillUnmount() {
    this.setState({in: false})
  }

  render() {
    const { formObject, formErrors } = this.state
    return (~
      %AnimationWrapper(
        classNames="fade"
        shouldShow={this.state.in}
        render={() => {
          return (~
            %main.grid-container
              .grid-x.grid-margin-x
                .cell.auto
                .cell.small-10
                  %TextField(
                    name="email"
                    placeholder="Email"
                    type="text"
                    label="Email"
                    error={formErrors.email}
                    value={formObject.email}
                    onChange={this.onChangeEmail})

                  %TextField(
                    name="password"
                    placeholder="Password"
                    label="Password"
                    type="password"
                    error={formErrors.password}
                    value={formObject.password}
                    onChange={this.onChangePassword})

                  %Button(
                    className="button"
                    text="Login"
                    onClick={() => {
                      if (this.validateForm()) {
                        if (!this.state.submittedFormBefore) {
                          this.setState({
                            submittedFormBefore: true,
                          }, this.login)
                        } else {
                          this.login()
                        }
                      }
                    }})
                .cell.auto
          ~)
        }})
    ~)
  }

  @autobind
  login() {
    const { formObject } = this.state
    const { dispatch } = this.props
    dispatch({type: 'LOADING_START'})

    const Username = formObject.email
    const Password = formObject.password

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
        dispatch({type: 'LOADING_END'})
      },
      onFailure: (err) => {
        console.log(err)
        dispatch({type: 'LOADING_END'})
        dispatch({
          type: 'ALERT_SHOW',
          alert: {
            title: "Alert",
            body: err.message
          }
        })
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

  @autobind
  onChangeEmail(e) {
    this.updateForm('email', e.target.value)
  }

  @autobind
  onChangePassword(e) {
    this.updateForm('password', e.target.value)
  }

  // form methods
  @autobind
  updateForm(fieldName, fieldValue) {
    let newState = {
      formObject: {
          ...this.state.formObject,
          [fieldName]: fieldValue
        }
    }
    if (this.state.submittedFormBefore) {
      newState["formErrors"] = {
        ...this.state.formErrors,
        [fieldName]: validate(fieldName, fieldValue)
      }
      
    }
    this.setState(newState)
  }

  @autobind
  validateForm() {
    const { formObject } = this.state
    const formErrors = _.cloneDeep(this.state.formErrors)

    let isValid = true
    for (let key of Object.keys(formErrors)) {
      let message = validate(key, formObject[key])
      formErrors[key] = message
      if (message) {
        isValid = false
      }
    }

    this.setState({formErrors})

    return isValid
  }
}

function mapStateToProps({ isLoading }) {
  return { isLoading }
}

const Login = connect(mapStateToProps)(_Login)

export default Login
