import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Form, Row, Col } from 'react-bootstrap'

import { displayError } from '../../reducers/notificationReducer'

import { NumberSelectField } from '../../utils/InputFields'
import { FLD_SEL_HNT_PLA_GMI, FLD_SEL_HNT_PLA_GMX } from '../../constants'
import { FLD_SEL_SET_PLA_GMI, FLD_SEL_SET_PLA_GMX } from '../../constants'

const PlanSelectShowGapForm = (props) => {

  const { minGap, setMinGap, maxGap, setMaxGap } = props

  const controlShowGap = () => {
    if (document.getElementById(FLD_SEL_HNT_PLA_GMI)) {
      if (!isNaN(minGap)) {
        document.getElementById(FLD_SEL_HNT_PLA_GMI).innerHTML = 'Select min gap between shows'
        return false
      } else {
        document.getElementById(FLD_SEL_HNT_PLA_GMI).innerHTML = 'Min gap between shows selected'
        return true
      }
    }
    if (document.getElementById(FLD_SEL_HNT_PLA_GMX)) {
      if (!isNaN(maxGap)) {
        document.getElementById(FLD_SEL_HNT_PLA_GMX).innerHTML = 'Select max gap between shows'
        return false
      } else {
        document.getElementById(FLD_SEL_HNT_PLA_GMX).innerHTML = 'Max gap between shows selected'
        return true
      }
    }
    return false
  }

  useEffect(() => {
    controlShowGap()
  })

  const handleSelectMinGap = async (event) => {
    try {
      if (!isNaN(event.target.value)) {
        const newMin = parseInt(event.target.value)
        setMinGap(newMin)
        if (newMin > document.getElementById(FLD_SEL_SET_PLA_GMX).value) {
          document.getElementById(FLD_SEL_SET_PLA_GMX).value = newMin
          setMaxGap(newMin)
        }
      } else {
        console.log(event.target.value, 'is not a valid number')
      }
    } catch (error) {
      console.log("Error with min show gap", event.target.value)
      console.log(error)
      displayError('Something wrong with the selected min show gap')
    }
  }
  const handleSelectMaxGap = async (event) => {
    try {
      if (!isNaN(event.target.value)) {
        const newMax = parseInt(event.target.value)
        setMaxGap(newMax)
        if (newMax < document.getElementById(FLD_SEL_SET_PLA_GMI).value) {
          document.getElementById(FLD_SEL_SET_PLA_GMI).value = newMax
          setMinGap(newMax)
        }
      } else {
        console.log(event.target.value, 'is not a valid number')
      }
    } catch (error) {
      console.log("Error with max show gap", event.target.value)
      console.log(error)
      displayError('Something wrong with the selected max show gap')
    }
  }

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-title">
            Select gap in minutes between shows
          </Col>
          <Col>
            <NumberSelectField label="At least" step={1} min={0}
              number={minGap} trigger={handleSelectMinGap}
              numberhint={FLD_SEL_HNT_PLA_GMI} setnumber={FLD_SEL_SET_PLA_GMI}
            />
          </Col>
          <Col>
            <NumberSelectField label="No longer than" step={5} min={5}
              number={maxGap} trigger={handleSelectMaxGap}
              numberhint={FLD_SEL_HNT_PLA_GMX} setnumber={FLD_SEL_SET_PLA_GMX}
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

export default connect(mapStateToProps, mapDispatchToProps)(PlanSelectShowGapForm)