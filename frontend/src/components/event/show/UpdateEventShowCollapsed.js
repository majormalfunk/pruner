import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_TOGGLE_SHOW } from '../../../constants'

const UpdateEventShowCollapsed = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Content-title">
            <Button variant="primary" type="button" size="sm"
              value={ACTION_TOGGLE_SHOW}
              onClick={props.handleDisplayShows}>Show</Button>
              &nbsp;
              {props.shows.length} shows
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default UpdateEventShowCollapsed