import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField } from './InputFields'
import { ACTION_CREATE_VENUE, ACTION_CREATE_VENUE_CANCEL } from '../../constants'

const CreateEventVenueForm = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-title">
            Enter a name for a new venue for the event
          </Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            After creating venues for your event you can add shows at those venues.
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <NameField name={props.venuename} trigger={props.handleVenuename}
              namehint={`venuenamehintcreate`} setname={`setvenuenamecreate`} />
            &nbsp;
          </Col>
          <Col>
            <Button className="FormAlignedBtn" variant="success" type="button" value={ACTION_CREATE_VENUE} id={ACTION_CREATE_VENUE}
              onClick={props.handleCreateVenue}>Create new venue</Button>
            &nbsp;
            <Button className="FormAlignedBtn" variant="primary" type="button" value={ACTION_CREATE_VENUE_CANCEL} id={ACTION_CREATE_VENUE_CANCEL}
              onClick={props.handleCreateVenueCancel}>Cancel</Button>
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container >
  )

}

export default CreateEventVenueForm