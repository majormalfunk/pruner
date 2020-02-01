import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_TOGGLE_VENUE } from '../../../constants'

const UpdateEventVenueCollapsed = (props) => {

  const { handleDisplayVenues, venues } = props

  const venuesExist = (venues.length > 0)

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Content-title">
            <Button variant="primary" type="button" size="sm"
              value={ACTION_TOGGLE_VENUE}
              onClick={handleDisplayVenues}>{(venuesExist ? 'Show' : 'Create')}</Button>
              &nbsp;
              {(venuesExist ? ( `${venues.length} venues` ) : ( '' ) )}
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default UpdateEventVenueCollapsed