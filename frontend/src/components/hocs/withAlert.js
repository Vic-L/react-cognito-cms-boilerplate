import React from 'react'
import { Mutation } from 'react-apollo'

import { UPDATE_ALERT } from '_mutations'

export default function withAlert(WrappedComponent) {
  return class extends React.Component {
    render() {
      return (
        <Mutation mutation={UPDATE_ALERT}>
          {(updateAlert, { data }) =>
            <WrappedComponent
              {...this.props}
              updateAlert={updateAlert}/>
          }
        </Mutation>
      )
    }
  };
}
