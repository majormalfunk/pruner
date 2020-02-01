import React, { useState } from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col, Button } from 'react-bootstrap'
import { ACTION_TOGGLE_ENTRY } from '../../../constants'

import UpdateEventEntry from './UpdateEventEntry'
import SelectEventEntryForm from './SelectEventEntryForm'

import { displaySuccess, displayInfo, displayError } from '../../../reducers/notificationReducer'

const UpdateEventEntries = (props) => {

  const { currentUser, handleDisplayEntries,
    updateEventEntry, deleteEventEntry, entries,
    selectedEntry, setSelectedEntry } = props

  const [currentPage, setCurrentPage] = useState(1)

  if (!currentUser) {
    return null
  }

  let filteredEntries = entries

  const itemsOnPage = 2000
  const pages = Math.ceil(filteredEntries.length / itemsOnPage)

  const entriesToDisplay = () => {
    var offset = (currentPage - 1) * itemsOnPage
    if (filteredEntries === undefined || filteredEntries === null || filteredEntries.length === 0) {
      return null
    }
    return (
      filteredEntries.map((entry, index) => {
        if (index < offset || index >= (offset + itemsOnPage)) {
          return null
        } 
        if (selectedEntry && entry.id === selectedEntry.id) {
          return (
            <Row key={entry.id}>
              <Col>
                <UpdateEventEntry updateEventEntry={updateEventEntry} deleteEventEntry={deleteEventEntry}
                  unfinishedEntry={entry} setSelectedEntry={setSelectedEntry} />
              </Col>
            </Row>
          )
        } else {
          return (
            <Row key={entry.id}>
              <Col>
                <SelectEventEntryForm unfinishedEntry={entry} setSelectedEntry={setSelectedEntry} />
              </Col>
            </Row>
          )
        }
      })
    )
  }

  if (entries === undefined || entries === null || entries.length === 0) {
    return (
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
    )
  }

  return (
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
      <Row>
        <Col>
          <Container>
            <Row>
              <Col className="Content-title">
                <Button variant="primary" type="button" size="sm"
                  value={ACTION_TOGGLE_ENTRY}
                  onClick={handleDisplayEntries}>Hide</Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventEntries)