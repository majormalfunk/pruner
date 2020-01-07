import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField, DescriptionField, IsPublicField, IsLiveField } from './InputFields'
import { ACTION_CREATE_RECURRENCE, ACTION_CREATE_RECURRENCE_CANCEL } from '../../constants'
import { FLD_CRE_HNT_REC_DES, FLD_CRE_HNT_REC_NAM, FLD_CRE_HNT_REC_LIV, FLD_CRE_HNT_REC_PUB } from '../../constants'
import { FLD_CRE_SET_REC_DES, FLD_CRE_SET_REC_NAM, FLD_CRE_SET_REC_LIV, FLD_CRE_SET_REC_PUB } from '../../constants'

const CreateEventRecurrenceForm = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-title">
            Enter a name and a description to create a new recurrence for the event
          </Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            After creating a recurrence for your event you can add venues, shows and show times.
            Shows within a recurrence of an event can be recurring.
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <NameField name={props.recurrencename} trigger={props.handleRecurrencename}
              namehint={FLD_CRE_HNT_REC_NAM} setname={FLD_CRE_SET_REC_NAM} />
          </Col>
          <Col>
            <DescriptionField description={props.description} trigger={props.handleDescription}
              descriptionhint={FLD_CRE_HNT_REC_DES} setdescription={FLD_CRE_SET_REC_DES} />
          </Col>
        </Row>
        <Row>
          <Col>
            <IsPublicField ispublic={props.publicrecurrence} trigger={props.handlePublicrecurrence}
              ispublichint={FLD_CRE_HNT_REC_PUB} setpublic={FLD_CRE_SET_REC_PUB} />
          </Col>
          <Col>
            <IsLiveField islive={props.liverecurrence} trigger={props.handleLiverecurrence}
              islivehint={FLD_CRE_HNT_REC_LIV} setlive={FLD_CRE_SET_REC_LIV} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" type="button" value={ACTION_CREATE_RECURRENCE} id={ACTION_CREATE_RECURRENCE}
              onClick={props.handleCreateRecurrence}>Create new recurrence</Button>
            &nbsp;
            <Button variant="primary" type="button" value={ACTION_CREATE_RECURRENCE_CANCEL} id={ACTION_CREATE_RECURRENCE_CANCEL}
              onClick={props.handleCreateRecurrenceCancel}>Cancel</Button>
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container>
  )

}

export default CreateEventRecurrenceForm