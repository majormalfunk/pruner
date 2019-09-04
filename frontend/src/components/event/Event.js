import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useMutation } from 'react-apollo-hooks'

import { CREATE_EVENT } from './gqls'
import { UPDATE_EVENT } from './gqls'
import { DELETE_EVENT } from './gqls'

import { PAGE_EVENT_CREATE } from '../../constants'

import CreateEvent from './CreateEvent'
import UpdateEvent from './UpdateEvent'


const Event = ({ show, page, user, handleSetUser, handleError }) => {
  const [event, setEvent] = useState(null)

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
    console.log('EVENT: Effect was used')
    if (show) {
      if (user && user.events && user.events.length > 0) {
        console.log('We have a user and the user has events')
        const unfinishedEvent = user.events.find(function (event) {
          return event.recurrences.length === 0
        });
        console.log('Unfinished event is', unfinishedEvent)
        if (unfinishedEvent) {
          setEvent(unfinishedEvent)
        } else {
          setEvent(null)
        }
      }
    }
  }, [show, user])

  if (!show || !user) {
    return null
  }

  if (!event) {
    return (
      <Container>
        <CreateEvent createEvent={createEvent} user={user} show={page === PAGE_EVENT_CREATE}
          setEvent={setEvent} handleError={handleError} />
      </Container>
    )
  } else {
    return (
      <Container>
        <UpdateEvent updateEvent={updateEvent} deleteEvent={deleteEvent}
          eventToHandle={event} user={user} show={page === PAGE_EVENT_CREATE}
          setEvent={setEvent} handleError={handleError} />
      </Container>
    )
  }



}

export default Event