import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'
import { useMutation } from 'react-apollo-hooks'
import { GET_AVAILABLE_EVENTS } from '../event/gqls'

import { displayError } from '../../reducers/notificationReducer'
import { setAvailableEvents } from '../../reducers/availableEventsReducer'
import PlanEvents from './PlanEvents'
import PlanEventRecurrences from './PlanEventRecurrences'
import PlanSelectEventDatesForm from './PlanSelectDatesForm'

const Plan = (props) => {

  const { displayError, currentUser, availableEvents, setAvailableEvents } = props

  const [eventId, setEventId] = useState(null) // Here we are usind ids not objects
  const [displayEvents, setDisplayEvents] = useState(true)
  const [recurrenceId, setRecurrenceId] = useState(null) // Here we are usind ids not objects
  const [displayRecurrences, setDisplayRecurrences] = useState(true)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const handleError = (error) => {
    displayError(error)
  }
  const handleDisplayEvents = () => {
    setDisplayEvents(!displayEvents)
  }
  const handleDisplayRecurrences = () => {
    setDisplayRecurrences(!displayRecurrences)
  }
  const getAvailableEvents = useMutation(GET_AVAILABLE_EVENTS, {
    onError: handleError,
    options: { fetchPolicy: 'network-only' }
  })

  let username = null

  const handleGetAvailableEvents = async () => {
    try {
      const eventsResult = await getAvailableEvents[0]({
        variables: { username }
      })
      if (eventsResult.data) {
        console.log('Ava:', eventsResult.data.getAvailableEvents)
        setAvailableEvents(eventsResult.data.getAvailableEvents)
      }
    } catch (error) {
      console.log('Couldnt get available events', error.message)
      displayError('Something went wrong fetching available events')
    }
  }

  useEffect(() => {
    console.log('PLAN: Using effect')
    handleGetAvailableEvents()
    console.log('PLAN: Effect used')
    // eslint-disable-next-line
  }, [])

  return (
      <Container>
        <Row>
          <Col className="Component-title">
            Create a new plan
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            {(!availableEvents || availableEvents === null || availableEvents.length === 0) ? (
              <span>Loading...</span>
            ) : (
              <PlanEvents displayEvents={displayEvents} handleDisplayEvents={handleDisplayEvents}
                eventId={eventId} setEventId={setEventId} />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {(eventId &&
              <PlanEventRecurrences eventId={eventId}recurrenceId={recurrenceId} setRecurrenceId={setRecurrenceId}
                displayRecurrences={displayRecurrences} handleDisplayrecurrences={handleDisplayRecurrences} />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {(eventId && recurrenceId &&
              <PlanSelectEventDatesForm eventId={eventId} recurrenceId={recurrenceId}
                startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
            )}
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Container>
    )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    availableEvents: state.availableEvents
  }
}

const mapDispatchToProps = {
  displayError,
  setAvailableEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan)