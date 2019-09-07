import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displayError } from '../../reducers/notificationReducer'

import { Container } from 'react-bootstrap'
import { useMutation } from 'react-apollo-hooks'

import { CREATE_EVENT } from './gqls'
import { UPDATE_EVENT } from './gqls'
import { DELETE_EVENT } from './gqls'

import { PAGE_EVENT_CREATE } from '../../constants'

import CreateEvent from './CreateEvent'
import UpdateEvent from './UpdateEvent'


const Event = (props) => {

  const { displayError, show, page, user, ownEvents } = props

  const [event, setEvent] = useState(null)

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

  useEffect(() => {
    //console.log('EVENT: Effect was used')
    if (show) {
      if (ownEvents && ownEvents.length > 0) {
        const unfinishedEvent = ownEvents.find(function (event) {
          return event.recurrences.length === 0
        })
        if (unfinishedEvent) {
          setEvent(unfinishedEvent)
        } else {
          setEvent(null)
        }
      }
    }
  }, [show, user, ownEvents])

  if (!show || !user) {
    return null
  }

  if (!event) {
    return (
      <Container>
        <CreateEvent createEvent={createEvent} user={user} show={page === PAGE_EVENT_CREATE}
          setEvent={setEvent} />
      </Container>
    )
  } else {
    return (
      <Container>
        <UpdateEvent updateEvent={updateEvent} deleteEvent={deleteEvent}
          eventToHandle={event} user={user} show={page === PAGE_EVENT_CREATE}
          setEvent={setEvent} />
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    ownEvents: state.ownEvents
  }
}

const mapDispatchToProps = {
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)