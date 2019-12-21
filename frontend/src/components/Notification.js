import React from 'react'
import { connect } from 'react-redux'
import { NOTIF_INFO, NOTIF_SUCCESS, NOTIF_WARNING } from '../constants'
 
const Notification = ({ message, messageClass }) => {

  if (message) {

    let msgColor = '#ebc20c'
    switch (messageClass) {
      case NOTIF_WARNING:
        msgColor = 'red'
        break
      case NOTIF_SUCCESS:
        msgColor = 'green'
        break
      case NOTIF_INFO:
        msgColor = '#ebc20c'
        break
      default:
        msgColor = 'white'
    }

    return (
      <span style={{ color: msgColor }}>{message}</span>
    )
  }

  return (
    <span style={{ color: 'white' }}>&nbsp;</span>
  )


}

const mapStateToProps = (state) => {
  return {
    message: state.notification.message,
    messageClass: state.notification.messageClass
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)

