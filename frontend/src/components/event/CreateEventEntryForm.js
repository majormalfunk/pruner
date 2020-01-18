import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ShowSelectField, VenueSelectField, DateField, TimeField } from './InputFields'
import { DatePicker } from './InputFields'
import { ACTION_CREATE_ENTRY, ACTION_CREATE_ENTRY_CANCEL } from '../../constants'
import { FLD_CRE_HNT_ENT_DAT, FLD_CRE_HNT_ENT_TIM, FLD_CRE_HNT_ENT_SHO, FLD_CRE_HNT_ENT_VEN } from '../../constants'
import { FLD_CRE_SET_ENT_DAT, FLD_CRE_SET_ENT_TIM, FLD_CRE_SET_ENT_SHO, FLD_CRE_SET_ENT_VEN } from '../../constants'

const CreateEventEntryForm = (props) => {

  const { shows, show, handleShow, venues, venue, handleVenue, showdate, handleShowdate,
          showtime, handleShowtime, handleCreateEntry, handleCreateEntryCancel } = props

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
              showhint={FLD_CRE_HNT_ENT_SHO} sethint={FLD_CRE_SET_ENT_SHO} />
            &nbsp;
          </Col>
          <Col>
            <VenueSelectField venues={venues} venue={venue} trigger={handleVenue}
              venuehint={FLD_CRE_HNT_ENT_VEN} setvenue={FLD_CRE_SET_ENT_VEN} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DatePicker date={showdate} trigger={handleShowdate}
              datehint={FLD_CRE_HNT_ENT_DAT} setdate={FLD_CRE_SET_ENT_DAT} />
            &nbsp;
          </Col>
          <Col>
            <TimeField date={showtime} trigger={handleShowtime}
              timehint={FLD_CRE_HNT_ENT_TIM} settime={FLD_CRE_SET_ENT_TIM} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" type="button"
              value={ACTION_CREATE_ENTRY} id={ACTION_CREATE_ENTRY}
              onClick={handleCreateEntry}>Create new entry</Button>
            &nbsp;
            <Button variant="primary" type="button"
              value={ACTION_CREATE_ENTRY_CANCEL} id={ACTION_CREATE_ENTRY_CANCEL}
              onClick={handleCreateEntryCancel}>Cancel</Button>
          </Col>
        </Row>
      </Form>
    </Container >
  )
/*
  <DateField date={showdate} trigger={handleShowdate}
  datehint={FLD_CRE_HNT_ENT_DAT} setdate={FLD_CRE_SET_ENT_DAT} />
*/
}

export default CreateEventEntryForm