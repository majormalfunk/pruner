import React from 'react'
import { connect } from 'react-redux'

import { Container, Row, Col } from 'react-bootstrap'

//import { ACTION_TOGGLE_RECURRENCE } from '../../constants'
import PlanSelectEventRecurrenceForm from './PlanSelectEventRecurrenceForm'
import { displaySuccess, displayInfo, displayError } from '../../reducers/notificationReducer'

const PlanEventRecurrences = (props) => {

  const { availableEvents, eventId, //handleDisplayRecurrences,
    recurrenceId, setRecurrenceId } = props

  const selectedEvent = availableEvents.find(event => event.id === eventId)

  const recurrencesToDisplay = () => {
    if (selectedEvent !== undefined && selectedEvent !== null) {
      return (
        selectedEvent.recurrences.map((recurrence) => {
          return (
            <Row key={recurrence.id}>
              <Col>
                <PlanSelectEventRecurrenceForm recurrenceToSelect={recurrence}
                  setRecurrenceId={setRecurrenceId} />
              </Col>
            </Row>
          )
        })
      )
    } else {
      return null
    }
  }

  if (recurrenceId) {
    const selectedRecurrence = selectedEvent.recurrences.find(recurrence => recurrence.id === recurrenceId)
    return (
      <Container>
        <Row>
          <Col className="Content-title">
            Selected recurrence
          </Col>
          <Col className="Content-name">
            {selectedRecurrence.recurrencename}
          </Col>
          <Col className="Content-name">
            {selectedRecurrence.description}
          </Col>
        </Row>
      </Container>
    )
  } else {

    // <Button variant="primary" type="button" size="sm" value={ACTION_TOGGLE_RECURRENCE}
    // onClick={handleDisplayRecurrences}>Hide</Button>

    return (
      <Container>
        <Row>
          <Col className="Component-title">
            Available recurrences
          </Col>
        </Row>
        {(selectedEvent.recurrences && selectedEvent.recurrences.length > 0) ? (
          <>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col><span>&nbsp;</span></Col>
                  </Row>
                  <Row>
                    <Col className="Component-expl">
                      Next select an event recurrence to continue with your plan
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
              {recurrencesToDisplay()}
            <Row>
              <Col><span>&nbsp;</span></Col>
            </Row>
            <Row>
              <Col>
                <Container>
                  <Row>
                    <Col className="Content-large">

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
            <Col><span>No recurrences seem to be available</span></Col>
          </Row>
        )}
      </Container>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    availableEvents: state.availableEvents
  }
}

const mapDispatchToProps = {
  displaySuccess,
  displayInfo,
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanEventRecurrences)