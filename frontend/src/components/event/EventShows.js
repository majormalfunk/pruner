import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import CreateEventShow from './CreateEventShow'
import UpdateEventShow from './UpdateEventShow'
import SelectEventShowForm from './SelectEventShowForm'
import UpdateEventShowCollapsed from './UpdateEventShowCollapsed'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const EventShows = (props) => {

  const { currentUser, display, displayShows, handleDisplayShows,
    createEventShow, updateEventShow, deleteEventShow,
    unfinishedEvent, unfinishedRecurrence, shows, selectedShow, setSelectedShow } = props

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
                  <Col>
                    <UpdateEventShow display={display}
                      updateEventShow={updateEventShow}
                      deleteEventShow={deleteEventShow}
                      unfinishedShow={show} setSelectedShow={setSelectedShow} />
                  </Col>
                </Row>
              )
            } else {
              return (
                <Row key={show.id}>
                  <Col>
                    <SelectEventShowForm display={display}
                      unfinishedShow={show} setSelectedShow={setSelectedShow} />
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

  if (!displayShows) {
    return (
      <Container>
        <Row>
          <Col className="Component-title">
            Event shows
          </Col>
        </Row>
        <Row>
          <Col>
            <UpdateEventShowCollapsed
              shows={shows}
              handleDisplayShows={handleDisplayShows} />
          </Col>
        </Row>
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
        <Row>
          <Col>
            <CreateEventShow display={display}
              createEventShow={createEventShow}
              unfinishedEvent={unfinishedEvent}
              unfinishedRecurrence={unfinishedRecurrence}
              handleDisplayShows={handleDisplayShows} />
          </Col>
        </Row>
        {(shows && shows.length > 0) ? (
          <>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col><span>&nbsp;</span></Col>
                  </Row>
                  <Row>
                    <Col className="Component-expl">
                      Select an event show to edit it
                    </Col>
                  </Row>
                </Container>
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