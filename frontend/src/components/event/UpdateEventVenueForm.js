import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField } from './InputFields'
import { ACTION_UPDATE_VENUE, ACTION_UPDATE_VENUE_CANCEL, ACTION_DELETE_VENUE } from '../../constants'

const UpdateEventVenueForm = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col>
            <NameField name={props.venuename} trigger={props.handleVenuename}
              namehint={`venuenamehintupdate`} setname={`setvenuenameupdate`} />
          </Col>
          <Col>
            <Button className="FormAlignedBtn"  variant="success" type="button"
              value={ACTION_UPDATE_VENUE} id={ACTION_UPDATE_VENUE}
              onClick={props.handleUpdateVenue}>Update venue info</Button>
            &nbsp;
            <Button className="FormAlignedBtn"  variant="primary" type="button"
              value={ACTION_UPDATE_VENUE_CANCEL} id={ACTION_UPDATE_VENUE_CANCEL}
              onClick={props.handleUpdateVenueCancel}>Cancel</Button>
            &nbsp;
            <Button className="FormAlignedBtn" variant="danger" type="button"
              value={ACTION_DELETE_VENUE} id={ACTION_DELETE_VENUE}
              onClick={props.handleDeleteVenue}>Delete this venue</Button>
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container>
  )

}

export default UpdateEventVenueForm