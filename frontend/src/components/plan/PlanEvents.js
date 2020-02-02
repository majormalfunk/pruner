import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col, Button } from 'react-bootstrap'

import { ACTION_TOGGLE_EVENT } from '../../constants'

import PlanSelectEventForm from './PlanSelectEventForm'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const PlanEvents = (props) => {

  const { currentUser, availableEvents, displayEvents, handleDisplayEvents,
    eventId, setEventId } = props

  const eventsToDisplay = () => {
    if (availableEvents !== undefined && availableEvents !== null && availableEvents.length > 0) {
      return (
        availableEvents.map((event, index) => {
          return (
            <Row key={event.id}>
              <Col>
                <PlanSelectEventForm eventToSelect={event} setEventId={setEventId} />
              </Col>
            </Row>
          )
        })
      )
    } else {
      return null
    }
  }

  if (eventId) {
    const selectedEvent = availableEvents.find(event => event.id === eventId)
    return (
      <Container>
        <Row>
          <Col className="Component-title">
            Selected event
          </Col>
          <Col>
            {selectedEvent.eventname}
          </Col>
          <Col>
            {selectedEvent.description}
          </Col>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container>
        <Row>
          <Col className="Component-title">
            Available events
          </Col>
        </Row>
        {(availableEvents && availableEvents.length > 0) ? (
          <>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col><span>&nbsp;</span></Col>
                  </Row>
                  <Row>
                    <Col className="Component-expl">
                      Select an event to start making a plan
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
              {eventsToDisplay()}
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col className="Content-title">
                      <Button variant="primary" type="button" size="sm"
                        value={ACTION_TOGGLE_EVENT}
                        onClick={handleDisplayEvents}>Hide</Button>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col><span>&nbsp;</span></Col>
          </Row>
        )}
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    availableEvents: state.availableEvents
  }
}

const mapDispatchToProps = {
  displaySuccess,
  displayInfo,
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanEvents)