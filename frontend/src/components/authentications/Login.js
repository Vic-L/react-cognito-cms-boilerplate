import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import * as ContentLoaders from '_contentLoaders'

import TransitionWrapper from '_transitions/TransitionWrapper'

import Auth from '@aws-amplify/auth'

import ValidateField from '_services/ValidateField'
import ValidateFormObject from '_services/ValidateFormObject'

import SelectLoading from '_selectors/SelectLoading'

const TextField = React.lazy(() => import('_inputs/TextField'))
const ButtonWithLoader = React.lazy(() => import('_buttons/ButtonWithLoader'))

const Logo = styled.img`
  margin: auto;
  display: block;
  margin-bottom: 1rem;
`

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checkedAuthentication: false,
      submittedFormBefore: false,
      formObject: {
        email: '',
        password: '',
      }
    }
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession()
      this.props.history.push('/')
    } catch (err) {
      this.setState({ checkedAuthentication: true })
    }
  }

  render() {
    if (!this.state.checkedAuthentication) {
      return null
    }

    const { formObject, submittedFormBefore } = this.state

    return (
      <main className='grid-container'>
        <div className='grid-x grid-margin-x align-middle'>
          
          <div className='cell auto'/>
          
          <div className='cell small-6'>
            <Logo src='https://t4.rbxcdn.com/2d5d9e7b8bb8d4524a7dfcf9c48c889c'/>

            <div className='grid-x grid-margin-x align-middle'>
              <div className='cell'>
                <React.Suspense fallback={<ContentLoaders.InputField/>}>
                  <TextField
                    name="email"
                    placeholder="Email"
                    type="text"
                    label="Email"
                    error={ValidateField('login-email', formObject.email, submittedFormBefore)}
                    value={formObject.email}
                    onChange={this.onChangeEmail}/>
                </React.Suspense>
              </div>
            </div>

            <div className='grid-x grid-margin-x align-middle'>
              <div className='cell'>
                <React.Suspense fallback={<ContentLoaders.InputField/>}>
                  <TextField
                    name="password"
                    placeholder="Password"
                    label="Password"
                    type="password"
                    error={ValidateField('login-password', formObject.password, submittedFormBefore)}
                    value={formObject.password}
                    onChange={this.onChangePassword}/>
                </React.Suspense>
              </div>
            </div>

            <div className='grid-x grid-margin-x align-middle text-center'>
              <div className='cell'>
                <React.Suspense fallback={<ContentLoaders.Button/>}>
                  <ButtonWithLoader
                    isLoading={this.props.isLoggingIn}
                    text="Login"
                    onClick={() => {
                      if (!this.state.submittedFormBefore) {
                        this.setState({
                          submittedFormBefore: true,
                        }, this.login)
                      } else {
                        this.login()
                      }
                    }}/>
                </React.Suspense>
              </div>
            </div>
          </div>

          <div className='cell auto'/>

        </div>
      </main>
    )
  }

  @autobind
  async login() {
    const { formObject } = this.state

    if (ValidateFormObject('login', formObject)) {
      this.props.requestLogin()
      try {
        const user = await Auth.signIn(formObject.email, formObject.password)

        switch(user.challengeName) {
          case 'NEW_PASSWORD_REQUIRED':
            Auth.completeNewPassword(user, formObject.password, user.challengeParam.requiredAttributes)
            .then(() => {
              this.props.succeedLogin()
              this.props.history.push('/')
            })
            .catch(error => {
              console.log('completeNewPassword error', error)
            })
            break
          default:
            this.props.succeedLogin()
            this.props.history.push("/")
        }
      } catch (err) {
        this.props.failLogin(err.message || err)
      }
    }
  }

  @autobind
  onChangeEmail(e) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        email: e.target.value
      }
    })
  }

  @autobind
  onChangePassword(e) {
    this.setState({
      formObject: {
        ...this.state.formObject,
        password: e.target.value
      }
    })
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransitionWrapper(Login)))
