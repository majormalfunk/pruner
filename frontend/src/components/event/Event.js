import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displayError } from '../../reducers/notificationReducer'

import { Container } from 'react-bootstrap'
import { useMutation } from 'react-apollo-hooks'

import { CREATE_EVENT } from './gqls'
import { UPDATE_EVENT } from './gqls'
import { DELETE_EVENT } from './gqls'
import { CREATE_EVENT_RECURRENCE } from './gqls'
import { UPDATE_EVENT_RECURRENCE } from './gqls'
import { DELETE_EVENT_RECURRENCE } from './gqls'
import { CREATE_EVENT_VENUE } from './gqls'
import { UPDATE_EVENT_VENUE } from './gqls'
import { DELETE_EVENT_VENUE } from './gqls'
import { CREATE_EVENT_SHOW } from './gqls'
import { UPDATE_EVENT_SHOW } from './gqls'
import { DELETE_EVENT_SHOW } from './gqls'
import { CREATE_EVENT_ENTRY } from './gqls'
import { UPDATE_EVENT_ENTRY } from './gqls'
import { DELETE_EVENT_ENTRY } from './gqls'

import { PAGE_EVENT_CREATE } from '../../constants'

import CreateEvent from './CreateEvent'
import UpdateEvent from './UpdateEvent'
import CreateEventRecurrence from './CreateEventRecurrence'
import UpdateEventRecurrence from './UpdateEventRecurrence'
import CreateEventVenue from './CreateEventVenue'
import UpdateEventVenue from './UpdateEventVenue'
import EventVenues from './EventVenues'
import CreateEventShow from './CreateEventShow'
import UpdateEventShow from './UpdateEventShow'
import EventShows from './EventShows'
import CreateEventEntry from './CreateEventEntry'
import UpdateEventEntry from './UpdateEventEntry'
import EventEntries from './EventEntries'

const Event = (props) => {

  const { displayError, currentUser, display, page, ownEvents } = props

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
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [displayEntries, setDisplayEntries] = useState(false)

  const handleError = (error) => {
    displayError(error)
  }
  const handleDisplayEvent = () => {
    setDisplayEvent(!displayEvent)
  }
  const handleDisplayRecurrence = () => {
    setDisplayRecurrence(!displayRecurrence)
  }
  const handleDisplayVenues = () => {
    setDisplayVenues(!displayVenues)
  }
  const handleDisplayShows = () => {
    setDisplayShows(!displayShows)
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

  const unfinishedEvent = ownEvents.find(function (event) {
    return ((event.recurrences && event.recurrences.length === 0) || !event.liveevent)
  })

  useEffect(() => {
    console.log('EVENT: Effect was used')
    if (display) {
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
        } else {
          setEvent(null)
        }
        console.log('Own events is', ownEvents)
      }
    }
  }, [display, currentUser, ownEvents, unfinishedEvent, recurrence, venue, show])

  if (!display || !currentUser) {
    return null
  }

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

  return (
    <Container>
      {!event ? (
        <CreateEvent display={page === PAGE_EVENT_CREATE}
          createEvent={createEvent} setEvent={setEvent} />
      ) : (
        <UpdateEvent display={page === PAGE_EVENT_CREATE}
          updateEvent={updateEvent} deleteEvent={deleteEvent}
          unfinishedEvent={event} setEvent={setEvent}
          displayEvent={displayEvent} handleDisplayEvent={handleDisplayEvent} />
      )}
      {(event && event.recurrences && event.recurrences.length === 0) && (
        <CreateEventRecurrence display={page === PAGE_EVENT_CREATE}
          createEventRecurrence={createEventRecurrence}
          unfinishedEvent={event} />
      )}
      {(event && event.recurrences && event.recurrences.length > 0) && (
        <UpdateEventRecurrence display={page === PAGE_EVENT_CREATE}
          updateEventRecurrence={updateEventRecurrence}
          deleteEventRecurrence={deleteEventRecurrence}
          unfinishedEvent={event}
          unfinishedRecurrence={recurrence} setRecurrence={setRecurrence}
          displayRecurrence={displayRecurrence} handleDisplayRecurrence={handleDisplayRecurrence} />
      )}
      {(event && event.recurrences && event.recurrences.length > 0 && event.venues && event.shows) &&
        <>
          <EventVenues display={page === PAGE_EVENT_CREATE}
            updateEventVenue={updateEventVenue}
            deleteEventVenue={deleteEventVenue}
            venues={unfinishedEvent.venues}
            selectedVenue={selectedVenue} setSelectedVenue={setSelectedVenue}
            displayVenues={displayVenues} handleDisplayVenues={handleDisplayVenues} />
          {(displayVenues &&
            <CreateEventVenue display={page === PAGE_EVENT_CREATE}
            createEventVenue={createEventVenue}
            unfinishedEvent={event}
            unfinishedRecurrence={recurrence} />
          )}
          <EventShows display={page === PAGE_EVENT_CREATE}
            updateEventShow={updateEventShow}
            deleteEventShow={deleteEventShow}
            shows={unfinishedEvent.shows}
            selectedShow={selectedShow} setSelectedShow={setSelectedShow}
            displayShows={displayShows} handleDisplayShows={handleDisplayShows} />
          {(displayShows &&
            <CreateEventShow display={page === PAGE_EVENT_CREATE}
            createEventShow={createEventShow}
            unfinishedEvent={event}
            unfinishedRecurrence={recurrence} />
          )}
          <EventEntries display={page === PAGE_EVENT_CREATE}
            updateEventEntry={updateEventEntry}
            deleteEventEntry={deleteEventEntry}
            venues={unfinishedEvent.venues}
            shows={unfinishedEvent.shows}
            entries={unfinishedEvent.entries}
            selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry}
            displayEntries={displayEntries} setDisplayEntries={setDisplayEntries} />
          <CreateEventEntry display={page === PAGE_EVENT_CREATE}
            createEventEntry={createEventEntry}
            unfinishedEvent={event}
            unfinishedRecurrence={recurrence}
            venues={unfinishedEvent.venues}
            shows={unfinishedEvent.shows}
            displayEntries={displayEntries} />
        </>
      }
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