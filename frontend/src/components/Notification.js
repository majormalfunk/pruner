import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Notification = ({ message }) => {

  if (message) {

    return (
              <span style={{ color: 'red' }}>{message}</span>
    )
  } else {
    return (
              <span style={{ color: 'green' }}>&nbsp;</span>
    )
  } 

}

export default Notification