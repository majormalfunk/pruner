import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_TOGGLE_RECURRENCE } from '../../constants'

const UpdateEventRecurrenceCollapsed = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Content-title">
            <Button variant="primary" type="button" size="sm"
              value={ACTION_TOGGLE_RECURRENCE}
              onClick={props.handleDisplayRecurrence}>Show</Button>
              &nbsp;
              {props.recurrencename}
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

export default UpdateEventRecurrenceCollapsed