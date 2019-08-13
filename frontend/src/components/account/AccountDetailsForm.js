import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { USER_TOKEN, NICKNAME_LENGTH } from '../../constants'
import { NicknameField, PasswordField } from './InputFields'
import { ACTION_LOGOUT, ACTION_CHANGE_NICKNAME } from '../../constants'
//import '../App.css'

const AccountDetailsForm = ({ user, logout }) => {

  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState(user.nickname)

  const controlNickname = () => {
    if (document.getElementById(`nicknamehintchange`)) {
      if (nickname.trim() === '') {
        document.getElementById(`nicknamehintchange`).innerHTML = 'Nickname shown to other users'
        return false
      } else if (nickname.trim().length < NICKNAME_LENGTH) {
        document.getElementById(`nicknamehintchange`).innerHTML = 'Nickname must be at least 6 characters'
        return false
      } else {
        document.getElementById(`nicknamehintchange`).innerHTML = 'Nickname is long enough'
        return true
      }
    }
  }

  useEffect(() => {
    //const usernameOk = controlUsername()
    //const passwordOk = controlPassword()
    const nicknameOk = controlNickname()
    if (document.getElementById(ACTION_CHANGE_NICKNAME)) {
      document.getElementById(ACTION_CHANGE_NICKNAME).disabled = !(nicknameOk)
    }
  })

  const handleNickname = (event) => {
    setNickname(event.target.value)
  }

  const handleChangeNickname = async (event) => {
    event.preventDefault()

    try {
      window.alert("Placeholder for changing nickname")
    } catch (error) {
      console.log(error.message)
      //clearFields()
      //props.handleError(error)
    }

  }

  return (
    <Container>
      <Row>
        <Col className="Component-title">You are logged in as <font color='white'>{username}</font></Col>
      </Row>
      <Row>
        <Col>
          <Button variant="danger" type="button" value={ACTION_LOGOUT} id={ACTION_LOGOUT}
            onClick={logout}>Logout</Button>
        </Col>
      </Row>
      <Row>
        <span>&nbsp;</span>
      </Row>
      <Row>
        <Col className="Component-title">You can change the nickname by which other users see you</Col>
      </Row>
      <Row>
        <span>&nbsp;</span>
      </Row>
      <Row>
        <Col>
          <NicknameField nickname={nickname} trigger={handleNickname}
            nicknamehint={`nicknamehintchange`} setnickname={`setnicknamechange`} />
        </Col>
      </Row>
      <Row>
        <Col><span>&nbsp;</span></Col>
      </Row>
      <Row>
        <Col>
          <Button variant="success" type="button" value={ACTION_CHANGE_NICKNAME} id={ACTION_CHANGE_NICKNAME}
            onClick={handleChangeNickname}>Change Nickname</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default AccountDetailsForm