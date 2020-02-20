import React, { useState } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../../utils/dates'

import { Container, Row, Col, Badge } from 'react-bootstrap'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import NavbarCollapse from 'react-bootstrap/NavbarCollapse'

const PlanRejectedEntries = (props) => {

  const { currentUser, rejectedEntries, handleRejectEntry, handleUnrejectEntry } = props

  if (!rejectedEntries || rejectedEntries.size === 0) {
    return (
      null
    )
  }

  console.log('Rendering rejected entries')

  const rejectedArr = Array.from(rejectedEntries.values())

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
                    return <Badge pill variant='danger' key={entry.id} onClick={(() => console.log('Click´d!'))}>
                      {entry.showname} @ {entry.showtime}
                      </Badge>
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