import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col, Button } from 'react-bootstrap'

import { ACTION_TOGGLE_VENUE } from '../../constants'

import CreateEventVenue from './CreateEventVenue'
import UpdateEventVenue from './UpdateEventVenue'
import SelectEventVenueForm from './SelectEventVenueForm'
import UpdateEventVenueCollapsed from './UpdateEventVenueCollapsed'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const EventVenues = (props) => {

  const { currentUser, display, ownEvents, displayVenues, handleDisplayVenues,
    createEventVenue, updateEventVenue, deleteEventVenue,
    selectedVenue, setSelectedVenue } = props
    
  const unfinishedEvent = ownEvents.find(function (event) {
    return !(event.launched)
  })
  const unfinishedRecurrence = unfinishedEvent.recurrences.find(function (recurrence) {
    return !(recurrence.launched)
  })
  const venues = unfinishedEvent.venues.filter(venue => venue.recurrence === unfinishedRecurrence.id)

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
                  <Col>
                    <UpdateEventVenue display={display}
                      updateEventVenue={updateEventVenue}
                      deleteEventVenue={deleteEventVenue}
                      unfinishedVenue={venue} setSelectedVenue={setSelectedVenue} />
                  </Col>
                </Row>
              )
            } else {
              return (
                <Row key={venue.id}>
                  <Col>
                    <SelectEventVenueForm display={display}
                      unfinishedVenue={venue} setSelectedVenue={setSelectedVenue} />
                  </Col>
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
        <Row>
          <Col>
            <CreateEventVenue display={display}
              createEventVenue={createEventVenue}
              handleDisplayVenues={handleDisplayVenues} />
          </Col>
        </Row>
        {(venues && venues.length > 0) ? (
          <>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col><span>&nbsp;</span></Col>
                  </Row>
                  <Row>
                    <Col className="Component-expl">
                      Select an event venue to edit it
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
              {venuesToDisplay()}
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col className="Content-title">
                      <Button variant="primary" type="button" size="sm"
                        value={ACTION_TOGGLE_VENUE}
                        onClick={handleDisplayVenues}>Hide</Button>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
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