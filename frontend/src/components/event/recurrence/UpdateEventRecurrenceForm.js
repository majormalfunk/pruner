import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField, DescriptionField, IsPublicField, IsLiveField } from '../InputFields'
import { ACTION_UPDATE_RECURRENCE, ACTION_UPDATE_RECURRENCE_CANCEL, ACTION_DELETE_RECURRENCE } from '../../../constants'
import { ACTION_TOGGLE_RECURRENCE } from '../../../constants'
import { FLD_UPD_HNT_REC_DES, FLD_UPD_HNT_REC_NAM, FLD_UPD_HNT_REC_LIV, FLD_UPD_HNT_REC_PUB } from '../../../constants'
import { FLD_UPD_SET_REC_DES, FLD_UPD_SET_REC_NAM, FLD_UPD_SET_REC_LIV, FLD_UPD_SET_REC_PUB } from '../../../constants'

const UpdateEventRecurrenceForm = (props) => {

  return (
    <Container>
      <Form>
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
              namehint={FLD_UPD_HNT_REC_NAM} setname={FLD_UPD_SET_REC_NAM} />
          </Col>
          <Col>
            <DescriptionField description={props.description} trigger={props.handleDescription}
              descriptionhint={FLD_UPD_HNT_REC_DES} setdescription={FLD_UPD_SET_REC_DES} />
          </Col>
        </Row>
        <Row>
          <Col>
            <IsPublicField ispublic={props.publicrecurrence} trigger={props.handlePublicrecurrence}
              ispublichint={FLD_UPD_HNT_REC_PUB} setpublic={FLD_UPD_SET_REC_PUB} />
          </Col>
          <Col>
            <IsLiveField islive={props.liverecurrence} trigger={props.handleLiverecurrence}
              islivehint={FLD_UPD_HNT_REC_LIV} setlive={FLD_UPD_SET_REC_LIV} />
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
        <Row>
          <Col className="Content-title">
            <Button variant="primary" type="button" size="sm"
              value={ACTION_TOGGLE_RECURRENCE}
              onClick={props.handleDisplayRecurrence}>Hide</Button>
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