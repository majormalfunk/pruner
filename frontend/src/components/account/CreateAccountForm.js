import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { UsernameField, PasswordField, VeripassField, NicknameField } from './InputFields'
import { ACTION_CREATE_ACCOUNT, ACTION_CREATE_ACCOUNT_CANCEL } from '../../constants'

const CreateAccountForm = (props) => {

  return (
    <Container>
      <Form>
        <Row>
          <Col className="Component-title">
            Enter username and password to create an account
          </Col>
        </Row>
        <Row>
          <Col className="Component-expl">
            You need an account only if you want to create and manage your own public or private events
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
        <Row>
          <Col>
            <UsernameField username={props.username} trigger={props.handleUsername}
              usernamehint={`usernamehintcreate`} disabled={false} setusername={`setusernamecreate`} />
          </Col>
          <Col>
            <NicknameField nickname={props.nickname} trigger={props.handleNickname}
              nicknamehint={`nicknamehintcreate`} setnickname={`setnicknamecreate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <PasswordField password={props.password} trigger={props.handlePassword}
              passwordhint={`passwordhintcreate`} setpassword={`setpasswordcreate`} />
          </Col>
          <Col>
            <VeripassField veripass={props.veripass} trigger={props.handleVeripass}
              veripasshint={`veripasshintcreate`} setveripass={`setveripasscreate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" type="button" value={ACTION_CREATE_ACCOUNT} id={ACTION_CREATE_ACCOUNT}
              onClick={props.handleCreateAccount}>Create account</Button>
            &nbsp;
            <Button variant="primary" type="button" value={ACTION_CREATE_ACCOUNT_CANCEL} id={ACTION_CREATE_ACCOUNT_CANCEL}
              onClick={props.handleCreateAccountCancel}>Cancel</Button>
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
        </Row>
      </Form>
    </Container>
  )

}

export default CreateAccountForm