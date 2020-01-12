import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import UpdateEventEntry from './UpdateEventEntry'
import SelectEventEntryForm from './SelectEventEntryForm'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const EventEntries = (props) => {

  const { displaySuccess, displayInfo, displayError, currentUser, display,
    updateEventEntry, deleteEventEntry, venues, shows, entries, selectedEntry, setSelectedEntry } = props

  const [currentPage, setCurrentPage] = useState(1)

  if (!display || !currentUser) {
    return null
  }
  if (!venues || venues === null || venues.length === 0) {
    return null
  }
  if (!shows || shows === null || shows.length === 0) {
    return null
  }

  let filteredEntries = entries

  const itemsOnPage = 2000
  const pages = Math.ceil(filteredEntries.length / itemsOnPage)

  const entriesToDisplay = () => {
    var offset = (currentPage - 1) * itemsOnPage
    if (filteredEntries !== undefined && filteredEntries !== null) {
      return (
        filteredEntries.map((entry, index) => {
          if (index >= offset && index < (offset + itemsOnPage)) {
            if (selectedEntry && entry.id === selectedEntry.id) {
              return (
                <Row key={entry.id}>
                  <UpdateEventEntry display={display}
                    updateEventEntry={updateEventEntry}
                    deleteEventEntry={deleteEventEntry}
                    unfinishedEntry={entry} setSelectedEntry={setSelectedEntry} />
                </Row>
              )
            } else {
              return (
                <Row key={entry.id}>
                  <SelectEventEntryForm display={display}
                    unfinishedEntry={entry} setSelectedEntry={setSelectedEntry} />
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

  if (entries && entries.length > 0) {
    return (
      <Container>
        <Row>
          <Col className="Component-title">
            Event schedule
          </Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            Select a schedule entry to edit it
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        {entriesToDisplay()}
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
            Event schedule
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventEntries)