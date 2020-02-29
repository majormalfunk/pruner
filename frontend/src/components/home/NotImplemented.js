import React from 'react'
import { connect } from 'react-redux'

import { Container, Form, Row, Col } from 'react-bootstrap'

const NotImplemented = () => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-title">
            This functionality is not yet implemented
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            Check later to see if it has been released
          </Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            Thank you for using Event Pruner!
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}


export default connect(mapStateToProps)(NotImplemented)