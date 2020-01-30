import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField, DescriptionField, IsPublicField, IsLiveField } from '../InputFields'
import { ACTION_CREATE_EVENT, ACTION_CREATE_EVENT_CANCEL } from '../../../constants'
import { FLD_CRE_HNT_EVE_DES, FLD_CRE_HNT_EVE_NAM, FLD_CRE_HNT_EVE_LIV, FLD_CRE_HNT_EVE_PUB } from '../../../constants'
import { FLD_CRE_SET_EVE_DES, FLD_CRE_SET_EVE_NAM, FLD_CRE_SET_EVE_LIV, FLD_CRE_SET_EVE_PUB } from '../../../constants'

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
              namehint={FLD_CRE_HNT_EVE_NAM} setname={FLD_CRE_SET_EVE_NAM} />
          </Col>
          <Col>
            <DescriptionField description={props.description} trigger={props.handleDescription}
              descriptionhint={FLD_CRE_HNT_EVE_DES} setdescription={FLD_CRE_SET_EVE_DES} />
          </Col>
        </Row>
        <Row>
          <Col>
            <IsPublicField ispublic={props.publicevent} trigger={props.handlePublicevent}
              ispublichint={FLD_CRE_HNT_EVE_PUB} setpublic={FLD_CRE_SET_EVE_PUB} />
          </Col>
          <Col>
            <IsLiveField islive={props.liveevent} trigger={props.handleLiveevent}
              islivehint={FLD_CRE_HNT_EVE_LIV} setlive={FLD_CRE_SET_EVE_LIV} />
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