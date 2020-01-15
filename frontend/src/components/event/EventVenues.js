import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import UpdateEventVenue from './UpdateEventVenue'
import SelectEventVenueForm from './SelectEventVenueForm'
import UpdateEventVenueCollapsed from './UpdateEventVenueCollapsed'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const EventVenues = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, display,
    updateEventVenue, deleteEventVenue, venues, selectedVenue, setSelectedVenue,
    displayVenues, handleDisplayVenues } = props

  const [currentPage, setCurrentPage] = useState(1)

  if (!display || !currentUser) {
    return null
  }

  let filteredVenues = venues

  const itemsOnPage = 2000
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
                  <UpdateEventVenue display={display}
                    updateEventVenue={updateEventVenue}
                    deleteEventVenue={deleteEventVenue}
                    unfinishedVenue={venue} setSelectedVenue={setSelectedVenue} />
                </Row>
              )
            } else {
              return (
                <Row key={venue.id}>
                  <SelectEventVenueForm display={display}
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

  if (!displayVenues) {
    return (
      <Container>
        <Row>
          <Col className="Component-title">
            Event venues
          </Col>
        </Row>
        <UpdateEventVenueCollapsed
          venues={venues}
          handleDisplayVenues={handleDisplayVenues} />
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container>
        <Row>
          <Col className="Component-title">
            Event venues
          </Col>
        </Row>
        {(venues && venues.length > 0) ? (
          <>
            <Row>
              <Col className="Component-expl">
                Select an event venue to edit it
              </Col>
            </Row>
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
              {venuesToDisplay()}
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col><span>&nbsp;</span></Col>
          </Row>
        )}
      </Container>
    )
  }

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
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(EventVenues)