import React from 'react'
import { connect } from 'react-redux'

import { logoutAdminUser } from '_actions/authentications'

import { Button } from '_buttons'

class _Dashboard extends React.Component {
  render() {
    return (~
      %div
        %h1 dashboard
        %Button(
          text="Logout"
          className="button"
          onClick={() => {
            this.props.logoutAdminUser()
          }})
    ~)
  }
}

const Dashboard = connect(null, { logoutAdminUser })(_Dashboard)

export { Dashboard }