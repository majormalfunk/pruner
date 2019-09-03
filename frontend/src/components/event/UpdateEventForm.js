import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { EventnameField, DescriptionField, PublicEventField } from './InputFields'
import { ACTION_UPDATE_EVENT, ACTION_UPDATE_EVENT_CANCEL, ACTION_DELETE_EVENT } from '../../constants'

const UpdateEventForm = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-title">
            You can edit the name and description of your event and choose to make it public or private
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <EventnameField eventname={props.eventname} trigger={props.handleEventname}
              eventnamehint={`eventnamehintupdate`} disabled={false} seteventname={`seteventnameupdate`} />
          </Col>
          <Col>
            <DescriptionField description={props.description} trigger={props.handleDescription}
              descriptionhint={`descriptionhintupdate`} setdescription={`setdescriptionupdate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <PublicEventField publicevent={props.publicevent} trigger={props.handlePublicevent}
              publiceventhint={`publiceventhintupdate`} setpublicevent={`setpubliceventupdate`} />
          </Col>
          <Col>
            <Button variant="success" type="button"
              value={ACTION_UPDATE_EVENT} id={ACTION_UPDATE_EVENT}
              onClick={props.handleUpdateEvent}>Update event info</Button>
            &nbsp;
            <Button variant="primary" type="button"
              value={ACTION_UPDATE_EVENT_CANCEL} id={ACTION_UPDATE_EVENT_CANCEL}
              onClick={props.handleUpdateEventCancel}>Cancel</Button>
            &nbsp;
            <Button variant="danger" type="button"
              value={ACTION_DELETE_EVENT} id={ACTION_DELETE_EVENT}
              onClick={props.handleDeleteEvent}>Delete this event</Button>
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container>
  )

}

export default UpdateEventForm