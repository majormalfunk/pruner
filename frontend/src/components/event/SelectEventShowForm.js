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
          <Col lg={7}>
            <Button variant="primary" type="button" size="sm"
              value={ACTION_SELECT_SHOW} id={unfinishedShow.id}
              onClick={handleSelectShow}>Select</Button>
              &nbsp;
              {unfinishedShow.showname}
          </Col>
          <Col lg={1}>
            {parseInt(unfinishedShow.duration).toString().concat(' min')}
          </Col>
          <Col lg={4}>
            {unfinishedShow.description.substring(0, 20).concat('...')}
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default SelectEventShowForm