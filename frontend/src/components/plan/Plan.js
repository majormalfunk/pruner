import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { displayError } from '../../reducers/notificationReducer'

import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { useMutation } from 'react-apollo-hooks'

import { GET_AVAILABLE_EVENTS } from '../event/gqls'

const Plan = (props) => {

  const { displayError, currentUser } = props

  const handleError = (error) => {
    displayError(error)
  }
  const getAvailableEvents = useMutation(GET_AVAILABLE_EVENTS, {
    onError: handleError,
    options: { fetchPolicy: 'network-only' }
  })

  let username = null

  const handleGetAvailableEvents = async (event) => {
    event.preventDefault()

    try {
      const eventsResult = await getAvailableEvents[0]({
        variables: { username }
      })
      if (eventsResult.data) {
        console.log('Ava:', eventsResult.data.getAvailableEvents)
        //setOwnEvents(eventsResult.data.getAvailableEvents)
      }
    } catch (error) {
      console.log('Couldnt get available events', error.message)
      displayError('Something went wrong fetching available events')
    }
  
  }

  return (
      <Container>
        <Form>
          <Row>
            <Col className="Component-title">
              Create a new plan
            </Col>
          </Row>
          <Row>
            <Col><span>&nbsp;</span></Col>
          </Row>
          <Row>
            <Col className="Component-expl">
              First choose an event
            </Col>
          </Row>
          <Row>
            <Button variant="success" type="button"
              onClick={handleGetAvailableEvents}>Click Me!</Button>
          </Row>
          <Row>
            <Col><span>&nbsp;</span></Col>
          </Row>
        </Form>
      </Container>
    )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = {
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan)