import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Form, Row, Col } from 'react-bootstrap'
import { parseISO, addMinutes } from 'date-fns'

import { displayError } from '../../reducers/notificationReducer'

import { TimeRangeField } from '../../utils/InputFields'
import { FLD_SEL_HNT_PLA_STA, FLD_SEL_HNT_PLA_END } from '../../constants'
import { FLD_SEL_SET_PLA_STA, FLD_SEL_SET_PLA_END } from '../../constants'

import { formatDate } from '../../utils/dates'

const PlanSelectDatesForm = (props) => {

  const { firstEntry, lastEntry, startTime, setStartTime, endTime, setEndTime } = props

  const firstShowStarts = parseISO(firstEntry.showtime)
  const lastShowEnds = addMinutes(parseISO(lastEntry.showtime), Math.ceil(lastEntry.show.duration/5)*5)

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  const controlShowtime = () => {
    //console.log('Controlling times')
    if (document.getElementById(FLD_SEL_HNT_PLA_STA)) {
      if (!isValidDate(startTime)) {
        document.getElementById(FLD_SEL_HNT_PLA_STA).innerHTML = 'Select start time of first show'
        //console.log('Not valid start time')
        return false
      } else {
        document.getElementById(FLD_SEL_HNT_PLA_STA).innerHTML = 'First start time selected'
        //console.log('Is valid start time')
        return true
      }
    }
    if (document.getElementById(FLD_SEL_HNT_PLA_END)) {
      if (!isValidDate(endTime)) {
        document.getElementById(FLD_SEL_HNT_PLA_END).innerHTML = 'Select end time of last show'
        //console.log('Not valid end time')
        return false
      } else {
        document.getElementById(FLD_SEL_HNT_PLA_END).innerHTML = 'Last end time selected'
        //console.log('Is valid end time')
        return true
      }
    }
    return false
  }

  useEffect(() => {
    //console.log('DATES: Using effect')
    if (startTime === null) {
      setStartTime(firstShowStarts)
    }
    if (endTime === null) {
      setEndTime(lastShowEnds)
    }
    const timeOk = controlShowtime()
    //console.log('DATES: Effect used')
  })//, [setStartTime, setEndTime, firstEntry, lastEntry])

  const handleSelectStartTime = async (event) => {
    try {
      if (isValidDate(event)) {
        setStartTime(event)
        console.log('Selected start time:', startTime)
        if (startTime > endTime) {
          setEndTime(lastShowEnds)
          console.log('End time moved to:', endTime)
        }
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
        console.log('Selected end time:', endTime)
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
        <Row>
          <Col className="Component-title">
            Selected dates
          </Col>
          <Col>
            <TimeRangeField label="Start attendance" selectsStart={true}
              startTime={startTime} endTime={endTime} trigger={handleSelectStartTime}
              minTime={firstShowStarts} maxTime={lastShowEnds}
              timehint={FLD_SEL_HNT_PLA_STA} settime={FLD_SEL_SET_PLA_STA} />
          </Col>
          <Col>
            <TimeRangeField label="End attendance by" selectsStart={false}
              startTime={startTime} endTime={endTime} trigger={handleSelectEndTime}
              minTime={startTime} maxTime={lastShowEnds}
              timehint={FLD_SEL_HNT_PLA_END} settime={FLD_SEL_SET_PLA_END} />
          </Col>
        </Row>
        <Row className="Component-small">
          <Col><span>&nbsp;</span></Col>
          <Col>First show starts {formatDate(firstEntry.showtime)}</Col>
          <Col>Last ending show starts {formatDate(lastEntry.showtime)} ({lastEntry.show.duration} min)</Col>
        </Row>
      </Form>
    </Container>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = {
  displayError
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanSelectDatesForm)