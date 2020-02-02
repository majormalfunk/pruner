import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_SELECT_RECURRENCE } from '../../constants'

const PlanSelectEventRecurrenceForm = (props) => {

  const { recurrenceToSelect, setRecurrenceId } = props

  const handleSelectRecurrence = async (event) => {
    event.preventDefault()
    setRecurrenceId(recurrenceToSelect.id)
  }

  return (
    <Container>
      <Form>
        <Row className="ListRow">
          <Col>
            <Button variant="primary" type="button" size="sm"
              value={ACTION_SELECT_RECURRENCE} id={recurrenceToSelect.id}
              onClick={handleSelectRecurrence}>Select</Button>
              &nbsp;
              {recurrenceToSelect.recurrencename}
          </Col>
          <Col>
            {recurrenceToSelect.description}
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default PlanSelectEventRecurrenceForm