import React from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import CreateEventEntry from './CreateEventEntry'
import UpdateEventEntries from './UpdateEventEntries'

import { displaySuccess, displayInfo, displayError } from '../../../reducers/notificationReducer'

const EventEntriesOpened = (props) => {

  const { currentUser, ownEvents, handleDisplayEntries,
    createEventEntry, updateEventEntry, deleteEventEntry,
    selectedEntry, setSelectedEntry } = props

  if (!currentUser) {
    return null
  }

  const unfinishedEvent = ownEvents.find(function (event) {
    return !(event.launched)
  })
  const unfinishedRecurrence = unfinishedEvent.recurrences.find(function (recurrence) {
    return !(recurrence.launched)
  })
  const entries = unfinishedRecurrence.entries

  return (
    <Container>
      <Row>
        <Col>
          <CreateEventEntry createEventEntry={createEventEntry} handleDisplayEntries={handleDisplayEntries} />
        </Col>
      </Row>
      {(entries && entries.length > 0) ? (
        <>
          <UpdateEventEntries handleDisplayEntries={handleDisplayEntries} entries={entries}
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