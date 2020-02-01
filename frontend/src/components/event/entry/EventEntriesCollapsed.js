import React from 'react'
import { connect } from 'react-redux'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_TOGGLE_ENTRY } from '../../../constants'

import { displaySuccess, displayInfo, displayError } from '../../../reducers/notificationReducer'

const EventEntriesCollapsed = (props) => {

  const { ownEvents, handleDisplayEntries } = props

  const unfinishedEvent = ownEvents.find(function (event) {
    return !(event.launched)
  })
  const unfinishedRecurrence = unfinishedEvent.recurrences.find(function (recurrence) {
    return !(recurrence.launched)
  })
  const entries = unfinishedEvent.entries.filter(entry => entry.recurrence === unfinishedRecurrence.id)

  const entriesExist = (entries.length > 0)
  
  return (
    <Container>
      <Form>
        <Row>
          <Col className="Content-title">
            <Button variant="primary" type="button" size="sm"
              value={ACTION_TOGGLE_ENTRY}
              onClick={handleDisplayEntries}>{(entriesExist ? 'Show' : 'Create')}</Button>
              &nbsp;
              {(entriesExist ? ( `${entries.length} entries` ) : ( '' ) )}
          </Col>
        </Row>
      </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventEntriesCollapsed)