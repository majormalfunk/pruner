import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_SELECT_EVENT } from '../../constants'

const PlanSelectEventForm = (props) => {

  const { eventToSelect, setEventId } = props

  const handleSelectEvent = async (event) => {
    event.preventDefault()
    setEventId(eventToSelect.id)
  }

  return (
    <Container>
      <Form>
        <Row className="ListRow">
          <Col>
            <Button variant="primary" type="button" size="sm"
              value={ACTION_SELECT_EVENT} id={eventToSelect.id}
              onClick={handleSelectEvent}>Select</Button>
              &nbsp;
              {eventToSelect.eventname}
          </Col>
          <Col>
            {eventToSelect.description}
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default PlanSelectEventForm