import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

import { PAGE_EVENT_CREATE } from '../../constants'

import CreateEvent from './CreateEvent'

const CREATE_EVENT = gql`
  mutation createEvent($eventname: String!, $description: String!, $public: Boolean!) {
    createEvent(eventname: $eventname, description: $description, public: $public) {
      eventname
      description
      public
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

    return (
      <Container>
        <CreateEvent token={token} show={page === PAGE_EVENT_CREATE} handleError={handleError} />
      </Container>
    )


}

export default Event