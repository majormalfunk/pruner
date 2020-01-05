import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { NameField } from './InputFields'
import { ACTION_SELECT_VENUE } from '../../constants'

const SelectEventVenueForm = (props) => {

  const { currentUser, show, unfinishedVenue, setSelectedVenue } = props

  const handleSelectVenue = async (event) => {
    event.preventDefault()
    setSelectedVenue(unfinishedVenue)
  }

  return (
    <Container>
      <Form>
        <Row className="ListRow">
          <Col>
            <Button variant="primary" type="button" size="sm"
              value={ACTION_SELECT_VENUE} id={unfinishedVenue.id}
              onClick={handleSelectVenue}>Select</Button>
              &nbsp;
              {unfinishedVenue.venuename}
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default SelectEventVenueForm