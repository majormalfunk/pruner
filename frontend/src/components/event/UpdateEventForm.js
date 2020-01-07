import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField, DescriptionField, IsPublicField, IsLiveField } from './InputFields'
import { ACTION_UPDATE_EVENT, ACTION_UPDATE_EVENT_CANCEL, ACTION_DELETE_EVENT } from '../../constants'
import { FLD_UPD_HNT_EVE_DES, FLD_UPD_HNT_EVE_NAM, FLD_UPD_HNT_EVE_LIV, FLD_UPD_HNT_EVE_PUB } from '../../constants'
import { FLD_UPD_SET_EVE_DES, FLD_UPD_SET_EVE_NAM, FLD_UPD_SET_EVE_LIV, FLD_UPD_SET_EVE_PUB } from '../../constants'

const UpdateEventForm = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-title">
            This event needs some more data before it can be used in a plan
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col className="Component-title">
            Your Event
          </Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            You can edit the name and description of your event and choose to make it public or private
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <NameField name={props.eventname} trigger={props.handleEventname}
              namehint={FLD_UPD_HNT_EVE_NAM} setname={FLD_UPD_SET_EVE_NAM} />
          </Col>
          <Col>
            <DescriptionField description={props.description} trigger={props.handleDescription}
              descriptionhint={FLD_UPD_HNT_EVE_DES} setdescription={FLD_UPD_SET_EVE_DES} />
          </Col>
        </Row>
        <Row>
          <Col>
            <IsPublicField ispublic={props.publicevent} trigger={props.handlePublicevent}
              ispublichint={FLD_UPD_HNT_EVE_PUB} setpublic={FLD_UPD_SET_EVE_PUB} />
          </Col>
          <Col>
            <IsLiveField islive={props.liveevent} trigger={props.handleLiveevent}
              islivehint={FLD_UPD_HNT_EVE_LIV} setlive={FLD_UPD_SET_EVE_LIV} />
          </Col>
        </Row>
        <Row>
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