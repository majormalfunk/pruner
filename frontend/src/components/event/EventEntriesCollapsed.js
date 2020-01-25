import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_TOGGLE_ENTRY } from '../../constants'

const EventEntriesCollapsed = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Content-title">
            <Button variant="primary" type="button" size="sm"
              value={ACTION_TOGGLE_ENTRY}
              onClick={props.handleDisplayEntries}>Show</Button>
              &nbsp;
              {props.entries.length} entries
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default EventEntriesCollapsed