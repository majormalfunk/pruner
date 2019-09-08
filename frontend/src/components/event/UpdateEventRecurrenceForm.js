import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField, DescriptionField, IsPublicField, IsLiveField } from './InputFields'
import { ACTION_UPDATE_RECURRENCE, ACTION_UPDATE_RECURRENCE_CANCEL, ACTION_DELETE_RECURRENCE } from '../../constants'

const UpdateEventRecurrenceForm = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col className="Component-title">
            Event recurrence
          </Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            You can edit the name and description of your event recurrence and choose to make it public or private
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <NameField name={props.recurrencename} trigger={props.handleRecurrencename}
              namehint={`recurrencenamehintupdate`} setname={`setrecurrencenameupdate`} />
          </Col>
          <Col>
            <DescriptionField description={props.description} trigger={props.handleDescription}
              descriptionhint={`descriptionhintupdate`} setdescription={`setdescriptionupdate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <IsPublicField ispublic={props.publicrecurrence} trigger={props.handlePublicrecurrence}
              ispublichint={`publicrecurrencehintupdate`} setpublic={`setpublicrecurrenceupdate`} />
          </Col>
          <Col>
            <IsLiveField islive={props.liverecurrence} trigger={props.handleLiverecurrence}
              islivehint={`liverecurrencehintupdate`} setlive={`setliverecurrenceupdate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" type="button"
              value={ACTION_UPDATE_RECURRENCE} id={ACTION_UPDATE_RECURRENCE}
              onClick={props.handleUpdateRecurrence}>Update recurrence info</Button>
            &nbsp;
            <Button variant="primary" type="button"
              value={ACTION_UPDATE_RECURRENCE_CANCEL} id={ACTION_UPDATE_RECURRENCE_CANCEL}
              onClick={props.handleUpdateRecurrenceCancel}>Cancel</Button>
            &nbsp;
            <Button variant="danger" type="button"
              value={ACTION_DELETE_RECURRENCE} id={ACTION_DELETE_RECURRENCE}
              onClick={props.handleDeleteRecurrence}>Delete this recurrence</Button>
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container>
  )

}

export default UpdateEventRecurrenceForm