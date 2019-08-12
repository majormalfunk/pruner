import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { UsernameField, PasswordField } from './InputFields'
import { ACTION_LOGIN, ACTION_LOGIN_CANCEL } from '../../constants'

const LoginForm = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-title">
            Enter username and password to log in
          </Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            You need to login only if you want to create and manage your own public or private events
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <UsernameField usernameField={props.usernameField} trigger={props.handleUsername}
              usernamehint={`usernamehintlogin`} setusername={`setusernamelogin`} />
          </Col>
          <Col>
            <PasswordField passwordField={props.passwordField} trigger={props.handlePassword}
              passwordhint={`passwordhintlogin`} setpassword={`setpasswordlogin`} />
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" type="button" value={ACTION_LOGIN} id={ACTION_LOGIN}
              onClick={props.handleLogin}>Login</Button>
            &nbsp;
            <Button variant="primary" type="button" value={ACTION_LOGIN_CANCEL} id={ACTION_LOGIN_CANCEL}
              onClick={props.handleLoginCancel}>Cancel</Button>
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container>
  )

}

export default LoginForm