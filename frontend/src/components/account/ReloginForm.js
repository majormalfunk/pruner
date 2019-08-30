import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { USER_TOKEN } from '../../constants'
import { ACTION_RELOGIN } from '../../constants'

const ReloginForm = ({ handleRelogin }) => {

  const tokenFromStorage = window.localStorage.getItem(USER_TOKEN)
  if (tokenFromStorage && tokenFromStorage.length > 0) {
    return (

      <Container>
        <Form>
          <Row>
            <Col>
              <Button variant="success" type="button" value={ACTION_RELOGIN} id={ACTION_RELOGIN}
                onClick={handleRelogin}>Remember me</Button>
            </Col>
          </Row>
          <Row>
            <Col><span>&nbsp;</span></Col>
          </Row>
        </Form>
      </Container>

    )
  }

  return null

}

export default ReloginForm