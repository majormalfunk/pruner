import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { parseISO, compareAsc, addMinutes } from 'date-fns'

import { Container, Row, Col } from 'react-bootstrap'
import { useMutation } from 'react-apollo-hooks'
import { GET_AVAILABLE_EVENTS } from '../event/gqls'

import { displayError } from '../../reducers/notificationReducer'
import { setAvailableEvents } from '../../reducers/availableEventsReducer'

import PlanEvents from './PlanEvents'
import PlanEventRecurrences from './PlanEventRecurrences'
import PlanSelectDatesForm from './PlanSelectDatesForm'
import PlanSelectShowCountForm from './PlanSelectShowCountForm'
import PlanPaths from './PlanPaths'

const Plan = (props) => {

  const { displayError, currentUser, availableEvents, setAvailableEvents } = props

  const [eventId, setEventId] = useState(null) // Here we are usind ids not objects
  const [displayEvents, setDisplayEvents] = useState(true)
  const [recurrenceId, setRecurrenceId] = useState(null) // Here we are usind ids not objects
  const [displayRecurrences, setDisplayRecurrences] = useState(true)
  const [minShows, setMinShows] = useState(1)
  const [maxShows, setMaxShows] = useState(5) // What would be default max?
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

  if ((getAvailableEvents[1]).loading) {
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
          <span>Loading events to prune...</span>
        </Col>
      </Row>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
      </Container>
    )
  }

  function pruneStartTime(entry) {
    return (compareAsc(startTime, parseISO(entry.showtime)) < 1)
  }
  function pruneEndTime(entry) {
    return (compareAsc(addMinutes(parseISO(entry.showtime), entry.show.duration), endTime) < 1 )
  }

  const selectedEvent = availableEvents.find(event => event.id === eventId)
  let firstEntry = null
  let lastEndingEntry = null
  let availableEntries = []
  let prunedEntries = []
  let distinctCount = 0
  let prunedCount = 0
  let prunedDistinct = new Set()
  if (selectedEvent) {
    const selectedRecurrence = selectedEvent.recurrences.find(recurrence => recurrence.id === recurrenceId)
    if (selectedRecurrence) {
      availableEntries = selectedRecurrence.entries.filter((entry) => {
        if (lastEndingEntry === null) {
          lastEndingEntry = entry
        } else {
          if (compareAsc(
            addMinutes(parseISO(lastEndingEntry.showtime), lastEndingEntry.show.duration),
            addMinutes(parseISO(entry.showtime), entry.show.duration)) < 1) {
              lastEndingEntry = entry
          }
        }
        return entry.recurrence === recurrenceId
      })
      firstEntry = availableEntries[0]
      distinctCount = selectedRecurrence.shows.length
      prunedEntries = availableEntries.filter((entry) => {
        return pruneStartTime(entry) && pruneEndTime(entry)
      })
      prunedCount = prunedEntries.length
      let dist = {}
      prunedDistinct = prunedEntries.filter((entry) => {
        if (dist[entry.show.id]) {
          return false
        }
        dist[entry.show.id] = true
        return true
      })
    }
  }

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
            <span>There seem to be no available events.</span>
          ) : (
            <PlanEvents displayEvents={displayEvents} handleDisplayEvents={handleDisplayEvents}
              eventId={eventId} setEventId={setEventId} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {(eventId &&
            <PlanEventRecurrences eventId={eventId} recurrenceId={recurrenceId}
              setRecurrenceId={setRecurrenceId} displayRecurrences={displayRecurrences}
              handleDisplayrecurrences={handleDisplayRecurrences} />
          )}
        </Col>
      </Row>
        {(eventId && recurrenceId &&
        <>
          <Row>
            <Col>
              <PlanSelectShowCountForm totalShows={availableEntries.length}
                minShows={minShows} setMinShows={setMinShows}
                maxShows={maxShows} setMaxShows={setMaxShows} />
            </Col>
          </Row>
          <Row>
            <Col>
              <PlanSelectDatesForm firstEntry={firstEntry} lastEntry={lastEndingEntry}
                startTime={startTime} setStartTime={setStartTime}
                endTime={endTime} setEndTime={setEndTime} />
            </Col>
          </Row>
          <Row>
            <Col><span>&nbsp;</span></Col>
          </Row>
          <Row className="Content-small">
            <Col><span>&nbsp;</span></Col>
            <Col><span>Pruned {prunedCount} ({prunedDistinct.length} distinct) shows with the criteria.</span></Col>
            <Col><span>Total of {availableEntries.length} ({distinctCount} distinct) shows in the event schedule</span></Col>
          </Row>
        </>
        )}
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
      <Row>
        <Col>
          {(prunedEntries.length > 0 &&
          <PlanPaths prunedEntries={prunedEntries} minShows={minShows} maxShows={maxShows} />)}
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