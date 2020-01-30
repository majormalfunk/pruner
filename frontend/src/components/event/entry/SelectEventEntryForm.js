import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_SELECT_ENTRY } from '../../../constants'
import { formatDate } from '../../../utils/dates'

const SelectEventEntryForm = (props) => {

  const { unfinishedEntry, setSelectedEntry } = props

  const handleSelectEntry = async (event) => {
    event.preventDefault()
    setSelectedEntry(unfinishedEntry)
  }

  return (
    <Container>
      <Form>
        <Row className="ListRow">
          <Col>
            <Button variant="primary" type="button" size="sm"
              value={ACTION_SELECT_ENTRY} id={unfinishedEntry.id}
              onClick={handleSelectEntry}>Select</Button>
              &nbsp;
              {formatDate(unfinishedEntry.showtime)}
          </Col>
          <Col>
            {unfinishedEntry.show.showname}
          </Col>
          <Col>
            {unfinishedEntry.venue.venuename}
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default SelectEventEntryForm