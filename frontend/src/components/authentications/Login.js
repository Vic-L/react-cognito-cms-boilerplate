import _ from 'lodash'
import { fromJS } from 'immutable'
import React from 'react'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Box } from '@rebass/grid'

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
      formObject: fromJS({
        email: '',
        password: '',
      })
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
      <Box
        width={1/3}
        mx='auto'
        css={{
          fontFamily: PRIMARY_FONT
        }}>

        <Logo src='https://t4.rbxcdn.com/2d5d9e7b8bb8d4524a7dfcf9c48c889c'/>

        <Box
          width={1}
          alignSelf='center'>
          <React.Suspense fallback={<ContentLoaders.InputField/>}>
            <TextField
              name="email"
              placeholder="Email"
              type="text"
              label="Email"
              error={ValidateField('login-email', formObject.get('email'), submittedFormBefore)}
              value={formObject.get('email')}
              onChange={this.onChangeEmail}/>
          </React.Suspense>
        </Box>

        <Box
          width={1}
          alignSelf='center'>
          <React.Suspense fallback={<ContentLoaders.InputField/>}>
            <TextField
              name="password"
              placeholder="Password"
              label="Password"
              type="password"
              error={ValidateField('login-password', formObject.get('password'), submittedFormBefore)}
              value={formObject.get('password')}
              onChange={this.onChangePassword}/>
          </React.Suspense>
        </Box>

        <Box
          width={1}
          alignSelf='center'
          css={{
            textAlign: 'center'
          }}>
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
        </Box>

      </Box>
    )
  }

  @autobind
  async login() {
    const { formObject } = this.state

    if (ValidateFormObject('login', formObject)) {
      this.props.requestLogin()
      try {
        const user = await Auth.signIn(formObject.get('email'), formObject.get('password'))

        switch(user.challengeName) {
          case 'NEW_PASSWORD_REQUIRED':
            Auth.completeNewPassword(user, formObject.get('password'), user.challengeParam.requiredAttributes)
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
    const email = e.target.value
    this.state.formObject.set('email', email)
    this.setState(({formObject}) => (
      {formObject: formObject.set('email', email)
    }))
  }

  @autobind
  onChangePassword(e) {
    const password = e.target.value
    this.setState(({formObject}) => ({
      formObject: formObject.set('password', password)
    }))
  }
}

function mapStateToProps({loading}) {
  return {
    isLoggingIn: SelectLoading(['LOGIN'])(loading)
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
