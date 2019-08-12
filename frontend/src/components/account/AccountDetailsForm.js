import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { USER_TOKEN } from '../../constants'
import { ACTION_LOGOUT } from '../../constants'
//import '../App.css'

const AccountDetailsForm = ({ user, logout }) => {

  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState(user.nickname)

  //if (!props.show) {
  //  return null
  //}

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="success" type="button" value={ACTION_LOGOUT} id={ACTION_LOGOUT}
            onClick={logout}>Logout</Button>
        </Col>
      </Row>
      <Row>
        <span>&nbsp;</span>
      </Row>
      <Row>
        <Col className="Component-title">Here are your user account details</Col>
      </Row>
      <Row>
        <span>&nbsp;</span>
      </Row>
      <Row>
        <Col className="Component-input-prompt">Username</Col>
        <Col>{username}</Col>
      </Row>
      <Row>
        <Col className="Component-input-prompt">Nickname</Col>
        <Col>{nickname}</Col>
      </Row>
    </Container>
  )
}

export default AccountDetailsForm