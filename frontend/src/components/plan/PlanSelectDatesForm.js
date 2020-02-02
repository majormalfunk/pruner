import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'

import { displayError } from '../../reducers/notificationReducer'

import { TimeField } from '../../utils/InputFields'
import { FLD_SEL_HNT_PLA_STA, FLD_SEL_HNT_PLA_END } from '../../constants'
import { FLD_SEL_SET_PLA_STA, FLD_SEL_SET_PLA_END } from '../../constants'
import { ACTION_SELECT_START, ACTION_SELECT_END } from '../../constants'

import { formatDate } from '../../utils/dates'

const PlanSelectDatesForm = (props) => {

  const { availableEvents, eventId, recurrenceId, startTime, setStartTime, endTime, setEndTime } = props

  const selectedEvent = availableEvents.find(event => event.id === eventId)
  const availableEntries = selectedEvent.entries.filter(entry => entry.recurrence === recurrenceId)
  const firstEntry = availableEntries[0]
  const lastEntry = availableEntries[availableEntries.length-1]

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  useEffect(() => {
    console.log('DATES: Using effect')
    setStartTime(firstEntry.showtime)
    setEndTime(lastEntry.showtime)
    console.log('DATES: Effect used')
  }, [setStartTime, setEndTime, firstEntry, lastEntry])

  const handleSelectStartTime = async (event) => {
    try {
      if (isValidDate(event)) {
        setStartTime(event)
        console.log('Selected start time:', event)
      } else {
        console.log(event, 'was not a valid start time')
      }
    } catch (error) {
      console.log("Error with start time", event)
      console.log(error)
      displayError('Something wrong with the selected start date')
    }
  }
  const handleSelectEndTime = async (event) => {
    try {
      if (isValidDate(event)) {
        setEndTime(event)
        console.log('Selected end time:', event)
      } else {
        console.log(event, 'was not a valid end time')
      }
    } catch (error) {
      console.log("Error with end time", event)
      console.log(error)
      displayError('Something wrong with the selected end date')
    }
  }

  return (
    <Container>
      <Form>
        <Row className="Component-small">
          <Col><span>&nbsp;</span></Col>
          <Col>First show at {formatDate(firstEntry.showtime)}</Col>
          <Col>Last show at {formatDate(lastEntry.showtime)}</Col>
        </Row>
        <Row>
          <Col className="Component-title">
            Selected dates
          </Col>
          <Col>
            <TimeField label="Start attendance" showtime={startTime} trigger={handleSelectStartTime}
              timehint={FLD_SEL_HNT_PLA_STA} settime={FLD_SEL_SET_PLA_STA} />
          </Col>
          <Col>
            <TimeField label="End attendance by" showtime={endTime} trigger={handleSelectEndTime}
              timehint={FLD_SEL_HNT_PLA_END} settime={FLD_SEL_SET_PLA_END} />
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    availableEvents: state.availableEvents
  }
}

const mapDispatchToProps = {
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanSelectDatesForm)