import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Badge } from 'react-bootstrap'

import { formatDate } from '../../utils/dates'
import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const PlanRejectedEntries = (props) => {

  const { rejectedEntries, handleUnrejectEntry } = props

  if (!rejectedEntries || rejectedEntries.length === 0) {
    return (
      null
    )
  }

  return (
    <Container>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
      <Row>
        <Col className="Component-title">
          You have rejected these entries (Click name badge to un-reject it)
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Row>
              <Col>
                {rejectedEntries.map((entry) => {
                    return <Badge pill variant='danger' key={entry.id} id={entry.id} onClick={handleUnrejectEntry}>
                      {entry.show.showname} @ {formatDate(entry.showtime)}
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