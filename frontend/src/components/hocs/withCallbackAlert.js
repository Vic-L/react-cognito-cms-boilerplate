import React from 'react'
import { Mutation, Query } from 'react-apollo'

import {
  UPDATE_ALERT,
  UPDATE_ALERT_RESPONSE
} from '_mutations'
import { GET_SELECTED_ALERT_RESPONSE } from '_queries'

export default function withCallbackAlert(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <Mutation
          mutation={UPDATE_ALERT}>
          {updateAlert =>
            <Mutation mutation={UPDATE_ALERT_RESPONSE}>
              {(updateAlertResponse, { data }) =>
                <Query
                  fetchPolicy='network-only'
                  query={GET_SELECTED_ALERT_RESPONSE}>
                  {({ data: { selectedAlertResponse } }) =>
                    <WrappedComponent
                      {...this.props}
                      updateAlertResponse={updateAlertResponse}
                      alertResponse={selectedAlertResponse.alertResponse}
                      updateAlert={updateAlert}/>
                  }
                </Query>
              }
            </Mutation>
          }
        </Mutation>
      )
    }
  }
}
