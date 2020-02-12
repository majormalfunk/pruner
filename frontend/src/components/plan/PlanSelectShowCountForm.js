import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Form, Row, Col } from 'react-bootstrap'

import { displayError } from '../../reducers/notificationReducer'

import { NumberSelectField } from '../../utils/InputFields'
import { FLD_SEL_HNT_PLA_MIN, FLD_SEL_HNT_PLA_MAX } from '../../constants'
import { FLD_SEL_SET_PLA_MIN, FLD_SEL_SET_PLA_MAX } from '../../constants'

const PlanSelectShowCountForm = (props) => {

  const { minShows, setMinShows, maxShows, setMaxShows, totalShows } = props

  const controlShowCount = () => {
    //console.log('Controlling min and max shows')
    if (document.getElementById(FLD_SEL_HNT_PLA_MIN)) {
      if (!isNaN(minShows)) {
        document.getElementById(FLD_SEL_HNT_PLA_MIN).innerHTML = 'Select min number of shows'
        return false
      } else {
        document.getElementById(FLD_SEL_HNT_PLA_MIN).innerHTML = 'Min number of shows selected'
        return true
      }
    }
    if (document.getElementById(FLD_SEL_HNT_PLA_MAX)) {
      if (!isNaN(maxShows)) {
        document.getElementById(FLD_SEL_HNT_PLA_MAX).innerHTML = 'Select max number of shows'
        return false
      } else {
        document.getElementById(FLD_SEL_HNT_PLA_MAX).innerHTML = 'Max number of shows selected'
        return true
      }
    }
    return false
  }

  useEffect(() => {
    /*
    if (minShows === null) {
      setMinShows(1)
    }
    if (maxShows === null) {
      setMaxShows(5)
    }
    */
    const timeOk = controlShowCount()
    //console.log('SHOW COUNT: Effect used')
  })

  const handleSelectMinShows = async (event) => {
    console.log(event.target.value)
    try {
      if (!isNaN(event.target.value)) {
        setMinShows(event.target.value)
        console.log('Selected min shows:', minShows)
        if (minShows > maxShows) {
          setMaxShows(minShows)
          console.log('Max shows changed to:', maxShows)
        }
      } else {
        console.log(event.target.value, 'is not a valid number')
      }
    } catch (error) {
      console.log("Error with min shows", event.target.value)
      console.log(error)
      displayError('Something wrong with the selected min shows')
    }
  }
  const handleSelectMaxShows = async (event) => {
    try {
      if (!isNaN(event.target.value)) {
        setMaxShows(event.target.value)
        console.log('Selected max shows:', maxShows)
        if (minShows > maxShows) {
          setMinShows(maxShows)
          console.log('Max shows changed to:', maxShows)
        }
      } else {
        console.log(event.target.value, 'is not a valid number')
      }
    } catch (error) {
      console.log("Error with max shows", event.target.value)
      console.log(error)
      displayError('Something wrong with the selected max shows')
    }
  }

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-title">
            Select number of shows in paths
          </Col>
          <Col>
            <NumberSelectField label="At least" max={totalShows}
              number={minShows} trigger={handleSelectMinShows}
              numberhint={FLD_SEL_HNT_PLA_MIN} setnumber={FLD_SEL_SET_PLA_MIN}
            />
          </Col>
          <Col>
            <NumberSelectField label="No more than" max={totalShows}
              number={maxShows} trigger={handleSelectMaxShows}
              numberhint={FLD_SEL_HNT_PLA_MAX} setnumber={FLD_SEL_SET_PLA_MAX}
            />
          </Col>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlanSelectShowCountForm)