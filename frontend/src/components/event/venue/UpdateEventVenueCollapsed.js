import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_TOGGLE_VENUE } from '../../../constants'

const UpdateEventVenueCollapsed = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Content-title">
            <Button variant="primary" type="button" size="sm"
              value={ACTION_TOGGLE_VENUE}
              onClick={props.handleDisplayVenues}>Show</Button>
              &nbsp;
              {props.venues.length} venues
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default UpdateEventVenueCollapsed