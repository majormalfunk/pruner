import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import CreateEventEntry from './CreateEventEntry'
import UpdateEventEntries from './UpdateEventEntries'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const EventEntriesOpened = (props) => {

  const { currentUser, display, handleDisplayEntries,
    createEventEntry, updateEventEntry, deleteEventEntry,
    unfinishedEvent, unfinishedRecurrence, shows, venues, entries,
    selectedEntry, setSelectedEntry } = props

  const [currentPage, setCurrentPage] = useState(1)

  if (!display || !currentUser) {
    return null
  }

  return (
    <Container>
      <Row>
        <Col>
          <CreateEventEntry display={display}
            createEventEntry={createEventEntry}
            unfinishedEvent={unfinishedEvent}
            unfinishedRecurrence={unfinishedRecurrence}
            venues={venues}
            shows={shows}
            handleDisplayEntries={handleDisplayEntries} />
        </Col>
      </Row>
      {(entries && entries.length > 0) ? (
        <>
          <UpdateEventEntries display={display} handleDisplayEntries={handleDisplayEntries} entries={entries}
            updateEventEntry={updateEventEntry} deleteEventEntry={deleteEventEntry}
            selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry} />
        </>
      ) : (
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      )}
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
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEntriesOpened)