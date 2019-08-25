import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { EventnameField, DescriptionField } from './InputFields'
import { ACTION_CREATE_EVENT, ACTION_CREATE_EVENT_CANCEL } from '../../constants'

const CreateEventForm = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-title">
            Enter event name and description to create a new event
          </Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            After creating an event you can add venues and show times for your event.
            Events can be recurring and shows within a recurrence of an event can be recurring.
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <EventnameField eventname={props.eventname} trigger={props.handleEventname}
              eventnamehint={`eventnamehintcreate`} disabled={false} seteventname={`seteventnamecreate`} />
          </Col>
          <Col>
            <DescriptionField description={props.description} trigger={props.handleDescription}
              descriptionhint={`descriptionhintcreate`} setdescription={`setdescriptioncreate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" type="button" value={ACTION_CREATE_EVENT} id={ACTION_CREATE_EVENT}
              onClick={props.handleCreateEvent}>Create event</Button>
            &nbsp;
            <Button variant="primary" type="button" value={ACTION_CREATE_EVENT_CANCEL} id={ACTION_CREATE_EVENT_CANCEL}
              onClick={props.handleCreateEventCancel}>Cancel</Button>
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container>
  )

}

export default CreateEventForm