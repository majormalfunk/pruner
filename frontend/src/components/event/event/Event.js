import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displayError } from '../../../reducers/notificationReducer'

import { Container, Form, Row, Col } from 'react-bootstrap'
import { useMutation } from 'react-apollo-hooks'

import { CREATE_EVENT } from '../gqls'
import { UPDATE_EVENT } from '../gqls'
import { DELETE_EVENT } from '../gqls'
import { LAUNCH_EVENT } from '../gqls'
import { CREATE_EVENT_RECURRENCE } from '../gqls'
import { UPDATE_EVENT_RECURRENCE } from '../gqls'
import { DELETE_EVENT_RECURRENCE } from '../gqls'
import { CREATE_EVENT_VENUE } from '../gqls'
import { UPDATE_EVENT_VENUE } from '../gqls'
import { DELETE_EVENT_VENUE } from '../gqls'
import { CREATE_EVENT_SHOW } from '../gqls'
import { UPDATE_EVENT_SHOW } from '../gqls'
import { DELETE_EVENT_SHOW } from '../gqls'
import { CREATE_EVENT_ENTRY } from '../gqls'
import { UPDATE_EVENT_ENTRY } from '../gqls'
import { DELETE_EVENT_ENTRY } from '../gqls'

import CreateEvent from './CreateEvent'
import UpdateEvent from './UpdateEvent'
import CreateEventRecurrence from '../recurrence/CreateEventRecurrence'
import UpdateEventRecurrence from '../recurrence/UpdateEventRecurrence'
import EventVenues from '../venue/EventVenues'
import EventShows from '../show/EventShows'
import EventEntries from '../entry/EventEntries'

const Event = (props) => {

  const { displayError, currentUser, ownEvents } = props

  const [event, setEvent] = useState(null)
  const [displayEvent, setDisplayEvent] = useState(false)
  const [recurrence, setRecurrence] = useState(null)
  const [displayRecurrence, setDisplayRecurrence] = useState(false)
  const [venue, setVenue] = useState(null)
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [displayVenues, setDisplayVenues] = useState(false)
  const [show, setShow] = useState(null)
  const [selectedShow, setSelectedShow] = useState(null)
  const [displayShows, setDisplayShows] = useState(false)
  const [entry, setEntry] = useState(null)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [displayEntries, setDisplayEntries] = useState(false)

  const handleError = (error) => {
    displayError(error)
  }
  const handleClear = () => {
    setEvent(null)
    setRecurrence(null)
    setVenue(null)
    setShow(null)
    setEntry(null)
  }
  const handleDisplayEvent = () => {
    setDisplayEvent(!displayEvent)
    setDisplayRecurrence(false)
    setDisplayVenues(false)
    setDisplayShows(false)
    setDisplayEntries(false)
  }
  const handleDisplayRecurrence = () => {
    setDisplayRecurrence(!displayRecurrence)
    setDisplayEvent(false)
    setDisplayVenues(false)
    setDisplayShows(false)
    setDisplayEntries(false)
  }
  const handleDisplayVenues = () => {
    setDisplayVenues(!displayVenues)
    setDisplayEvent(false)
    setDisplayRecurrence(false)
    setDisplayShows(false)
    setDisplayEntries(false)
  }
  const handleDisplayShows = () => {
    setDisplayShows(!displayShows)
    setDisplayEvent(false)
    setDisplayRecurrence(false)
    setDisplayVenues(false)
    setDisplayEntries(false)
  }
  const handleDisplayEntries = () => {
    setDisplayEntries(!displayEntries)
    setDisplayEvent(false)
    setDisplayRecurrence(false)
    setDisplayVenues(false)
    setDisplayShows(false)
  }

  const createEvent = useMutation(CREATE_EVENT, {
    onError: handleError
  })
  const updateEvent = useMutation(UPDATE_EVENT, {
    onError: handleError
  })
  const deleteEvent = useMutation(DELETE_EVENT, {
    onError: handleError
  })
  const launchEvent = useMutation(LAUNCH_EVENT, {
    onError: handleError
  })
  const createEventRecurrence = useMutation(CREATE_EVENT_RECURRENCE, {
    onError: handleError
  })
  const updateEventRecurrence = useMutation(UPDATE_EVENT_RECURRENCE, {
    onError: handleError
  })
  const deleteEventRecurrence = useMutation(DELETE_EVENT_RECURRENCE, {
    onError: handleError
  })
  const createEventVenue = useMutation(CREATE_EVENT_VENUE, {
    onError: handleError
  })
  const updateEventVenue = useMutation(UPDATE_EVENT_VENUE, {
    onError: handleError
  })
  const deleteEventVenue = useMutation(DELETE_EVENT_VENUE, {
    onError: handleError
  })
  const createEventShow = useMutation(CREATE_EVENT_SHOW, {
    onError: handleError
  })
  const updateEventShow = useMutation(UPDATE_EVENT_SHOW, {
    onError: handleError
  })
  const deleteEventShow = useMutation(DELETE_EVENT_SHOW, {
    onError: handleError
  })
  const createEventEntry = useMutation(CREATE_EVENT_ENTRY, {
    onError: handleError
  })
  const updateEventEntry = useMutation(UPDATE_EVENT_ENTRY, {
    onError: handleError
  })
  const deleteEventEntry = useMutation(DELETE_EVENT_ENTRY, {
    onError: handleError
  })

  const unfinishedEvent = ownEvents.find(function (e) {
    return !e.launched
  })

  useEffect(() => {
    console.log('EVENT: Effect was used')
    if (ownEvents && ownEvents.length > 0) {
      //const unfinishedEvent = ownEvents.find(function (event) {
      //  return ((event.recurrences && event.recurrences.length === 0) || !event.liveevent)
      //})
      if (unfinishedEvent) {
        setEvent(unfinishedEvent)
        if (unfinishedEvent.recurrences.length > 0) {
          // Select last on list
          const unfinishedRecurrence = unfinishedEvent.recurrences[unfinishedEvent.recurrences.length - 1]
          setRecurrence(unfinishedRecurrence)
        } else {
          setRecurrence(null)
        }
        if (unfinishedEvent.venues.length > 0) {
          // Select last on list
          const unfinishedVenue = unfinishedEvent.venues[unfinishedEvent.venues.length - 1]
          setVenue(unfinishedVenue)
        } else {
          setVenue(null)
        }
        if (unfinishedEvent.shows.length > 0) {
          // Select last on list
          const unfinishedShow = unfinishedEvent.shows[unfinishedEvent.shows.length - 1]
          setShow(unfinishedShow)
        } else {
          setShow(null)
        }
        if (unfinishedEvent.entries.length > 0) {
          // Select last on list
          const unfinishedEntry = unfinishedEvent.entries[unfinishedEvent.entries.length - 1]
          setEntry(unfinishedEntry)
        } else {
          setEntry(null)
        }
      } else {
        setEvent(null)
      }
      console.log('Own events is', ownEvents)
    }
  }, [currentUser, ownEvents, unfinishedEvent, recurrence, venue, show, entry])

  // NEED TO TEST THAT IT WORKS ALSO WITHOUT THIS WHEN STARTING FROM SCRATCH
  /*
  if (recurrence === null && event && event.recurrences && event.recurrences.length > 0) {
    const unfinishedRecurrence = event.recurrences[event.recurrences.length - 1]
    setRecurrence(unfinishedRecurrence)
  }
  if (venue === null && event && event.venues && event.venues.length > 0) {
    const unfinishedVenue = event.venues[event.venues.length - 1]
    setVenue(unfinishedVenue)
  }
  if (show === null && event && event.shows && event.shows.length > 0) {
    const unfinishedShow = event.shows[event.shows.length - 1]
    setShow(unfinishedShow)
  }
  */

  if (!currentUser) {
    return (
      <Container>
        <Form>
          <Row>
            <Col className="Component-title">
              You need to be logged in to create a new event
            </Col>
          </Row>
          <Row>
            <Col><span>&nbsp;</span></Col>
          </Row>
          <Row>
            <Col className="Component-expl">
              Login or create a new account to define your own events.
            </Col>
          </Row>
          <Row>
            <Col className="Component-expl">
              You don't need an account to make attendance plans to already existing events.
            </Col>
          </Row>
          <Row>
            <Col><span>&nbsp;</span></Col>
          </Row>
        </Form>
      </Container>
    )
  }

  console.log('Event is', event)
  console.log('Unfinished event is', unfinishedEvent)
  
  if (!event || unfinishedEvent === undefined) {
    return (
      <Container>
        <CreateEvent createEvent={createEvent} setEvent={setEvent} />
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container>
      <UpdateEvent handleClear={handleClear}
        updateEvent={updateEvent} deleteEvent={deleteEvent} launchEvent={launchEvent}
        setEvent={setEvent} displayEvent={displayEvent} handleDisplayEvent={handleDisplayEvent} />
      {(event && event.recurrences && event.recurrences.length === 0) && (
        <CreateEventRecurrence createEventRecurrence={createEventRecurrence} />
      )}
      {(event && event.recurrences && event.recurrences.length > 0) && (
        <UpdateEventRecurrence updateEventRecurrence={updateEventRecurrence}
          deleteEventRecurrence={deleteEventRecurrence} setRecurrence={setRecurrence}
          displayRecurrence={displayRecurrence} handleDisplayRecurrence={handleDisplayRecurrence} />
      )}
      {(event && event.recurrences && event.recurrences.length > 0 && event.venues && event.shows) &&
        <>
          <EventVenues createEventVenue={createEventVenue}
            updateEventVenue={updateEventVenue}
            deleteEventVenue={deleteEventVenue}
            selectedVenue={selectedVenue} setSelectedVenue={setSelectedVenue}
            displayVenues={displayVenues} handleDisplayVenues={handleDisplayVenues} />
          <EventShows createEventShow={createEventShow}
            updateEventShow={updateEventShow}
            deleteEventShow={deleteEventShow}
            selectedShow={selectedShow} setSelectedShow={setSelectedShow}
            displayShows={displayShows} handleDisplayShows={handleDisplayShows} />
          <EventEntries createEventEntry={createEventEntry}
            updateEventEntry={updateEventEntry}
            deleteEventEntry={deleteEventEntry}
            selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry}
            displayEntries={displayEntries} handleDisplayEntries={handleDisplayEntries} />
        </>
      }
      <Row>
        <Col><span>&nbsp;</span></Col>
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
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)