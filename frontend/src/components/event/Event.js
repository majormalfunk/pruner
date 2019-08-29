import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useQuery, useMutation } from 'react-apollo-hooks'

import { GET_OWN_EVENTS, CREATE_EVENT } from './gqls'

import { PAGE_EVENT_CREATE } from '../../constants'

import CreateEvent from './CreateEvent'


const Event = ({ token, show, page, handleError }) => {
  const [event, setEvent] = useState(null)
  const [dumb, setDumb] = useState([])

  // const ownEvents = useQuery(GET_OWN_EVENTS, {
  //   variables: { token: token },
  //   onError: handleError,
  //   fetchPolicy: "network-only"
  // })

  const createEvent = useMutation(CREATE_EVENT, {
    onError: handleError
  })

  useEffect(() => {
    console.log('Effect was used')
    // if (show && token && dumb.length === 0) {
    //   console.log('Show is', show, 'token is', token)
    //   const tryToGetOwnEvents = async () => {
    //     console.log('Will try')
    //     try {
    //       const result = await ownEvents
    //       if (result.data) {
    //         console.log('We have some data')
    //         if (result.loading) {
    //           console.log('Loading...')
    //         }
    //         if (result.data.getOwnEvents) {
    //           console.log('Data is:')
    //           console.log(result.data.getOwnEvents)
    //           setDumb(result.data.getOwnEvents)
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error.message)
    //       handleError(error)
    //       throw new Error(error)
    //     }
    //   }
    //   console.log('Now we should try')
    //   tryToGetOwnEvents()
    //   console.log('We have tried')
    // }
  })

  if (!show || !token) {
    //if (!token) {
    //  setEvent(null)
    //}
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