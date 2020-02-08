import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_TOGGLE_EVENT } from '../../../constants'

const UpdateEventCollapsed = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Content-large">
            <Button variant="primary" type="button" size="sm"
              value={ACTION_TOGGLE_EVENT}
              onClick={props.handleDisplayEvent}>Show</Button>
              &nbsp;
              {props.eventname}
          </Col>
          <Col className="Content-large">
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