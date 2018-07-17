import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import autobind from 'autobind-decorator'

import { dismissAlert } from '_actions/alerts'

class _AlertModal extends Component {
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
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
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
        transform: 'translate(-50%, -50%)'
      }
    }
    return (
      <Modal
        isOpen={alert ? true : false}
        contentLabel="Alert Modal"
        style={style}>
        
        {
          alert ? (
            <h3>{alert.title}</h3>
          ) : null
        }

        <p>{alert ? alert.body : ""}</p>

        <button 
          className='button'
          onClick={this.closeModal}>
          OK
        </button>

      </Modal>
    )
  }

  @autobind
  closeModal() {
    const { alert } = this.props
    if (alert.okAction) {
      alert.okAction()
    }
    this.props.dismissAlert()
  }
}

function mapStateToProps({alert}) {
  return { alert }
}

const AlertModal = connect(mapStateToProps, { dismissAlert })(_AlertModal)

export { AlertModal }