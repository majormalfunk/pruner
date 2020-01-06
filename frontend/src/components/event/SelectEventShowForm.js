import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_SELECT_SHOW } from '../../constants'

const SelectEventShowForm = (props) => {

  const { unfinishedShow, setSelectedShow } = props

  const handleSelectShow = async (event) => {
    event.preventDefault()
    setSelectedShow(unfinishedShow)
  }

  return (
    <Container>
      <Form>
        <Row className="ListRow">
          <Col>
            <Button variant="primary" type="button" size="sm"
              value={ACTION_SELECT_SHOW} id={unfinishedShow.id}
              onClick={handleSelectShow}>Select</Button>
              &nbsp;
              {unfinishedShow.showname}
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default SelectEventShowForm