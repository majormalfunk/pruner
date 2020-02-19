import React, { useState } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../../utils/dates'

import { Container, Row, Col, Button } from 'react-bootstrap'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const PlanRejectedEntries = (props) => {

  const { currentUser, rejectedEntries, handleRejectEntry, handleUnrejectEntry } = props

  if (!rejectedEntries || rejectedEntries.size === 0) {
    return (
      null
    )
  }

  console.log('Rendering rejected entries')
  console.log(rejectedEntries)
  rejectedEntries.forEach((value) => {
    console.log(value)
  })

  const rejectedArr = [...rejectedEntries]

  return (
    <Container>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
      <Row>
        <Col className="Component-title">
          You have rejected these entries
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Row>
              <Col>
                {rejectedArr.map((entry) => {
                    return <span key={entry.id}>{entry.showname} @ {entry.showtime}</span>
                })}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    ownEvents: state.ownEvents
  }
}

const mapDispatchToProps = {
  displaySuccess,
  displayInfo,
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanRejectedEntries)