import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

import { PAGE_EVENT_CREATE } from '../../constants'

import CreateEvent from './CreateEvent'

const CREATE_EVENT = gql`
  mutation createEvent($eventname: String!, $description: String!, $publicevent: Boolean!) {
    createEvent(eventname: $eventname, description: $description, publicevent: $publicevent) {
      eventname
      description
      publicevent
      owner {
        nickname
        id
      }
      id
    }
  }
`

const Event = ({ token, show, page, handleError }) => {
  const [event, setEvent] = useState(null)

  const createEvent = useMutation(CREATE_EVENT, {
    onError: handleError
  })

  if (!show || !token) {
    return null
  }

  if (!event) {
    return (
      <Container>
        <CreateEvent createEvent={createEvent} token={token} show={page === PAGE_EVENT_CREATE}
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