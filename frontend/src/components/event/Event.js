import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useQuery, useMutation } from 'react-apollo-hooks'

import { CREATE_EVENT } from './gqls'

import { PAGE_EVENT_CREATE } from '../../constants'

import CreateEvent from './CreateEvent'


const Event = ({ user, show, page, handleError }) => {
  const [event, setEvent] = useState(null)
  const [dumb, setDumb] = useState([])

  const createEvent = useMutation(CREATE_EVENT, {
    onError: handleError
  })

  useEffect(() => {
    console.log('EVENT: Effect was used')
    if (show) {
      if (user && user.events && user.events.length > 0) {
        console.log('We have a user and the user has events')
        console.log('Event is', user.events[0])
        setEvent(user.events[0])
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
        <Row>
          <Col className="Component-title">Event name <font color='white'>{event.eventname}</font></Col>
        </Row>
        <Row>
          <Col className="Component-title">Description <font color='white'>{event.description}</font></Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Container>
    )
  }



}

export default Event