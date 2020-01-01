import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import UpdateEventVenue from './UpdateEventVenue'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { updateInOwnEvents } from '../../reducers/ownEventsReducer'

const EventVenues = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, unfinishedEvent,
    updateInOwnEvents, updateEventVenue, show, setEvent } = props

  const [currentPage, setCurrentPage] = useState(1)

  if (!show || !currentUser) {
    return null
  }

  const venues = unfinishedEvent.venues
  let filteredVenues = venues

  const itemsOnPage = 20
  const pages = Math.ceil(filteredVenues.length / itemsOnPage)

  const venuesToDisplay = () => {
    var offset = (currentPage - 1) * itemsOnPage
    if (filteredVenues !== undefined && filteredVenues !== null) {
      return (
        filteredVenues.map((venue, index) => {
          if (index >= offset && index < (offset + itemsOnPage)) {
            return <UpdateEventVenue key={venue._id} venue={venue} />
          } else {
            return null
          }
        })
      )
    } else {
      return null
    }
  }

  return (
    <Container>
      {venuesToDisplay()}
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
  displaySuccess,
  displayInfo,
  displayError,
  updateInOwnEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(EventVenues)