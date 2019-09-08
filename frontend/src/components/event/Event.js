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

import { PAGE_EVENT_CREATE } from '../../constants'

import CreateEvent from './CreateEvent'
import UpdateEvent from './UpdateEvent'
import CreateEventRecurrence from './CreateEventRecurrence'
import UpdateEventRecurrence from './UpdateEventRecurrence'

const Event = (props) => {

  const { displayError, currentUser, show, page, ownEvents } = props

  const [event, setEvent] = useState(null)
  const [recurrence, setRecurrence] = useState(null)

  const handleError = (error) => {
    displayError(error)
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

  useEffect(() => {
    //console.log('EVENT: Effect was used')
    if (show) {
      if (ownEvents && ownEvents.length > 0) {
        const unfinishedEvent = ownEvents.find(function (event) {
          return ((event.recurrences && event.recurrences.length === 0) || !event.liveevent)
        })
        if (unfinishedEvent) {
          setEvent(unfinishedEvent)
          if (unfinishedEvent.recurrences.length > 0) {
            const unfinishedRecurrence = unfinishedEvent.recurrences.find(function (recurrence) {
              return (!recurrence.liverecurrence)
            })
            setRecurrence(unfinishedRecurrence)
          }
        } else {
          setEvent(null)
        }
      }
    }
  }, [show, currentUser, ownEvents])

  if (!show || !currentUser) {
    return null
  }

  if (!event) {
    return (
      <Container>
        <CreateEvent show={page === PAGE_EVENT_CREATE}
          createEvent={createEvent} setEvent={setEvent} />
      </Container>
    )
  } else {
    if (event.recurrences) {
      if (event.recurrences.length === 0) {
        return (
          <Container>
            <UpdateEvent show={page === PAGE_EVENT_CREATE}
              updateEvent={updateEvent} deleteEvent={deleteEvent}
              unfinishedEvent={event} setEvent={setEvent} />
            <CreateEventRecurrence show={page === PAGE_EVENT_CREATE}
              createEventRecurrence={createEventRecurrence}
              unfinishedEvent={event} setEvent={setEvent} />
          </Container>
        )
      } else {
        return (
          <Container>
            <UpdateEvent show={page === PAGE_EVENT_CREATE}
              updateEvent={updateEvent} deleteEvent={deleteEvent}
              unfinishedEvent={event} setEvent={setEvent} />
            <UpdateEventRecurrence show={page === PAGE_EVENT_CREATE}
              updateEventRecurrence={updateEventRecurrence}
              unfinishedRecurrence={recurrence} setRecurrence={setRecurrence} />
          </Container>
        )
      }
    }
  }

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