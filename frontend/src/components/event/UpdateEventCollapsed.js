import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
//import { NameField, DescriptionField, IsPublicField, IsLiveField } from './InputFields'
import { ACTION_TOGGLE_EVENT } from '../../constants'
//import { FLD_UPD_HNT_EVE_DES, FLD_UPD_HNT_EVE_NAM, FLD_UPD_HNT_EVE_LIV, FLD_UPD_HNT_EVE_PUB } from '../../constants'
//import { FLD_UPD_SET_EVE_DES, FLD_UPD_SET_EVE_NAM, FLD_UPD_SET_EVE_LIV, FLD_UPD_SET_EVE_PUB } from '../../constants'

const UpdateEventCollapsed = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Content-title">
            <Button variant="primary" type="button" size="sm"
              value={ACTION_TOGGLE_EVENT}
              onClick={props.handleDisplayEvent}>Show</Button>
              &nbsp;
              {props.eventname}
          </Col>
          <Col className="Content-title">
            {props.description}
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container>
  )

}

export default UpdateEventCollapsed