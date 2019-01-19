import React, { Component } from 'react'
import Modal from 'react-modal'
import autobind from 'autobind-decorator'

import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'

import { GET_ALERT } from '_queries'
import { DISMISS_ALERT } from '_mutations'

class AlertModal extends Component {
  componentDidMount() {
    Modal.setAppElement('#app')
  }

  render() {
    const { alert } = this.props

    const style = {
      overlay : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 999999999999,
      },
      content : {
        position: 'absolute',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }
    }
    return (
      <Mutation mutation={DISMISS_ALERT}>
        {(dismissAlert, { data }) => {
          return (
            <Query
              query={GET_ALERT}
              fetchPolicy='cache-first'>
              {({ data }) => {
                const { title, body, actions } = data.alert
                const hasAlert = !!title || !!body

                return(
                  <Modal
                    isOpen={hasAlert ? true : false}
                    contentLabel="Alert Modal"
                    style={style}>

                    {
                      hasAlert ? (
                        <h3>{title}</h3>
                      ) : null
                    }

                    <p>{hasAlert ? body : ""}</p>

                    {
                      actions && actions.map(action => 
                        <button
                          key={action.text}
                          onClick={this.closeModal.bind(null, dismissAlert, action)}>
                          {action.text}
                        </button>
                      )
                    }

                  </Modal>
                )
              }}
            </Query>
          )
        }}
      </Mutation>
    )
  }

  @autobind
  closeModal(dismissAlert, action) {
    dismissAlert({
      variables: {
        action
      }
    })
  }
}

export default AlertModal
