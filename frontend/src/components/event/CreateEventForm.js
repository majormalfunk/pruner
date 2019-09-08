import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField, DescriptionField, IsPublicField, IsLiveField } from './InputFields'
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
            After creating an event you can add recurrences, venues, shows and show times for your event.
            Events can be recurring and shows within a recurrence of an event can be recurring.
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <NameField name={props.eventname} trigger={props.handleEventname}
              namehint={`eventnamehintcreate`} setname={`seteventnamecreate`} />
          </Col>
          <Col>
            <DescriptionField description={props.description} trigger={props.handleDescription}
              descriptionhint={`descriptionhintcreate`} setdescription={`setdescriptioncreate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <IsPublicField ispublic={props.publicevent} trigger={props.handlePublicevent}
              ispublichint={`publiceventhintcreate`} setpublic={`setpubliceventcreate`} />
          </Col>
          <Col>
            <IsLiveField islive={props.liveevent} trigger={props.handleLiveevent}
              islivehint={`liveeventhintcreate`} setlive={`setliveeventcreate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" type="button" value={ACTION_CREATE_EVENT} id={ACTION_CREATE_EVENT}
              onClick={props.handleCreateEvent}>Create new event</Button>
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