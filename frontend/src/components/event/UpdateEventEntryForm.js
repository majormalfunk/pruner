import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { TimeField } from './InputFields'
import { ACTION_UPDATE_ENTRY, ACTION_UPDATE_ENTRY_CANCEL, ACTION_DELETE_ENTRY } from '../../constants'
import { FLD_UPD_HNT_ENT_TIM } from '../../constants'
import { FLD_UPD_SET_ENT_TIM } from '../../constants'

const UpdateEventEntryForm = (props) => {

  const { entry, showtime, handleShowtime, handleUpdateEntry, handleUpdateEntryCancel, handleDeleteEntry } = props

  return (
    <Container>
      <Form>
        <Row>
          <Col><span className="Component-title">Show:</span>&nbsp;{entry.show.showname}</Col>
          <Col><span className="Component-title">Venue:</span>&nbsp;{entry.venue.venuename}</Col>
        </Row>
        <Row>
          <Col lg={6}>
            <TimeField label="Showtime" showtime={showtime} trigger={handleShowtime}
              timehint={FLD_UPD_HNT_ENT_TIM} settime={FLD_UPD_SET_ENT_TIM} />
          </Col>
          <Col lg={6}>
            <Button className="FormAlignedBtn"  variant="success" type="button"
              value={ACTION_UPDATE_ENTRY} id={ACTION_UPDATE_ENTRY}
              onClick={handleUpdateEntry}>Update entry</Button>
            &nbsp;
            <Button className="FormAlignedBtn"  variant="primary" type="button"
              value={ACTION_UPDATE_ENTRY_CANCEL} id={ACTION_UPDATE_ENTRY_CANCEL}
              onClick={handleUpdateEntryCancel}>Cancel</Button>
            &nbsp;
            <Button className="FormAlignedBtn" variant="danger" type="button"
              value={ACTION_DELETE_ENTRY} id={ACTION_DELETE_ENTRY}
              onClick={handleDeleteEntry}>Delete this entry</Button>
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container>
  )

}

export default UpdateEventEntryForm