import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import UpdateEventVenue from './UpdateEventVenue'
import SelectEventVenueForm from './SelectEventVenueForm'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'
import { updateInOwnEvents } from '../../reducers/ownEventsReducer'

const EventVenues = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, show,
    updateVenueInOwnEvents, removeVenueFromOwnEvents,
    updateEventVenue, deleteEventVenue, venues, selectedVenue, setSelectedVenue } = props

  const [currentPage, setCurrentPage] = useState(1)

  if (!show || !currentUser) {
    return null
  }

  let filteredVenues = venues

  const itemsOnPage = 20
  const pages = Math.ceil(filteredVenues.length / itemsOnPage)

  const venuesToDisplay = () => {
    var offset = (currentPage - 1) * itemsOnPage
    if (filteredVenues !== undefined && filteredVenues !== null) {
      return (
        filteredVenues.map((venue, index) => {
          if (index >= offset && index < (offset + itemsOnPage)) {
            if (selectedVenue && venue.id === selectedVenue.id) {
              return (
                <Row key={venue.id}>
                  <UpdateEventVenue show={show}
                    updateEventVenue={updateEventVenue}
                    deleteEventVenue={deleteEventVenue}
                    unfinishedVenue={venue} setSelectedVenue={setSelectedVenue} />
                </Row>
              )
            } else {
              return (
                <Row key={venue.id}>
                  <SelectEventVenueForm show={show}
                    unfinishedVenue={venue} setSelectedVenue={setSelectedVenue} />
                </Row>
              )
            }
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
      <Row>
        <Col className="Component-title">
          Event venues
        </Col>
      </Row>
      <Row>
        <Col className="Component-expl">
          You can edit the names of your event venues
        </Col>
      </Row>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
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