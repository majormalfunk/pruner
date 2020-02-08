import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { ACTION_TOGGLE_SHOW } from '../../../constants'

const UpdateEventShowCollapsed = (props) => {

  const { handleDisplayShows, shows } = props

  const showsExist = (shows.length > 0)

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Content-large">
            <Button variant="primary" type="button" size="sm"
              value={ACTION_TOGGLE_SHOW}
              onClick={handleDisplayShows}>{(showsExist ? 'Show' : 'Create')}</Button>
              &nbsp;
              {(showsExist ? ( `${shows.length} shows` ) : ( '' ) )}
          </Col>
        </Row>
      </Form>
    </Container>
  )

}

export default UpdateEventShowCollapsed