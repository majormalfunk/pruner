import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import UpdateEventShow from './UpdateEventShow'
import SelectEventShowForm from './SelectEventShowForm'
import UpdateEventShowCollapsed from './UpdateEventShowCollapsed'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const EventShows = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, display,
    updateEventShow, deleteEventShow, shows, selectedShow, setSelectedShow,
    displayShows, handleDisplayShows } = props

  const [currentPage, setCurrentPage] = useState(1)

  if (!display || !currentUser) {
    return null
  }

  let filteredShows = shows

  const itemsOnPage = 2000
  const pages = Math.ceil(filteredShows.length / itemsOnPage)

  const showsToDisplay = () => {
    var offset = (currentPage - 1) * itemsOnPage
    if (filteredShows !== undefined && filteredShows !== null) {
      return (
        filteredShows.map((show, index) => {
          if (index >= offset && index < (offset + itemsOnPage)) {
            if (selectedShow && show.id === selectedShow.id) {
              return (
                <Row key={show.id}>
                  <UpdateEventShow display={display}
                    updateEventShow={updateEventShow}
                    deleteEventShow={deleteEventShow}
                    unfinishedShow={show} setSelectedShow={setSelectedShow} />
                </Row>
              )
            } else {
              return (
                <Row key={show.id}>
                  <SelectEventShowForm display={display}
                    unfinishedShow={show} setSelectedShow={setSelectedShow} />
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

  if (!displayShows) {
    return (
      <Container>
        <Row>
          <Col className="Component-title">
            Event shows
          </Col>
        </Row>
        <UpdateEventShowCollapsed
          shows={shows}
          handleDisplayShows={handleDisplayShows} />
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
            Event shows
          </Col>
        </Row>
        {(shows && shows.length > 0) ? (
          <>
            <Row>
              <Col className="Component-expl">
                Select an event show to edit it
              </Col>
            </Row>
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
              {showsToDisplay()}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventShows)