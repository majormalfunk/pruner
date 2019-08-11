import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { UsernameField, PasswordField, VeripassField, NicknameField, EmailField } from './InputFields'
import { ACTION_CREATE_ACCOUNT, ACTION_CREATE_ACCOUNT_CANCEL } from '../../constants'

const CreateAccountForm = (props) => {

  return (
    <div>
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
            <UsernameField usernameField={props.usernameField} trigger={props.handleUsername}
              usernamehint={`usernamehintcreate`} disabled={false} setusername={`setusernamecreate`} />
          </Col>
          <Col>
            <NicknameField nicknameField={props.nicknameField} trigger={props.handleNickname}
              nicknamehint={`nicknamehintcreate`} setnickname={`setnicknamecreate`} />
          </Col>
        </Row>
        <Row>
          <Col>
            <PasswordField passwordField={props.passwordField} trigger={props.handlePassword}
              passwordhint={`passwordhintcreate`} setpassword={`setpasswordcreate`} />
          </Col>
          <Col>
            <VeripassField veripassField={props.veripassField} trigger={props.handleVeripass}
              veripasshint={`veripasshintcreate`} setveripass={`setveripasscreate`} />
          </Col>
        </Row>
        <Row>
          <Col><span>&nbsp;</span></Col>
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
    </div>
  )

}

export default CreateAccountForm