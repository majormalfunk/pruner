import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ShowSelectField, VenueSelectField, TimeField } from './InputFields'
import { ACTION_CREATE_ENTRY, ACTION_CREATE_ENTRY_CANCEL, ACTION_TOGGLE_ENTRY } from '../../constants'
import { FLD_CRE_HNT_ENT_TIM, FLD_CRE_HNT_ENT_SHO, FLD_CRE_HNT_ENT_VEN } from '../../constants'
import { FLD_CRE_SET_ENT_TIM, FLD_CRE_SET_ENT_SHO, FLD_CRE_SET_ENT_VEN } from '../../constants'

const CreateEventEntryForm = (props) => {

  const { shows, show, handleShow, venues, venue, handleVenue,
          showtime, handleShowtime, handleCreateEntry, handleCreateEntryCancel,
          handleDisplayEntries } = props

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-expl">
            Add a new entry to the schedule
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <ShowSelectField shows={shows} show={show} trigger={handleShow}
              showhint={FLD_CRE_HNT_ENT_SHO} setshow={FLD_CRE_SET_ENT_SHO} />
            &nbsp;
          </Col>
          <Col>
            <VenueSelectField venues={venues} venue={venue} trigger={handleVenue}
              venuehint={FLD_CRE_HNT_ENT_VEN} setvenue={FLD_CRE_SET_ENT_VEN} />
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <TimeField label="Showtime" showtime={showtime} trigger={handleShowtime}
              timehint={FLD_CRE_HNT_ENT_TIM} settime={FLD_CRE_SET_ENT_TIM} />
          </Col>
          <Col lg={6}>
            <Button className="FormAlignedBtn" variant="success" type="button"
              value={ACTION_CREATE_ENTRY} id={ACTION_CREATE_ENTRY}
              onClick={handleCreateEntry}>Create new entry</Button>
            &nbsp;
            <Button className="FormAlignedBtn" variant="primary" type="button"
              value={ACTION_CREATE_ENTRY_CANCEL} id={ACTION_CREATE_ENTRY_CANCEL}
              onClick={handleCreateEntryCancel}>Cancel</Button>
          </Col>
        </Row>
        <Row>
          <Col className="Content-title">
            <Button variant="primary" type="button" size="sm"
              value={ACTION_TOGGLE_ENTRY}
              onClick={handleDisplayEntries}>Hide</Button>
          </Col>
        </Row>
      </Form>
    </Container >
  )
}

export default CreateEventEntryForm