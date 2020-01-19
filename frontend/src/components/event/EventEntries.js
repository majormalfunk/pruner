import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

import CreateEventEntry from './CreateEventEntry'
import UpdateEventEntry from './UpdateEventEntry'
import SelectEventEntryForm from './SelectEventEntryForm'
import UpdateEventEntryCollapsed from './UpdateEventEntryCollapsed'

import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const EventEntries = (props) => {

  const { currentUser, display, displayEntries, handleDisplayEntries,
    createEventEntry, updateEventEntry, deleteEventEntry,
    unfinishedEvent, unfinishedRecurrence, shows, venues, entries,
    selectedEntry, setSelectedEntry } = props

  const [currentPage, setCurrentPage] = useState(1)

  if (!display || !currentUser) {
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
                  <Col>
                    <UpdateEventEntry display={display}
                      updateEventEntry={updateEventEntry}
                      deleteEventEntry={deleteEventEntry}
                      unfinishedEntry={entry} setSelectedEntry={setSelectedEntry} />
                  </Col>
                </Row>
              )
            } else {
              return (
                <Row key={entry.id}>
                  <Col>
                    <SelectEventEntryForm display={display}
                      unfinishedEntry={entry} setSelectedEntry={setSelectedEntry} />
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

  if (!displayEntries) {
    return (
      <Container>
        <Row>
          <Col className="Component-title">
            Event schedule
          </Col>
        </Row>
        <Row>
          <Col>
            <UpdateEventEntryCollapsed
              entries={entries}
              handleDisplayEntries={handleDisplayEntries} />
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
            Event schedule
          </Col>
        </Row>
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
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col><span>&nbsp;</span></Col>
                  </Row>
                  <Row>
                    <Col className="Component-expl">
                      Select an event entry to edit it
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
              {entriesToDisplay()}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventEntries)