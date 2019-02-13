import React from 'react';
import { Mutation, Query } from 'react-apollo';

import {
  UPDATE_ALERT,
  UPDATE_ALERT_RESPONSE
} from '_mutations';
import { GET_SELECTED_ALERT_RESPONSE } from '_queries';

// provides WrappedComponent with the ablity to
// 1. Call alert modal with custom content
// 2. Create alert responses for custom callback actions
// 3. Receive selected alert response button by user

export default function withCallbackAlert(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <Mutation mutation={UPDATE_ALERT}>
          {updateAlert =>
            <Mutation mutation={UPDATE_ALERT_RESPONSE}>
              {updateAlertResponse =>
                <Query
                  fetchPolicy='cache-first'
                  query={GET_SELECTED_ALERT_RESPONSE}
                >
                  {({ data: { selectedAlertResponse } }) =>
                    <WrappedComponent
                      {...this.props}
                      updateAlertResponse={updateAlertResponse}
                      alertResponse={selectedAlertResponse.alertResponse}
                      updateAlert={updateAlert}
                    />
                  }
                </Query>
              }
            </Mutation>
          }
        </Mutation>
      );
    }
  };
}
