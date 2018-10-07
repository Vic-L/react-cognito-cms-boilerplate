import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import Loadable from 'react-loadable'
import { withRouter } from 'react-router-dom'
import Auth from '@aws-amplify/auth'

import requireUnauth from '_hocs/requireUnauth'

const AnimationWrapper = Loadable({
  loader: () => import('_animationWrappers/AnimationWrapper'),
  loading: () => <div></div>,
})
const TextField = Loadable({
  loader: () => import('_inputs/TextField'),
  loading: () => <div></div>,
})
const ButtonWithLoader = Loadable({
  loader: () => import('_buttons/ButtonWithLoader'),
  loading: () => <div></div>,
})

// utils
import validate from '_utils/validations'

import SelectLoading from '_selectors/SelectLoading'

class Login extends React.Component {
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
    return (
      <AnimationWrapper
        classNames="fade"
        shouldShow={this.state.in}
        render={() => {
          return (
            <main className='grid-container'>
              <div className='grid-x grid-margin-x align-middle login-form-container'>
                <div className='cell auto'>
                </div>
                <div className='cell small-6'>
                  <img src='https://t4.rbxcdn.com/2d5d9e7b8bb8d4524a7dfcf9c48c889c' className='logo'/>

                  <TextField
                    name="email"
                    placeholder="Email"
                    type="text"
                    label="Email"
                    error={formErrors.email}
                    value={formObject.email}
                    onChange={this.onChangeEmail}/>

                  <TextField
                    name="password"
                    placeholder="Password"
                    label="Password"
                    type="password"
                    error={formErrors.password}
                    value={formObject.password}
                    onChange={this.onChangePassword}/>

                  <ButtonWithLoader
                    isLoading={this.props.isLoggingIn}
                    className="button login-button"
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
                    }}/>
                </div>
                <div className='cell auto'>
                </div>
              </div>
            </main>
          )
        }}/>
    )
  }

  @autobind
  login() {
    const { formObject } = this.state
    this.props.requestLogin()
    Auth.signIn(formObject.email, formObject.password)
    .then(() => {
      this.props.succeedLogin()
      this.props.history.push("/")
    })
    .catch((err) => {
      this.props.failLogin(err.message || err)
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

function mapStateToProps(state) {
  return {
    isLoggingIn: SelectLoading(['LOGIN'])(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestLogin: () => {
      dispatch({type: 'LOGIN_REQUEST'})
    },
    succeedLogin: () => {
      dispatch({type: 'LOGIN_SUCCESS'})
    },
    failLogin: (message) => {
      dispatch({
        type: 'LOGIN_FAILURE',
        message
      })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(requireUnauth(Login)))
