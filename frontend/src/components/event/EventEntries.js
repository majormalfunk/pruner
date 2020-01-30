import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import EventEntriesCollapsed from './EventEntriesCollapsed'
import EventEntriesOpened from './EventEntriesOpened'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const EventEntries = (props) => {

  const { currentUser, display, displayEntries, handleDisplayEntries,
    createEventEntry, updateEventEntry, deleteEventEntry, entries,
    selectedEntry, setSelectedEntry } = props

  if (!display || !currentUser) {
    return null
  }

  return (
    <Container>
      <Row>
        <Col className="Component-title">
          Event schedule
        </Col>
      </Row>
      <Row>
        <Col>
        {(!displayEntries ? (
            <EventEntriesCollapsed
            //entries={entries}
            handleDisplayEntries={handleDisplayEntries} />
          ) : (
            <EventEntriesOpened display={display}
            createEventEntry={createEventEntry}
            updateEventEntry={updateEventEntry}
            deleteEventEntry={deleteEventEntry}
            //entries={entries}
            selectedEntry={selectedEntry} setSelectedEntry={setSelectedEntry}
            handleDisplayEntries={handleDisplayEntries} />
          )
        )}
        </Col>
      </Row>
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
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(EventEntries)