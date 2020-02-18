import React, { useState } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../../utils/dates'

import { Container, Row, Col, Button } from 'react-bootstrap'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const PlanRejectedEntries = (props) => {

  const { currentUser, rejectedEntries, handleRejectEntry, handleUnrejectEntry } = props

  console.log('Rendering rejected entries')

  if (!rejectedEntries || rejectedEntries.size === 0) {
    return (
      null
    )
  }

  return (
    <Container>
      <Row>
        <Col>
          <Container>
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
            <Row>
              <Col className="Component-title">
                You have rejected these entries
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Row>
              <Col>
                {rejectedEntries.map((entry) =>
                  <div key={entry.id}>{entry.showname} @ {formatDate(entry.showtime)}</div>
                )}
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